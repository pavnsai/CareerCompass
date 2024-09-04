package com.ooad.careercompass.repository;

import com.ooad.careercompass.model.JobTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface JobTagRepository extends JpaRepository<JobTag, Integer> {
    @Query(value = "SELECT * FROM job_tags WHERE user_id = ?1", nativeQuery = true)
    ArrayList<JobTag> findByUserId(Integer userId);

    @Query(value = "SELECT * FROM job_tags WHERE user_id = ?1 AND name = ?2", nativeQuery = true)
    JobTag findByUserIdAndTagName(Integer userId,String tagName);
}
