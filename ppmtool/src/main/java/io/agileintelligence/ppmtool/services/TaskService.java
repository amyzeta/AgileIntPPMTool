package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Task;
import io.agileintelligence.ppmtool.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    public void createTask(Task task) {
        taskRepository.save(task);
    }

    public List<Task> getTestsForProject(final Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
}
