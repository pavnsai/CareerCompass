package com.ooad.careercompass.strategy;

import com.ooad.careercompass.model.User;
import com.ooad.careercompass.rest.dto.GenericResponse;

public interface NotificationStrategy {
    GenericResponse sendNotification(User user);

    GenericResponse validateAccount(User user,String authSecret);
}