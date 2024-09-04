package com.ooad.careercompass.service;

import com.ooad.careercompass.exception.DuplicatedUserInfoException;
import com.ooad.careercompass.factory.NotificationFactory;
import com.ooad.careercompass.rest.dto.ResetRequest;
import com.ooad.careercompass.strategy.EmailNotificationStrategy;
import com.ooad.careercompass.strategy.NotificationStrategy;
import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.rest.dto.VerificationRequest;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AccountService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final JavaMailSender javaMailSender;

    public void checkIfRegistrationIsCompleted(VerificationRequest verificationRequest){
        if (userService.checkIfUserExistsAndRegistrationIsCompleted(verificationRequest.getEmail()).isAccountVerified()) {
            throw new DuplicatedUserInfoException(String.format("Email %s is already verified", verificationRequest.getEmail()));
        }
    }

    public void checkIfUserIsRegistered(String email){
        if (!userService.hasUserWithEmail(email)) {
            throw new DuplicatedUserInfoException(String.format("Email %s is not registered", email));
        }
    }

    public GenericResponse sendVerificationChallenge(VerificationRequest verificationRequest){
        NotificationStrategy notificationStrategy = getNotificationStrategy(verificationRequest.getVerificationStrategyType().toLowerCase());
        VerificationService verificationService=new VerificationService(notificationStrategy);
        return verificationService.sendUserVerification(userRepository.findByEmail(verificationRequest.getEmail()));
    }

    public GenericResponse sendForgotPasswordEmailChallenge(VerificationRequest verificationRequest){
        EmailNotificationStrategy notificationStrategy = (EmailNotificationStrategy) getNotificationStrategy("email");
        VerificationService verificationService=new VerificationService(notificationStrategy);
        return verificationService.sendForgotPasswordEmailVerification(userRepository.findByEmail(verificationRequest.getEmail()));
    }

    public NotificationStrategy getNotificationStrategy(String strategyType){
        //        Done: Strategy Pattern
        return switch (strategyType) {
            case "sms" -> NotificationFactory.getSMSNotificationStrategy();
            case "call" -> NotificationFactory.getCallNotificationStrategy();
            case "email" -> NotificationFactory.getEmailNotificationStrategy(javaMailSender,userRepository);
            default -> throw new RuntimeException("Invalid verification type");
        };
    }
    public GenericResponse validateVerificationChallenge(VerificationRequest verificationRequest){
        if(ObjectUtils.isEmpty(verificationRequest.getVerificationChallenge())){
            throw new RuntimeException("Invalid verification challenge");
        }
        NotificationStrategy notificationStrategy = getNotificationStrategy(verificationRequest.getVerificationStrategyType().toLowerCase());
        VerificationService verificationService=new VerificationService(notificationStrategy);
        return verificationService.validateVerification(userRepository,verificationRequest);
    }

    public GenericResponse validatePasswordResetEmailLink(VerificationRequest verificationRequest){
        if(ObjectUtils.isEmpty(verificationRequest.getVerificationChallenge())){
            throw new RuntimeException("Invalid password reset link");
        }
        NotificationStrategy notificationStrategy = getNotificationStrategy("email");
        VerificationService verificationService=new VerificationService(notificationStrategy);
        return verificationService.validatePasswordResetEmailLink(userRepository,verificationRequest);
    }

    public GenericResponse resetPasswordResetEmail(ResetRequest resetRequest){
        if(ObjectUtils.isEmpty(resetRequest.getVerificationChallenge())){
            throw new RuntimeException("Invalid password reset link");
        }
        NotificationStrategy notificationStrategy = getNotificationStrategy("email");
        VerificationService verificationService=new VerificationService(notificationStrategy);
        return verificationService.resetUserPasswordEmail(userRepository,resetRequest);
    }
}
