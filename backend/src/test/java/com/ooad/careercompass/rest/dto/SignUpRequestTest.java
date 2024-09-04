package com.ooad.careercompass.rest.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class SignUpRequestTest {

    @Test
    void testGetterAndSetter() {
        SignUpRequest request = new SignUpRequest();

        request.setFirstName("Pavan");
        request.setLastName("Sai");
        request.setPassword("Admin@123");
        request.setEmail("fireflies186@gmail.com");
        request.setPhoneNumber("7222222222");
        request.setVerifyByPhoneNumber(true);

        Assertions.assertEquals("Pavan", request.getFirstName());
        Assertions.assertEquals("Sai", request.getLastName());
        Assertions.assertEquals("Admin@123", request.getPassword());
        Assertions.assertEquals("fireflies186@gmail.com", request.getEmail());
        Assertions.assertEquals("7222222222", request.getPhoneNumber());
        Assertions.assertTrue(request.getVerifyByPhoneNumber());
    }

    @Test
    void testToString() {
        SignUpRequest request = new SignUpRequest();
        request.setFirstName("Pavan");
        request.setLastName("Sai");
        request.setPassword("Admin@123");
        request.setEmail("fireflies186@gmail.com");
        request.setPhoneNumber("7222222222");
        request.setVerifyByPhoneNumber(true);

        String expectedToString = "SignUpRequest(firstName=Pavan, lastName=Sai, password=Admin@123, email=fireflies186@gmail.com, phoneNumber=7222222222, verifyByPhoneNumber=true)";
        Assertions.assertEquals(expectedToString, request.toString());
    }

    @Test
    void testEqualsAndHashCode() {
        SignUpRequest request1 = new SignUpRequest();
        request1.setFirstName("Pavan");
        request1.setLastName("Sai");
        request1.setPassword("Admin@123");
        request1.setEmail("fireflies186@gmail.com");
        request1.setPhoneNumber("7222222222");
        request1.setVerifyByPhoneNumber(true);

        SignUpRequest request2 = new SignUpRequest();
        request2.setFirstName("Pavan");
        request2.setLastName("Sai");
        request2.setPassword("Admin@123");
        request2.setEmail("fireflies186@gmail.com");
        request2.setPhoneNumber("7222222222");
        request2.setVerifyByPhoneNumber(true);

        Assertions.assertEquals(request1, request2);

        Assertions.assertEquals(request1.hashCode(), request2.hashCode());
    }
}