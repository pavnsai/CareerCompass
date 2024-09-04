package com.ooad.careercompass.service;

import com.ooad.careercompass.model.JobApplication;
import com.ooad.careercompass.model.JobTag;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.repository.JobApplicationRepository;
import com.ooad.careercompass.repository.JobTagRepository;
import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.rest.dto.JobApplicationsDto;
import com.ooad.careercompass.utils.CareerCompassUtils;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.JobTagDto;
import com.ooad.careercompass.rest.dto.RequestJobTagDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class JobTagService {
    private final UserRepository userRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final JobTagRepository jobTagRepository;
    public List<JobTagDto> getAllTagsByUserId(Integer userId) throws Exception {
        List<JobTag> jobTagList=jobTagRepository.findByUserId(userId);
        List<JobTagDto> jobTagDtoList=new ArrayList<>();
        if(!jobTagList.isEmpty()) {
            jobTagDtoList = CareerCompassUtils.gsonMapperList(jobTagList, JobTagDto.class);
        }
        return jobTagDtoList;
    }

    @Transactional
    public GenericResponse createNewTagByUserIdAndTagName(RequestJobTagDto requestJobTagDto) throws Exception {
        GenericResponse genericResponse=new GenericResponse();
        User user=userRepository.findById(requestJobTagDto.getUserId()).orElseThrow(()-> new Exception("User not found"));
        JobTag jobTag=jobTagRepository.findByUserIdAndTagName(requestJobTagDto.getUserId(),requestJobTagDto.getName());
        if(jobTag==null){
            jobTag=new JobTag();
            jobTag.setUser(user);
            jobTag.setName(requestJobTagDto.getName());
            jobTagRepository.save(jobTag);
        }else{
            throw new Exception("Tag Already Exists");
        }
        genericResponse.setStatus("Success");
        genericResponse.setMessage("Added Job Tag Successfully");
        return genericResponse;
    }

    @Transactional
    public GenericResponse updateTagByUserIdAndTagId(RequestJobTagDto requestJobTagDto) throws Exception {
        GenericResponse genericResponse=new GenericResponse();
        JobTag jobTag=jobTagRepository.findById(requestJobTagDto.getId()).orElseThrow(()-> new Exception("Tag not found"));
        if(!jobTag.getUser().getId().equals(requestJobTagDto.getUserId())){
            throw new Exception("Unauthorized Access");
        }
        jobTag.setName(requestJobTagDto.getName());
        jobTagRepository.save(jobTag);
        genericResponse.setStatus("Success");
        genericResponse.setMessage("Updated Job Tag Successfully");
        return genericResponse;
    }

    public void deleteByUserIdAndJobApplicationId(Integer userId,Integer jobApplicationId) throws Exception {
        JobApplication jobApplication = jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new Exception("Job application not found with ID: " + jobApplicationId));
        if(!jobApplication.getUser().getId().equals(userId)){
            throw new Exception("Unauthorized Access");
        }
        jobApplication.setArchived(true);
        jobApplicationRepository.save(jobApplication);
    }
    public JobApplicationsDto getByUserIdAndJobApplicationId(Integer userId, Integer jobApplicationId) throws Exception {
        JobApplication jobApplication = jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new Exception("Job application not found with ID: " + jobApplicationId));
        if(!jobApplication.getUser().getId().equals(userId)){
            throw new Exception("Unauthorized Access");
        }
        JobApplicationsDto jobApplicationDto = CareerCompassUtils.gsonMapper(jobApplication, JobApplicationsDto.class);

        Set<JobTagDto> jobTagDtos = CareerCompassUtils.gsonMapperSet(jobApplication.getJobTags(), JobTagDto.class);
        jobApplicationDto.setJobTags(jobTagDtos);
        return jobApplicationDto;
    }

}
