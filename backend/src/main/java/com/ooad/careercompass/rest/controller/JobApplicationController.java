package com.ooad.careercompass.rest.controller;

import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.JobApplicationsDto;
import com.ooad.careercompass.rest.dto.RequestJobApplicationDto;
import com.ooad.careercompass.service.JobApplicationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ooad.careercompass.config.SwaggerConfig.BEARER_KEY_SECURITY_SCHEME;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tracker")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/inbox/{userId}")
    public List<JobApplicationsDto> getAllUnarchivedJobApplications(@PathVariable("userId") Integer userId) {
        return jobApplicationService.getAllUnarchivedJobApplications(userId);
    }

    @GetMapping("/archive/{userId}")
    public List<JobApplicationsDto> getAllArchivedJobApplications(@PathVariable("userId") Integer userId) {
        return jobApplicationService.getAllArchivedJobApplications(userId);
    }
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PostMapping("/createJobApplication")
    public GenericResponse createJobApplication(@RequestBody RequestJobApplicationDto requestJobApplicationDto) throws Exception {
        return jobApplicationService.addJobApplication(requestJobApplicationDto);
    }
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @GetMapping("/getJobApplication/{userId}/{jobApplicationId}")
    public JobApplicationsDto getJobApplication(@PathVariable("userId") Integer userId, @PathVariable("jobApplicationId") Integer jobApplicationId) throws Exception {
        return jobApplicationService.getByUserIdAndJobApplicationId(userId,jobApplicationId);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PutMapping("/updateJobApplication")
    public GenericResponse updateJobApplication(@RequestBody RequestJobApplicationDto requestJobApplicationDto) throws Exception {
        return jobApplicationService.updateJobApplication(requestJobApplicationDto);
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/archiveJobApplication/{userId}/{jobApplicationId}")
    public ResponseEntity<Void> archiveJobApplication(@PathVariable("userId") Integer userId, @PathVariable("jobApplicationId") Integer jobApplicationId) throws Exception {
        jobApplicationService.archiveByUserIdAndJobApplicationId(userId,jobApplicationId);
        return ResponseEntity.noContent().build();
    }

    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @DeleteMapping("/unarchiveJobApplication/{userId}/{jobApplicationId}")
    public ResponseEntity<Void> unarchiveJobApplication(@PathVariable("userId") Integer userId, @PathVariable("jobApplicationId") Integer jobApplicationId) throws Exception {
        jobApplicationService.unarchiveByUserIdAndJobApplicationId(userId,jobApplicationId);
        return ResponseEntity.noContent().build();
    }
    @Operation(security = {@SecurityRequirement(name = BEARER_KEY_SECURITY_SCHEME)})
    @PatchMapping("/updateJobApplicationStarStatus/{userId}/{jobApplicationId}")
    public GenericResponse starJobApplication(@PathVariable("userId") Integer userId, @PathVariable("jobApplicationId") Integer jobApplicationId) throws Exception {
        return jobApplicationService.updateStarredStatusByUserIdAndJobApplicationId(userId,jobApplicationId);
    }
}
