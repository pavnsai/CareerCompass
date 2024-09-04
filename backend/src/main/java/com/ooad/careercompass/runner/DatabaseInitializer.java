package com.ooad.careercompass.runner;

import com.ooad.careercompass.CareerCompassApplication;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.security.WebSecurityConfig;
import com.ooad.careercompass.service.UserService;
import com.ooad.careercompass.utils.CareerCompassUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(CareerCompassApplication.class);
    @Override
    public void run(String... args) {
        if (!userService.getUsers().isEmpty()) {
            return;
        }
        USERS.forEach(user -> {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userService.saveUser(user);
        });
        logger.info("Database initialized");
    }

    private static final List<User> USERS = Arrays.asList(
            new User("AdminFN", "AdminLN", "fireflies186@gmail.com", "Admin@123", CareerCompassUtils.ADMIN,"+13034347442"),
            new User("UserFN", "UserLN", "cranberries186@gmail.com", "User@123", CareerCompassUtils.USER,"+13034347441")
    );
}
