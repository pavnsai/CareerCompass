package com.ooad.careercompass.service;

import com.ooad.careercompass.exception.DuplicatedUserInfoException;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.SignUpRequest;
import com.ooad.careercompass.security.TokenProvider;
import com.ooad.careercompass.security.WebSecurityConfig;
import com.ooad.careercompass.utils.CareerCompassUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    public String authenticateAndGetToken(String username, String password) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        return tokenProvider.generate(authentication);
    }

    public User mapSignUpRequestToUser(SignUpRequest signUpRequest) {
        User user = new User();
        user.setPassword(CareerCompassUtils.getInstance().encodeString(signUpRequest.getPassword()));
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setRole(CareerCompassUtils.USER);
        user.setVerifyHash(CareerCompassUtils.getInstance().generateUniqueHash());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setVerified(false);
        return user;
    }

    public GenericResponse signUp(SignUpRequest signUpRequest) {
        GenericResponse genericResponse=new GenericResponse();
        if (userService.hasUserWithEmail(signUpRequest.getEmail())) {
            throw new DuplicatedUserInfoException(String.format("Email %s is already registered", signUpRequest.getEmail()));
        }

        userService.saveUser(mapSignUpRequestToUser(signUpRequest));
        genericResponse.setStatus("Success");
        genericResponse.setMessage("Account Registered");
        return genericResponse;
    }
}
