package com.ooad.careercompass.rest.dto;

import com.ooad.careercompass.utils.ApplicationStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

class RequestJobApplicationDtoTest {

    @Test
    void testRequestJobApplicationDto() {
        RequestJobApplicationDto dto = new RequestJobApplicationDto();
        dto.setUserId(1);
        dto.setId(1);
        dto.setCompany("AWS");
        dto.setPosition("Software Engineer");
        dto.setStatus(ApplicationStatus.Applied);
        dto.setApplicationDate(LocalDate.of(2023, 4, 8));
        dto.setCompanyUrl("https://aws.amazon.com/console/");
        dto.setNotes("Applied through company website");

        Set<Integer> jobTagIds = new HashSet<>();
        jobTagIds.add(1);
        jobTagIds.add(2);
        dto.setJobTagIds(jobTagIds);

        dto.setStarred(true);

        Assertions.assertEquals(1, dto.getUserId());
        Assertions.assertEquals(1, dto.getId());
        Assertions.assertEquals("AWS", dto.getCompany());
        Assertions.assertEquals("Software Engineer", dto.getPosition());
        Assertions.assertEquals(ApplicationStatus.Applied, dto.getStatus());
        Assertions.assertEquals(LocalDate.of(2023, 4, 8), dto.getApplicationDate());
        Assertions.assertEquals("https://aws.amazon.com/console/", dto.getCompanyUrl());
        Assertions.assertEquals("Applied through company website", dto.getNotes());
        Assertions.assertEquals(2, dto.getJobTagIds().size());
        Assertions.assertTrue(dto.getJobTagIds().contains(1));
        Assertions.assertTrue(dto.getJobTagIds().contains(2));
        Assertions.assertTrue(dto.getStarred());
    }
}