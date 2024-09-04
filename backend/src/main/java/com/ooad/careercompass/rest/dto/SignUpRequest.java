package com.ooad.careercompass.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SignUpRequest {

    @Schema(example = "user3")
    @NotBlank
    private String firstName;

    @Schema(example = "user3")
    @NotBlank
    private String lastName;

    @Schema(example = "user3")
    @NotBlank
    private String password;

    @Schema(example = "user3@mycompany.com")
    @Email
    private String email;

    @Schema(example = "3034744765")
    private String phoneNumber;

    @Schema(example = "true")
    private Boolean verifyByPhoneNumber;
}
