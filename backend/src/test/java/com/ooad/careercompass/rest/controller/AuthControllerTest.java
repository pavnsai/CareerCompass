package com.ooad.careercompass.rest.controller;
import com.ooad.careercompass.rest.dto.*;
        import com.ooad.careercompass.service.AccountService;
import com.ooad.careercompass.service.AuthService;
import com.ooad.careercompass.service.UserService;
import com.ooad.careercompass.utils.CareerCompassUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthService authService;
    @Mock
    private UserService userService;
    @Mock
    private AccountService accountService;

    @InjectMocks
    private AuthController authController;

    private LoginRequest loginRequest;
    private SignUpRequest signUpRequest;
    private VerificationRequest verificationRequest;



    @BeforeEach
    void setUp() {
        String firstName="Pavan";
        String lastName="Sai";
        String password="Admin@123";
        String email="fireflies186@gmail.com";
        String phoneNumber="7222222222";

        loginRequest = new LoginRequest();
        loginRequest.setUsername(email);
        loginRequest.setPassword(password);

        signUpRequest = new SignUpRequest();
        signUpRequest.setFirstName(firstName);
        signUpRequest.setLastName(lastName);
        signUpRequest.setEmail(email);
        signUpRequest.setPassword(password);
        signUpRequest.setPhoneNumber(phoneNumber);

        verificationRequest = new VerificationRequest();
        verificationRequest.setEmail("testuser");
        verificationRequest.setVerificationChallenge("123456");
        verificationRequest.setVerificationStrategyType("sms");

    }

    @Test
    void login_Success() throws Exception {
        String token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MTI2MjQzMzYsImlhdCI6MTcxMjYyMTYzNiwianRpIjoiMzRhMWVhMjktMDE4ZS00YzM3LTgzOTAtYTJmNDhjMTMwMmExIiwiaXNzIjoiY2FyZWVyY29tcGFzcy1hcGkiLCJhdWQiOlsiY2FyZWVyY29tcGFzcy1hcHAiXSwic3ViIjoiZmlyZWZsaWVzMTg2QGdtYWlsLmNvbSIsInJvbCI6WyJBRE1JTiJdLCJuYW1lIjoiQWRtaW5GTiIsInByZWZlcnJlZF91c2VybmFtZSI6ImZpcmVmbGllczE4NkBnbWFpbC5jb20iLCJlbWFpbCI6ImZpcmVmbGllczE4NkBnbWFpbC5jb20ifQ.wKEmyegr5MVlYln2WB3DvBBlATvik41PieuYO0nfvpLdbEr_fzKChi3TsPuxF07VIXu0YrL74nu96K5AiPOGnw";
        Integer userId = 1;
        AuthResponse authResponse = new AuthResponse(token, userId, loginRequest.getUsername(), signUpRequest.getFirstName(), signUpRequest.getLastName(), CareerCompassUtils.getInstance().generateUniqueHash(), "USER");

        when(authService.authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword()))
                .thenReturn(token);
        when(userService.getUserLoginAuth(loginRequest.getUsername(), token))
                .thenReturn(authResponse);

        AuthResponse result = authController.login(loginRequest);

        assertEquals(authResponse, result);
        verify(authService).authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        verify(userService).getUserLoginAuth(loginRequest.getUsername(), token);
    }

    @Test
    void login_ThrowsException() {
        String errorMessage = "Invalid credentials";
        when(authService.authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword()))
                .thenThrow(new RuntimeException(errorMessage));

        Exception exception = assertThrows(Exception.class, () -> {
            authController.login(loginRequest);
        });

        assertEquals(errorMessage, exception.getMessage());
        verify(authService).authenticateAndGetToken(loginRequest.getUsername(), loginRequest.getPassword());
        verify(userService, never()).getUserLoginAuth(anyString(), anyString());
    }

    @Test
    void signUp_Success() {
        GenericResponse genericResponse = new GenericResponse();
        when(authService.signUp(signUpRequest)).thenReturn(genericResponse);

        GenericResponse result = authController.signUp(signUpRequest);

        assertEquals(genericResponse, result);
        verify(authService).signUp(signUpRequest);
    }

    @Test
    void sendVerificationChallenge_Success() {
        GenericResponse genericResponse = new GenericResponse();
        doNothing().when(accountService).checkIfRegistrationIsCompleted(verificationRequest);
        when(accountService.sendVerificationChallenge(verificationRequest)).thenReturn(genericResponse);

        GenericResponse result = authController.sendVerificationChallenge(verificationRequest);

        assertEquals(genericResponse, result);
        verify(accountService).checkIfRegistrationIsCompleted(verificationRequest);
        verify(accountService).sendVerificationChallenge(verificationRequest);
    }

    @Test
    void validateChallenge_Success() {
        GenericResponse genericResponse = new GenericResponse();
        doNothing().when(accountService).checkIfRegistrationIsCompleted(verificationRequest);
        when(accountService.validateVerificationChallenge(verificationRequest)).thenReturn(genericResponse);

        GenericResponse result = authController.validateChallenge(verificationRequest);

        assertEquals(genericResponse, result);
        verify(accountService).checkIfRegistrationIsCompleted(verificationRequest);
        verify(accountService).validateVerificationChallenge(verificationRequest);
    }
}
