package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.exceptions.ValidationExceptionFactory;
import io.agileintelligence.ppmtool.services.ProjectService;
import io.agileintelligence.ppmtool.services.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody final Project project, final BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(validationErrorService.getErrorMap(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(projectService.createProject(project), HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable final Long id, @Valid @RequestBody final Project project, final BindingResult result) {
        if (result.hasErrors()) {
            return new ResponseEntity<>(validationErrorService.getErrorMap(result.getFieldErrors()), HttpStatus.BAD_REQUEST);
        }

        if (project.getId() == null) {
            project.setId(id);
        } else if (!project.getId().equals(id)) {
            throw ValidationExceptionFactory.forProjectIdentifier("id in path and body do not match");
        }
        return new ResponseEntity<>(projectService.updateProject(project), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> get(@PathVariable final Long id) {
        final Project project = projectService.getProject(id);
        return new ResponseEntity<>(project, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<Collection<Project>> getAll() {
        return new ResponseEntity<>(projectService.getAllProjects(), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable final Long id) {
        projectService.deleteProject(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
