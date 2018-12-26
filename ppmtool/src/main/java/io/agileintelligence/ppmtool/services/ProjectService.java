package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.Task;
import io.agileintelligence.ppmtool.exceptions.ValidationExceptionFactory;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

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

    public Project createProject(final Project project) {
        try {
            return projectRepository.save(project);
        } catch (final DataIntegrityViolationException e) {
            throw ValidationExceptionFactory.forProjectIdentifier(String.format("Project identifier '%s' already exists", project.getProjectIdentifier()));
        }
    }

    public Project updateProject(final Project project) {
        final Long id = project.getId();
        projectRepository.updateProject(project.getProjectName(), project.getDescription(), project.getStartDate(), project.getEndDate(), id);
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
                .filter(t -> t.getProject().getId().equals(id))
                .map(Collections::singletonList)
                .orElseGet(Collections::emptyList);
    }
}
