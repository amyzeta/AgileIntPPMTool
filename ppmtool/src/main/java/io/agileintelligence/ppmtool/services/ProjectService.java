package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.exceptions.ValidationExceptionFactory;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

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
        return projectRepository.findById(id).orElseThrow(() -> ValidationExceptionFactory.forProjectIdentifier(String.format("Project id '%s' does not exist", id)));
    }

    public Collection<Project> getAllProjects() {
        return StreamSupport.stream(this.projectRepository.findAll().spliterator(), false).collect(Collectors.toList());
    }

    public void deleteProject(final Long id) {
        this.projectRepository.delete(getProject(id));

    }
}
