
package com.ooad.careercompass.rest.controller;

import com.ooad.careercompass.model.User;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.SignUpRequest;
import com.ooad.careercompass.service.AuthService;
import com.ooad.careercompass.service.JobApplicationService;
import com.ooad.careercompass.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PublicControllerTest {

    @Mock
    private UserService userService;


    @InjectMocks
    private PublicController publicController;

    @InjectMocks
    private AuthService authService;
    private SignUpRequest signUpRequest;
    private List<User> registeredUsers;

    @BeforeEach
    void setUp() {
        registeredUsers= new ArrayList<>();
        String firstName="Pavan";
        String lastName="Sai";
        String password="Admin@123";
        String email="fireflies186@gmail.com";
        String phoneNumber="7222222222";
        signUpRequest = new SignUpRequest();
        signUpRequest.setFirstName(firstName);
        signUpRequest.setLastName(lastName);
        signUpRequest.setEmail(email);
        signUpRequest.setPassword(password);
        signUpRequest.setPhoneNumber(phoneNumber);
        registeredUsers.add(authService.mapSignUpRequestToUser(signUpRequest));
    }

    @Test
    void getNumberOfUsers_ReturnsNumberOfUsers() {
        List<User> users = registeredUsers;

        when(userService.getUsers()).thenReturn(users);

        Integer result = publicController.getNumberOfUsers();

        assertEquals(1, result);
        verify(userService).getUsers();
    }

    @Test
    void checkIfUserExistsAndRegistrationIsCompleted_ValidEmail_ReturnsGenericResponse() {
        String email = "fireflies186@gmail.com";
        GenericResponse expectedResponse = new GenericResponse();

        when(userService.checkIfUserExistsAndRegistrationIsCompleted(email)).thenReturn(expectedResponse);

        GenericResponse result = publicController.checkIfUserExistsAndRegistrationIsCompleted(email);

        assertEquals(expectedResponse, result);
        verify(userService).checkIfUserExistsAndRegistrationIsCompleted(email);
    }
}