package com.ooad.careercompass.rest.dto;

import com.ooad.careercompass.utils.ApplicationStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Data
@Getter
@Setter
public class RequestJobApplicationDto {
        private Integer userId;

        private Integer id;

        private String company;

        private String position;

        private ApplicationStatus status;

        private LocalDate applicationDate;

        private String companyUrl;

        private String notes;

        private Set<Integer> jobTagIds = new HashSet<>();

        private Boolean starred;

}
