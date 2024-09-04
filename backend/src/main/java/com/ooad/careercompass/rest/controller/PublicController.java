package com.ooad.careercompass.rest.controller;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public")
public class PublicController {
    private final UserService userService;

    @GetMapping("/numberOfUsers")
    public Integer getNumberOfUsers() {
        return userService.getUsers().size();
    }

    @GetMapping("/checkUserRegistrationStatus/{email}")
    public GenericResponse checkIfUserExistsAndRegistrationIsCompleted(@PathVariable("email") String email) {
        return userService.checkIfUserExistsAndRegistrationIsCompleted(email);
    }
}
