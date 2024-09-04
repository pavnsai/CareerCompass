//package com.ooad.careercompass.service;
//
//import com.ooad.careercompass.model.User;
//import com.ooad.careercompass.strategy.EmailNotificationStrategy;
//import org.junit.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static junit.framework.TestCase.assertNotNull;
//
//@SpringBootTest
//public class JavaMailCheckTest {
//
//    @Autowired
//    private EmailNotificationStrategy emailNotificationStrategy;
//
//    @Test
//    public void testMailSenderNotNull() {
//        User user=new User();
//        user.setEmail("fireflies186@gmail.com");
//        user.setFirstName("S");
//        user.setLastName("S");
//        user.setVerified(false);
//        assertNotNull(emailNotificationStrategy);
//        assertNotNull(emailNotificationStrategy.sendNotification(user));
//    }
//}
//
