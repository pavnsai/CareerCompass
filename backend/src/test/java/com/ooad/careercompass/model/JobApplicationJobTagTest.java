package com.ooad.careercompass.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class JobApplicationJobTagTest {

    @Test
    public void testCreateJobApplicationJobTag() {
        JobApplicationJobTag jobAppTag = new JobApplicationJobTag();

        JobApplication jobApplication = new JobApplication();
        JobTag jobTag = new JobTag();

        jobAppTag.setJobApplication(jobApplication);
        jobAppTag.setJobTag(jobTag);

        Assertions.assertEquals(jobApplication, jobAppTag.getJobApplication());
        Assertions.assertEquals(jobTag, jobAppTag.getJobTag());
    }

    @Test
    public void testJobApplicationJobTagId() {
        JobApplicationJobTag jobAppTag = new JobApplicationJobTag();

        jobAppTag.setId(1);

        Assertions.assertEquals(1, jobAppTag.getId());
    }


}