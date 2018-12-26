package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Task;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {

    List<Task> findByProjectId(Long id);

    Task findByTaskSequence(String taskSequence);
}
