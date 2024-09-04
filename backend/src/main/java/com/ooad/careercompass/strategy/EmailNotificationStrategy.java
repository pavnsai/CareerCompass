
package com.ooad.careercompass.strategy;
import com.ooad.careercompass.CareerCompassApplication;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.rest.dto.GenericResponse;
import com.ooad.careercompass.utils.CareerCompassUtils;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailNotificationStrategy implements NotificationStrategy {
    private static final Logger logger = LoggerFactory.getLogger(CareerCompassApplication.class);
    private final JavaMailSender mailSender;
    private final UserRepository userRepository;

    @Override
    public GenericResponse sendNotification(User user) {
        GenericResponse genericResponse = new GenericResponse();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Greetings from Career-Compass");
            message.setText("Dear " + user.getFirstName() + ",\n\nThanks for registering. Please click the link below to verify your email:\nhttp://localhost:3000/verify/" + user.getEmail() + "/" + user.getVerifyHash() + "\n\nRegards,\nCareer-Compass");
            message.setFrom("appari.pavan99@gmail.com");
            mailSender.send(message);
            genericResponse.setStatus("Success");
            genericResponse.setMessage("Successfully sent email");
        } catch (Exception e) {
            genericResponse.setStatus("Error");
            genericResponse.setMessage(e.getMessage());
            logger.error(e.getMessage(), e);
        }
        return genericResponse;
    }

    public GenericResponse sendForgotPasswordNotification(User user) {
        GenericResponse genericResponse = new GenericResponse();
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Career-Compass: Forgot Password");
            message.setText("Dear " + user.getFirstName() + ",\n\nIt seems you have requested to reset your password. Please click the link below to reset your password:\nhttp://localhost:3000/reset-password/" + user.getVerifyHash() + "/" + user.getEmail() + "\n\nIf you did not request a password reset, please ignore this email.\n\nRegards,\nCareer-Compass");
            message.setFrom("appari.pavan99@gmail.com");
            mailSender.send(message);
            genericResponse.setStatus("Success");
            genericResponse.setMessage("Successfully sent email");
        } catch (Exception e) {
            genericResponse.setStatus("Error");
            genericResponse.setMessage(e.getMessage());
            logger.error(e.getMessage(), e);
        }
        return genericResponse;
    }

    public GenericResponse validateForgotPasswordLink(User user, String authSecret) {
        GenericResponse genericResponse = new GenericResponse();
        if (user.getVerifyHash().equals(authSecret)) {
            user.setVerifyHash(CareerCompassUtils.getInstance().generateUniqueHash());
            userRepository.save(user);
            genericResponse.setStatus("Success");
            genericResponse.setData(user.getVerifyHash());
            genericResponse.setMessage("Hurray! Password Reset Link is Valid");
        } else {
            genericResponse.setStatus("Error");
            genericResponse.setMessage("Oops! Link seems to be broken!");
        }
        return genericResponse;
    }

    public GenericResponse resetPasswordAndNotify(User user, String password, String authSecret) {
        GenericResponse genericResponse = new GenericResponse();
        if (user.getVerifyHash().equals(authSecret)) {
            user.setVerifyHash(CareerCompassUtils.getInstance().generateUniqueHash());
            user.setPassword(CareerCompassUtils.getInstance().encodeString(password));
            user.setVerified(true);
            userRepository.save(user);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Career-Compass: Password Reset Successful");
            message.setText("Dear " + user.getFirstName() + ",\n\nYour password has been reset successfully. If you did not request a password reset or believe this is an error, please contact our support team immediately.\n\nRegards,\nCareer-Compass");
            message.setFrom("appari.pavan99@gmail.com");
            mailSender.send(message);
            genericResponse.setStatus("Success");
            genericResponse.setMessage("Hurray! Password Has Been Reset");
        } else {
            genericResponse.setStatus("Error");
            genericResponse.setMessage("Oops! Link seems to be broken!");
        }
        return genericResponse;
    }

    @Override
    public GenericResponse validateAccount(User user, String authSecret) {
        GenericResponse genericResponse = new GenericResponse();
        if (user.getVerifyHash().equals(authSecret)) {
            user.setVerifyHash(CareerCompassUtils.getInstance().generateUniqueHash());
            user.setVerified(true);
            genericResponse.setStatus("Success");
            genericResponse.setMessage("Hurray! Account Verified");
        } else {
            genericResponse.setStatus("Error");
            genericResponse.setMessage("Oops! Link seems to be broken!");
        }
        return genericResponse;
    }
}