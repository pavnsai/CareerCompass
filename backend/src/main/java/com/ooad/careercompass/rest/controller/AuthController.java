package com.ooad.careercompass.rest.controller;


import com.ooad.careercompass.rest.dto.*;
import com.ooad.careercompass.service.AccountService;
import com.ooad.careercompass.service.AuthService;
import com.ooad.careercompass.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;
    private final UserService userService;

    private final AccountService accountService;
    @PostMapping("/authenticate")
    public AuthResponse login(@Valid @RequestBody LoginRequest loginRequest) throws Exception {
        try {
            String token = authService.authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
            return userService.getUserLoginAuth(loginRequest.getUsername(),token);
        }catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/signup")
    public GenericResponse signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        return authService.signUp(signUpRequest);
    }

    @PostMapping("/sendVerificationChallenge")
    public GenericResponse sendVerificationChallenge(@Valid @RequestBody VerificationRequest verificationRequest) {
        //        Done: Facade Pattern
        accountService.checkIfRegistrationIsCompleted(verificationRequest);
        return accountService.sendVerificationChallenge(verificationRequest);
    }

    @PostMapping("/validateChallenge")
    public GenericResponse validateChallenge(@Valid @RequestBody VerificationRequest verificationRequest) {
        //        Done: Facade Pattern
        accountService.checkIfRegistrationIsCompleted(verificationRequest);
        return accountService.validateVerificationChallenge(verificationRequest);
    }

    @PostMapping("/sendForgotPasswordEmailChallenge")
    public GenericResponse sendForgotPasswordEmailChallenge(@Valid @RequestBody VerificationRequest verificationRequest) {
        //        Done: Facade Pattern
        accountService.checkIfUserIsRegistered(verificationRequest.getEmail());
        return accountService.sendForgotPasswordEmailChallenge(verificationRequest);
    }

    @PostMapping("/validateForgotPasswordEmailChallenge")
    public GenericResponse validateForgotPasswordEmailChallenge(@Valid @RequestBody VerificationRequest verificationRequest) {
        //        Done: Facade Pattern
        accountService.checkIfUserIsRegistered(verificationRequest.getEmail());
        return accountService.validatePasswordResetEmailLink(verificationRequest);
    }

    @PostMapping("/resetForgotPasswordEmailChallenge")
    public GenericResponse resetForgotPasswordEmailChallenge(@Valid @RequestBody ResetRequest resetRequest) {
        //        Done: Facade Pattern
        accountService.checkIfUserIsRegistered(resetRequest.getEmail());
        return accountService.resetPasswordResetEmail(resetRequest);
    }

}
