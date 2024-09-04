package com.ooad.careercompass.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @Schema(example = "fireflies186@gmail.com")
    @NotBlank
    private String username;

    @Schema(example = "Admin@123")
    @NotBlank
    private String password;
}
