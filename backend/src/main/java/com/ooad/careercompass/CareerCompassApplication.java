package com.ooad.careercompass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.util.Arrays;

@SpringBootApplication
@EnableJpaRepositories
public class CareerCompassApplication {

    public static void main(String[] args) {
        SpringApplication app=new SpringApplication(CareerCompassApplication.class);
        app.setLazyInitialization(true);
        app.run(args);
    }
}
