package com.ooad.careercompass.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class VerificationRequest {

    @Schema(example = "user3@mycompany.com")
    @Email
    private String email;

    @Schema(example = "sms")
    @NotBlank
    private String verificationStrategyType;

    @Schema(example = "654321")
    private String verificationChallenge;
}
