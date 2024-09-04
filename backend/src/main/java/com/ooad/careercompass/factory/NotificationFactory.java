package com.ooad.careercompass.factory;

import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.strategy.EmailNotificationStrategy;
import com.ooad.careercompass.strategy.MessageNotificationStrategy;
import com.ooad.careercompass.strategy.NotificationStrategy;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

public class NotificationFactory {
    //        Done: Factory Pattern
    public static NotificationStrategy getEmailNotificationStrategy(JavaMailSender javaMailSender, UserRepository userRepository){
        return new EmailNotificationStrategy(javaMailSender, userRepository);
    }

    public static NotificationStrategy getSMSNotificationStrategy(){
        return new MessageNotificationStrategy("sms");
    }

    public static NotificationStrategy getCallNotificationStrategy(){
        return new MessageNotificationStrategy("call");
    }
}
