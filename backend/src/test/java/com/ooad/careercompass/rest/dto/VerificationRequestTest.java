package com.ooad.careercompass.rest.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class VerificationRequestTest {

    @Test
    void testGetterAndSetter() {
        VerificationRequest request = new VerificationRequest();

        request.setEmail("fireflies186@gmail.com");
        request.setVerificationStrategyType("email");
        request.setVerificationChallenge("123456");

        Assertions.assertEquals("fireflies186@gmail.com", request.getEmail());
        Assertions.assertEquals("email", request.getVerificationStrategyType());
        Assertions.assertEquals("123456", request.getVerificationChallenge());
    }

    @Test
    void testToString() {
        VerificationRequest request = new VerificationRequest();
        request.setEmail("fireflies186@gmail.com");
        request.setVerificationStrategyType("sms");
        request.setVerificationChallenge("654321");

        String expectedToString = "VerificationRequest(email=fireflies186@gmail.com, verificationStrategyType=sms, verificationChallenge=654321)";
        Assertions.assertEquals(expectedToString, request.toString());
    }

    @Test
    void testEqualsAndHashCode() {
        VerificationRequest request1 = new VerificationRequest();
        request1.setEmail("fireflies186@gmail.com");
        request1.setVerificationStrategyType("email");
        request1.setVerificationChallenge("123456");

        VerificationRequest request2 = new VerificationRequest();
        request2.setEmail("fireflies186@gmail.com");
        request2.setVerificationStrategyType("email");
        request2.setVerificationChallenge("123456");

        Assertions.assertEquals(request1, request2);

        Assertions.assertEquals(request1.hashCode(), request2.hashCode());
    }
}