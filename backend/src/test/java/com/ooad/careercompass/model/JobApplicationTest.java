package com.ooad.careercompass.model;

import org.junit.jupiter.api.Test;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import com.ooad.careercompass.utils.ApplicationStatus;

import static org.junit.jupiter.api.Assertions.*;

class JobApplicationTest {

    @Test
    void testBuilderAndGetters() {
        User user = new User();
        Set<JobTag> jobTags = new HashSet<>();

        JobApplication application = JobApplication.builder()
                .id(1)
                .user(user)
                .company("AWS")
                .position("Software Engineer")
                .status(ApplicationStatus.Applied)
                .applicationDate(LocalDate.now())
                .updatedAt(Timestamp.valueOf(LocalDateTime.now()))
                .companyUrl("https://aws.amazon.com/")
                .starred(true)
                .isDeleted(false)
                .notes("Test notes")
                .createdAt(Timestamp.valueOf(LocalDateTime.now()))
                .jobTags(jobTags)
                .build();

        assertEquals(1, application.getId());
        assertEquals(user, application.getUser());
        assertEquals("AWS", application.getCompany());
        assertEquals("Software Engineer", application.getPosition());
        assertEquals(ApplicationStatus.Applied, application.getStatus());
        assertEquals(LocalDate.now(), application.getApplicationDate());
        assertNotNull(application.getUpdatedAt());
        assertEquals("https://aws.amazon.com/", application.getCompanyUrl());
        assertTrue(application.isStarred());
        assertFalse(application.isArchived());
        assertEquals("Test notes", application.getNotes());
        assertNotNull(application.getCreatedAt());
        assertEquals(jobTags, application.getJobTags());
    }

    @Test
    void testSetters() {
        JobApplication application = new JobApplication();
        User user = new User();
        Set<JobTag> jobTags = new HashSet<>();

        application.setId(1);
        application.setUser(user);
        application.setCompany("AWS");
        application.setPosition("Data Analyst");
        application.setStatus(ApplicationStatus.NeedToFollowUp);
        application.setApplicationDate(LocalDate.now());
        application.setUpdatedAt(Timestamp.valueOf(LocalDateTime.now()));
        application.setCompanyUrl("https://aws.amazon.com/");
        application.setStarred(false);
        application.setArchived(true);
        application.setNotes("Updated notes");
        application.setCreatedAt(Timestamp.valueOf(LocalDateTime.now()));
        application.setJobTags(jobTags);

        assertEquals(1, application.getId());
        assertEquals(user, application.getUser());
        assertEquals("AWS", application.getCompany());
        assertEquals("Data Analyst", application.getPosition());
        assertEquals(ApplicationStatus.NeedToFollowUp, application.getStatus());
        assertEquals(LocalDate.now(), application.getApplicationDate());
        assertNotNull(application.getUpdatedAt());
        assertEquals("https://aws.amazon.com/", application.getCompanyUrl());
        assertFalse(application.isStarred());
        assertTrue(application.isArchived());
        assertEquals("Updated notes", application.getNotes());
        assertNotNull(application.getCreatedAt());
        assertEquals(jobTags, application.getJobTags());
    }
}