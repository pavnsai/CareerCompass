package com.ooad.careercompass.service;

import com.ooad.careercompass.model.JobApplication;
import com.ooad.careercompass.model.JobTag;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.repository.JobApplicationRepository;
import com.ooad.careercompass.repository.JobTagRepository;
import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.JobApplicationsDto;
import com.ooad.careercompass.rest.dto.JobTagDto;
import com.ooad.careercompass.rest.dto.RequestJobTagDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class JobTagServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JobApplicationRepository jobApplicationRepository;

    @Mock
    private JobTagRepository jobTagRepository;

    @InjectMocks
    private JobTagService jobTagService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTagsByUserId() throws Exception {
        Integer userId = 1;
        List<JobTag> jobTags = new ArrayList<>();
        when(jobTagRepository.findByUserId(userId)).thenReturn((ArrayList<JobTag>) jobTags);

        List<JobTagDto> result = jobTagService.getAllTagsByUserId(userId);

        assertEquals(jobTags.size(), result.size());
        verify(jobTagRepository, times(1)).findByUserId(userId);
    }

    @Test
    public void testCreateNewTagByUserIdAndTagName() throws Exception {
        Integer userId = 1;
        String tagName = "Tag";
        RequestJobTagDto requestJobTagDto = new RequestJobTagDto();
        requestJobTagDto.setUserId(userId);
        requestJobTagDto.setName(tagName);
        User user = new User();
        user.setId(userId);
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        when(jobTagRepository.findByUserIdAndTagName(userId, tagName)).thenReturn(null);

        GenericResponse result = jobTagService.createNewTagByUserIdAndTagName(requestJobTagDto);

        verify(userRepository, times(1)).findById(userId);
        verify(jobTagRepository, times(1)).findByUserIdAndTagName(userId, tagName);
        verify(jobTagRepository, times(1)).save(any(JobTag.class));
        assertEquals("Success", result.getStatus());
        assertEquals("Added Job Tag Successfully", result.getMessage());
    }

    @Test
    public void testUpdateTagByUserIdAndTagId() throws Exception {
        Integer userId = 1;
        Integer tagId = 1;
        String tagName = "UpdatedTag";
        RequestJobTagDto requestJobTagDto = new RequestJobTagDto();
        requestJobTagDto.setUserId(userId);
        requestJobTagDto.setId(tagId);
        requestJobTagDto.setName(tagName);
        User user = new User();
        user.setId(userId);
        JobTag jobTag = new JobTag();
        jobTag.setId(tagId);
        jobTag.setUser(user);
        when(jobTagRepository.findById(tagId)).thenReturn(Optional.of(jobTag));

        GenericResponse result = jobTagService.updateTagByUserIdAndTagId(requestJobTagDto);

        verify(jobTagRepository, times(1)).findById(tagId);
        verify(jobTagRepository, times(1)).save(any(JobTag.class));
        assertEquals("Success", result.getStatus());
        assertEquals("Updated Job Tag Successfully", result.getMessage());
    }

    @Test
    public void testDeleteByUserIdAndJobApplicationId() throws Exception {
        Integer userId = 1;
        Integer jobApplicationId = 1;
        User user = new User();
        user.setId(userId);
        JobApplication jobApplication = new JobApplication();
        jobApplication.setId(jobApplicationId);
        jobApplication.setUser(user);
        when(jobApplicationRepository.findById(jobApplicationId)).thenReturn(Optional.of(jobApplication));

        jobTagService.deleteByUserIdAndJobApplicationId(userId, jobApplicationId);

        verify(jobApplicationRepository, times(1)).findById(jobApplicationId);
        verify(jobApplicationRepository, times(1)).save(any(JobApplication.class));
        assertTrue(jobApplication.isArchived());
    }

    @Test
    public void testGetByUserIdAndJobApplicationId() throws Exception {
        Integer userId = 1;
        Integer jobApplicationId = 1;
        User user = new User();
        user.setId(userId);
        JobApplication jobApplication = new JobApplication();
        jobApplication.setId(jobApplicationId);
        jobApplication.setUser(user);
        when(jobApplicationRepository.findById(jobApplicationId)).thenReturn(Optional.of(jobApplication));

        JobApplicationsDto result = jobTagService.getByUserIdAndJobApplicationId(userId, jobApplicationId);

        verify(jobApplicationRepository, times(1)).findById(jobApplicationId);
        assertNotNull(result);
    }
}