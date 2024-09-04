package com.ooad.careercompass.rest.dto;

public record AuthResponse(String accessToken,Integer userId, String email, String firstName, String lastName,String verifyHash,String role) {
}
