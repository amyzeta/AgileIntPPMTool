package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.Task;
import io.agileintelligence.ppmtool.exceptions.ValidationException;
import io.agileintelligence.ppmtool.exceptions.ValidationExceptionFactory;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private EntityManager entityManager;

    public Project createProject(final Project project) {
        if (project.getId() != null) {
            throw ValidationExceptionFactory.forId("Do not supply an ID when creating");
        }
        try {
            return projectRepository.save(project);
        } catch (final DataIntegrityViolationException e) {
            throw ValidationExceptionFactory.forProjectIdentifier(String.format("Project identifier '%s' already exists", project.getProjectIdentifier()));
        }
    }

    public Project updateProject(final Project project) {
        final Long id = project.getId();
        // if you just do a projectRepository.save(), the object returned from getProject() can look like you've updated things like create date and project identifier -
        // such things appear not to be rejected until commit
        projectRepository.updateProject(project.getProjectName(), project.getDescription(), project.getStartDate(), project.getEndDate(), id);
        entityManager.clear(); // not technically necessary right now because we don't have any project in the persistence context
        return getProject(id);
    }

    public Project getProject(final Long id) {
        return projectRepository.findById(id).orElseThrow(() -> ValidationExceptionFactory.forId(String.format("Project id '%s' does not exist", id)));
    }

    public Collection<Project> getAllProjects() {
        return StreamSupport.stream(this.projectRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    public void deleteProject(final Long id) {
        this.projectRepository.delete(getProject(id));
    }

    public Task addTask(final Long id, final Task task) {
        if (task.getId() != null) {
            throw ValidationExceptionFactory.forId("Do not supply an ID when creating");
        }
        final Project project = getProject(id);
        task.setTaskSequence(project.getNextTaskSequence());
        task.setProject(project);
        this.taskRepository.save(task);
        return task;
    }

    public Collection<Task> getTasks(final Long id, final String taskSequence) {
        getProject(id); // will throw exception if project does not exist
        if (taskSequence == null) {
            return this.taskRepository.findByProjectId(id);
        }
        return Optional.ofNullable(this.taskRepository.findByTaskSequence(taskSequence))
                .filter(t -> t.belongsTo(id))
                .map(Collections::singletonList)
                .orElseGet(Collections::emptyList);
    }

    public Task getTask(final Long id, final Long taskId) {
        getProject(id); // will throw exception if project does not exist
        return taskRepository.findById(taskId)
                .filter(t -> t.belongsTo(id))
                .orElseThrow(() -> ValidationExceptionFactory.forId(String.format("Task id '%s' does not exist or is not for project '%s", taskId, id)));
    }

    public Task updateTask(final Long id, final Task task) {
        final Project project = getProject(id); // will throw exception if project does not exist
        getTask(id, task.getId()); // will throw exception if task does not exist or is not for this project
        task.setProject(project);
        this.taskRepository.save(task);
        entityManager.clear();
        return getTask(id, task.getId());
    }
}
