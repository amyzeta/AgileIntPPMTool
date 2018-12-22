package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Project;
import io.agileintelligence.ppmtool.domain.Task;
import io.agileintelligence.ppmtool.exceptions.ValidationExceptionFactory;
import io.agileintelligence.ppmtool.services.ProjectService;
import io.agileintelligence.ppmtool.services.TaskService;
import io.agileintelligence.ppmtool.services.ValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/api/project")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private ValidationErrorService validationErrorService;

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody final Project project, final BindingResult result) {
        final Optional<ResponseEntity<?>> responseEntity = validationErrorMessage(result);
        return responseEntity.orElseGet(() -> new ResponseEntity<>(projectService.createProject(project), HttpStatus.CREATED));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable final Long id, @Valid @RequestBody final Project project, final BindingResult result) {
        return validationErrorMessage(result).orElseGet(() -> {
            if (project.getId() == null) {
                project.setId(id);
            } else if (!project.getId().equals(id)) {
                throw ValidationExceptionFactory.forProjectIdentifier("id in path and body do not match");
            }
            return new ResponseEntity<>(projectService.updateProject(project), HttpStatus.OK);
        });

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

    @PostMapping("/{id}/task")
    public ResponseEntity<?> addTask(@PathVariable final Long id, @Valid @RequestBody Task task, final BindingResult result) {
        return validationErrorMessage(result).orElseGet(() -> new ResponseEntity<Task>(projectService.addTask(id, task), HttpStatus.CREATED));
    }

    @GetMapping("{id}/task")
    public ResponseEntity<Collection<Task>> getAllTasks(@PathVariable final Long id) {
        return new ResponseEntity<>(taskService.getTestsForProject(id), HttpStatus.OK);
    }


    private Optional<ResponseEntity<?>> validationErrorMessage(final BindingResult result) {
        if (result.hasErrors()) {
            return Optional.of(new ResponseEntity<>(validationErrorService.getErrorMap(result.getFieldErrors()), HttpStatus.BAD_REQUEST));
        } else {
            return Optional.empty();
        }
    }
}
