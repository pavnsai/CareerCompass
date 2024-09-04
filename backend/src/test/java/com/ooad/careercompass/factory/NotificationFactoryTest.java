package com.ooad.careercompass.factory;

import com.ooad.careercompass.strategy.EmailNotificationStrategy;
import com.ooad.careercompass.strategy.MessageNotificationStrategy;
import com.ooad.careercompass.strategy.NotificationStrategy;
import org.junit.jupiter.api.Test;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.lang.reflect.Field;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class NotificationFactoryTest {

    @Test
    public void testGetSMSNotificationStrategy() throws NoSuchFieldException, IllegalAccessException {
        NotificationStrategy strategy = NotificationFactory.getSMSNotificationStrategy();
        assertTrue(strategy instanceof MessageNotificationStrategy);
        MessageNotificationStrategy messageStrategy = (MessageNotificationStrategy) strategy;
        Field strategyTypeField = MessageNotificationStrategy.class.getDeclaredField("strategyType");
        strategyTypeField.setAccessible(true);
        String strategyType = (String) strategyTypeField.get(messageStrategy);
        assertEquals("sms", strategyType);
    }

    @Test
    public void testGetCallNotificationStrategy() throws NoSuchFieldException, IllegalAccessException {
        NotificationStrategy strategy = NotificationFactory.getCallNotificationStrategy();
        assertTrue(strategy instanceof MessageNotificationStrategy);
        MessageNotificationStrategy messageStrategy = (MessageNotificationStrategy) strategy;
        Field strategyTypeField = MessageNotificationStrategy.class.getDeclaredField("strategyType");
        strategyTypeField.setAccessible(true);
        String strategyType = (String) strategyTypeField.get(messageStrategy);
        assertEquals("call", strategyType);
    }
}