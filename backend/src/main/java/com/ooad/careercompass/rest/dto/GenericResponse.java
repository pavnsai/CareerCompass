package com.ooad.careercompass.rest.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GenericResponse {
    private String status;
    private String message;
    private String data;
    private boolean isAccountVerified;
    private boolean isUserAccountPresent;
}
