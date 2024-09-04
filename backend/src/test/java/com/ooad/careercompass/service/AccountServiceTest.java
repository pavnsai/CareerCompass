package com.ooad.careercompass.service;

import com.ooad.careercompass.exception.DuplicatedUserInfoException;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.VerificationRequest;
import com.ooad.careercompass.strategy.EmailNotificationStrategy;
import com.ooad.careercompass.strategy.MessageNotificationStrategy;
import com.ooad.careercompass.strategy.NotificationStrategy;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.mail.javamail.JavaMailSender;

import java.util.Optional;

class AccountServiceTest {
    @Mock
    private UserRepository userRepository;
    @Mock
    private UserService userService;
    private AccountService accountService;
    private JavaMailSender javaMailSender;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        accountService = new AccountService(userRepository, userService, javaMailSender);
    }

    @Test
    void checkIfRegistrationIsCompleted_WhenUserIsAlreadyVerified_ShouldThrowException() {
        VerificationRequest verificationRequest = new VerificationRequest();
        verificationRequest.setEmail("fireflies186@gmail.com");

        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setAccountVerified(true);
        genericResponse.setUserAccountPresent(true);

        Mockito.when(userService.checkIfUserExistsAndRegistrationIsCompleted(verificationRequest.getEmail())).thenReturn(genericResponse);

        Assertions.assertThrows(DuplicatedUserInfoException.class, () -> accountService.checkIfRegistrationIsCompleted(verificationRequest));
    }

    @Test
    void sendVerificationChallenge_ShouldReturnGenericResponse() {
        VerificationRequest verificationRequest = new VerificationRequest();
        verificationRequest.setEmail("fireflies186@gmail.com");
        verificationRequest.setVerificationStrategyType("email");

        User user = new User();
        Mockito.when(userRepository.findByEmail(verificationRequest.getEmail())).thenReturn(Optional.of(user));

        GenericResponse response = accountService.sendVerificationChallenge(verificationRequest);

        Assertions.assertNotNull(response);
    }

    @Test
    void getNotificationStrategy_ShouldReturnSMSNotificationStrategy() {
        NotificationStrategy notificationStrategy = accountService.getNotificationStrategy("sms");

        Assertions.assertTrue(notificationStrategy instanceof MessageNotificationStrategy);
    }


    @Test
    void getNotificationStrategy_ShouldReturnEmailNotificationStrategy() {
        NotificationStrategy notificationStrategy = accountService.getNotificationStrategy("email");

        Assertions.assertTrue(notificationStrategy instanceof EmailNotificationStrategy);
    }

    @Test
    void getNotificationStrategy_WithInvalidType_ShouldThrowException() {
        Assertions.assertThrows(RuntimeException.class, () -> accountService.getNotificationStrategy("invalid"));
    }

    @Test
    void validateVerificationChallenge_WithEmptyChallenge_ShouldThrowException() {
        VerificationRequest verificationRequest = new VerificationRequest();
        verificationRequest.setVerificationChallenge("");

        Assertions.assertThrows(RuntimeException.class, () -> accountService.validateVerificationChallenge(verificationRequest));
    }
}