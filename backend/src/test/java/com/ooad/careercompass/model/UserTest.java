package com.ooad.careercompass.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.sql.Timestamp;

public class UserTest {

    @Test
    public void testUserCreation() {
        String firstName = "Pavan";
        String lastName = "Sai";
        String email = "fireflies186@gmail.com";
        String password = "Admin@123";
        String role = "USER";
        String phoneNumber="+13034345434";

        User user = new User(firstName, lastName, email, password, role,phoneNumber);

        Assertions.assertEquals(firstName, user.getFirstName());
        Assertions.assertEquals(lastName, user.getLastName());
        Assertions.assertEquals(email, user.getEmail());
        Assertions.assertEquals(password, user.getPassword());
        Assertions.assertNotNull(user.getCreatedAt());
        Assertions.assertNotNull(user.getVerifyHash());
        Assertions.assertTrue(user.isVerified());
        Assertions.assertEquals(role, user.getRole());
    }

    @Test
    public void testUserProperties() {
        User user = new User();
        user.setId(1);
        user.setFirstName("Pavan");
        user.setLastName("Sai");
        user.setEmail("fireflies186@gmail.com");
        user.setPassword("Admin@123");
        user.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        user.setVerifyHash("abcdefg");
        user.setVerified(false);
        user.setRole("ADMIN");
        user.setPhoneNumber("1234567890");

        Assertions.assertEquals(1, user.getId());
        Assertions.assertEquals("Pavan", user.getFirstName());
        Assertions.assertEquals("Sai", user.getLastName());
        Assertions.assertEquals("fireflies186@gmail.com", user.getEmail());
        Assertions.assertEquals("Admin@123", user.getPassword());
        Assertions.assertNotNull(user.getCreatedAt());
        Assertions.assertEquals("abcdefg", user.getVerifyHash());
        Assertions.assertFalse(user.isVerified());
        Assertions.assertEquals("ADMIN", user.getRole());
        Assertions.assertEquals("1234567890", user.getPhoneNumber());
    }
}