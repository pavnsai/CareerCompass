package com.ooad.careercompass.rest.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RequestJobTagDto {
    private Integer id;
    private String name;
    private Integer userId;
}
