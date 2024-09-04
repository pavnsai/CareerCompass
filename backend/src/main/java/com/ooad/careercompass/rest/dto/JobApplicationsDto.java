package com.ooad.careercompass.rest.dto;

import com.ooad.careercompass.utils.ApplicationStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Getter
@Setter
public class JobApplicationsDto {
        private Integer id;

        private String company;

        private String position;

        private ApplicationStatus status;

        private LocalDate applicationDate;

        private Timestamp updatedAt;

        private String companyUrl;

        private boolean starred;

        private boolean isArchived;

        private String notes;

        private Timestamp createdAt;

        private Set<JobTagDto> jobTags = new HashSet<>();

}
