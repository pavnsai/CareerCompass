package com.ooad.careercompass.rest.dto;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class RequestJobTagDtoTest {

    @Test
    void testRequestJobTagDto() {
        RequestJobTagDto dto = new RequestJobTagDto();
        dto.setId(1);
        dto.setName("Java");
        dto.setUserId(1);

        Assertions.assertEquals(1, dto.getId());
        Assertions.assertEquals("Java", dto.getName());
        Assertions.assertEquals(1, dto.getUserId());
    }

}