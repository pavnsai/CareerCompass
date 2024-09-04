package com.ooad.careercompass.rest.dto;

import com.ooad.careercompass.utils.ApplicationStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

class JobApplicationsDtoTest {

    @Test
    void testJobApplicationsDto() {
        JobApplicationsDto dto = new JobApplicationsDto();
        dto.setId(1);
        dto.setCompany("AWS");
        dto.setPosition("Software Engineer");
        dto.setStatus(ApplicationStatus.Applied);
        dto.setApplicationDate(LocalDate.of(2023, 4, 8));
        dto.setUpdatedAt(Timestamp.valueOf("2023-04-08 10:00:00"));
        dto.setCompanyUrl("https://aws.amazon.com/console/");
        dto.setStarred(true);
        dto.setArchived(false);
        dto.setNotes("Applied through company website");
        dto.setCreatedAt(Timestamp.valueOf("2023-04-08 09:30:00"));

        JobTagDto tag1 = new JobTagDto();
        tag1.setId(1);
        tag1.setName("Java");

        JobTagDto tag2 = new JobTagDto();
        tag2.setId(2);
        tag2.setName("Spring Boot");

        Set<JobTagDto> jobTags = new HashSet<>();
        jobTags.add(tag1);
        jobTags.add(tag2);
        dto.setJobTags(jobTags);

        Assertions.assertEquals(1, dto.getId());
        Assertions.assertEquals("AWS", dto.getCompany());
        Assertions.assertEquals("Software Engineer", dto.getPosition());
        Assertions.assertEquals(ApplicationStatus.Applied, dto.getStatus());
        Assertions.assertEquals(LocalDate.of(2023, 4, 8), dto.getApplicationDate());
        Assertions.assertEquals(Timestamp.valueOf("2023-04-08 10:00:00"), dto.getUpdatedAt());
        Assertions.assertEquals("https://aws.amazon.com/console/", dto.getCompanyUrl());
        Assertions.assertTrue(dto.isStarred());
        Assertions.assertFalse(dto.isArchived());
        Assertions.assertEquals("Applied through company website", dto.getNotes());
        Assertions.assertEquals(Timestamp.valueOf("2023-04-08 09:30:00"), dto.getCreatedAt());
        Assertions.assertEquals(2, dto.getJobTags().size());
        Assertions.assertTrue(dto.getJobTags().contains(tag1));
        Assertions.assertTrue(dto.getJobTags().contains(tag2));
    }
}