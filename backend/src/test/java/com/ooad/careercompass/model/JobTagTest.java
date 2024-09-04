package com.ooad.careercompass.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class JobTagTest {

    @Test
    public void testJobTagCreation() {
        User user = new User();
        user.setId(1);
        user.setFirstName("Pavan");

        JobTag jobTag = new JobTag();
        jobTag.setId(1);
        jobTag.setUser(user);
        jobTag.setName("Java");

        Assertions.assertEquals(1, jobTag.getId());
        Assertions.assertEquals(user, jobTag.getUser());
        Assertions.assertEquals("Java", jobTag.getName());
    }

    @Test
    public void testJobTagSetters() {
        JobTag jobTag = new JobTag();

        jobTag.setId(2);
        jobTag.setUser(new User());
        jobTag.setName("Python");

        Assertions.assertEquals(2, jobTag.getId());
        Assertions.assertNotNull(jobTag.getUser());
        Assertions.assertEquals("Python", jobTag.getName());
    }

    @Test
    public void testJobTagNoArgsConstructor() {
        JobTag jobTag = new JobTag();

        Assertions.assertNotNull(jobTag);
    }
}