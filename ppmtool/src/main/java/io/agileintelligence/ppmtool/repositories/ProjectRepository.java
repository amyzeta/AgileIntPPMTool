package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Project;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {

    @Transactional
    @Modifying
    @Query("update Project p set p.projectName = ?1, p.description = ?2 , p.startDate = ?3, p.endDate = ?4, p.updatedAt = current_timestamp where p.id = ?5")
    int updateProject(String projectName, String description, Date startDate, Date endDate, Long id);
}
