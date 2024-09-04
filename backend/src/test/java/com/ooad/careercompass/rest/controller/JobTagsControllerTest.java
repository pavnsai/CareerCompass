package com.ooad.careercompass.rest.controller;

import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.JobTagDto;
import com.ooad.careercompass.rest.dto.RequestJobTagDto;
import com.ooad.careercompass.service.JobTagService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JobTagsControllerTest {

    @Mock
    private JobTagService jobTagService;

    @InjectMocks
    private JobTagsController jobTagsController;

    private Integer userId;
    private List<JobTagDto> jobTags;
    @BeforeEach
    void setUp() {
        jobTags=new ArrayList<>();
        userId = 1;
        JobTagDto jobTag=new JobTagDto();
        jobTag.setId(1);
        jobTag.setName("tag1");
        jobTags.add(jobTag);
    }

    @Test
    void getAllTags_ValidUserId_ReturnsListOfJobTagDto() throws Exception {
        List<JobTagDto> expectedTags = jobTags;

        when(jobTagService.getAllTagsByUserId(userId)).thenReturn(expectedTags);

        List<JobTagDto> result = jobTagsController.getAllTags(userId);

        assertEquals(expectedTags, result);
        verify(jobTagService).getAllTagsByUserId(userId);
    }

    @Test
    void createTag_ValidRequest_ReturnsGenericResponse() throws Exception {
        GenericResponse expectedResponse = new GenericResponse();
        RequestJobTagDto requestJobTagDto = new RequestJobTagDto();
        requestJobTagDto.setName("tag1");
        requestJobTagDto.setUserId(1);
        when(jobTagService.createNewTagByUserIdAndTagName(requestJobTagDto)).thenReturn(expectedResponse);

        GenericResponse result = jobTagsController.createTag(requestJobTagDto);

        assertEquals(expectedResponse, result);
        verify(jobTagService).createNewTagByUserIdAndTagName(requestJobTagDto);
    }

    @Test
    void updateTag_ValidRequest_ReturnsGenericResponse() throws Exception {
        GenericResponse expectedResponse = new GenericResponse();
        RequestJobTagDto requestJobTagDto = new RequestJobTagDto();
        requestJobTagDto.setId(1);
        requestJobTagDto.setName("tag2");
        requestJobTagDto.setUserId(1);
        when(jobTagService.updateTagByUserIdAndTagId(requestJobTagDto)).thenReturn(expectedResponse);

        GenericResponse result = jobTagsController.updateTag(requestJobTagDto);

        assertEquals(expectedResponse, result);
        verify(jobTagService).updateTagByUserIdAndTagId(requestJobTagDto);
    }
}