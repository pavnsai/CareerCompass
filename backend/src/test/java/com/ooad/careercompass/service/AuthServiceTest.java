package com.ooad.careercompass.service;

import com.ooad.careercompass.exception.DuplicatedUserInfoException;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.SignUpRequest;
import com.ooad.careercompass.security.TokenProvider;
import com.ooad.careercompass.security.WebSecurityConfig;
import com.ooad.careercompass.utils.CareerCompassUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserService userService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private TokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    private SignUpRequest signUpRequest;
    private User user;

    @BeforeEach
    void setUp() {
        signUpRequest = new SignUpRequest();
        signUpRequest.setEmail("firefleis186@gmail.com");
        signUpRequest.setPassword("Admin@123");
        signUpRequest.setFirstName("Sagar Swami Rao");
        signUpRequest.setLastName("Kulkarni");
        signUpRequest.setPhoneNumber("3034347686");

        user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(CareerCompassUtils.getInstance().encodeString(signUpRequest.getPassword()));
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setPhoneNumber(signUpRequest.getPhoneNumber());
        user.setRole(CareerCompassUtils.USER);
        user.setVerifyHash(CareerCompassUtils.getInstance().generateUniqueHash());
        user.setVerified(false);
    }

    @Test
    void authenticateAndGetToken_Success() {
        String email = "firefleis186@gmail.com";
        String password = "Admin@123";
        String token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MTI2MjQzMzYsImlhdCI6MTcxMjYyMTYzNiwianRpIjoiMzRhMWVhMjktMDE4ZS00YzM3LTgzOTAtYTJmNDhjMTMwMmExIiwiaXNzIjoiY2FyZWVyY29tcGFzcy1hcGkiLCJhdWQiOlsiY2FyZWVyY29tcGFzcy1hcHAiXSwic3ViIjoiZmlyZWZsaWVzMTg2QGdtYWlsLmNvbSIsInJvbCI6WyJBRE1JTiJdLCJuYW1lIjoiQWRtaW5GTiIsInByZWZlcnJlZF91c2VybmFtZSI6ImZpcmVmbGllczE4NkBnbWFpbC5jb20iLCJlbWFpbCI6ImZpcmVmbGllczE4NkBnbWFpbC5jb20ifQ.wKEmyegr5MVlYln2WB3DvBBlATvik41PieuYO0nfvpLdbEr_fzKChi3TsPuxF07VIXu0YrL74nu96K5AiPOGnw";
        Authentication authentication = mock(Authentication.class);

        when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password)))
                .thenReturn(authentication);
        when(tokenProvider.generate(authentication)).thenReturn(token);

        String result = authService.authenticateAndGetToken(email, password);

        assertEquals(token, result);
        verify(authenticationManager).authenticate(new UsernamePasswordAuthenticationToken(email, password));
        verify(tokenProvider).generate(authentication);
    }

    @Test
    void mapSignUpRequestToUser_Success() {
        User result = authService.mapSignUpRequestToUser(signUpRequest);

        assertEquals(signUpRequest.getEmail(), result.getEmail());
        assertEquals(signUpRequest.getFirstName(), result.getFirstName());
        assertEquals(signUpRequest.getLastName(), result.getLastName());
        assertEquals(signUpRequest.getPhoneNumber(), result.getPhoneNumber());
        assertEquals(CareerCompassUtils.USER, result.getRole());
        assertFalse(result.isVerified());
        assertNotNull(result.getVerifyHash());
    }

    @Test
    void signUp_Success() {
        when(userService.hasUserWithEmail(signUpRequest.getEmail())).thenReturn(false);
        when(userService.saveUser(any(User.class))).thenReturn(user);

        GenericResponse result = authService.signUp(signUpRequest);

        assertEquals("Success", result.getStatus());
        assertEquals("Account Registered", result.getMessage());
        verify(userService).hasUserWithEmail(signUpRequest.getEmail());
        verify(userService).saveUser(any(User.class));
    }

    @Test
    void signUp_DuplicatedUserInfoException() {
        when(userService.hasUserWithEmail(signUpRequest.getEmail())).thenReturn(true);

        assertThrows(DuplicatedUserInfoException.class, () -> authService.signUp(signUpRequest));
        verify(userService).hasUserWithEmail(signUpRequest.getEmail());
        verify(userService, never()).saveUser(any(User.class));
    }
}
