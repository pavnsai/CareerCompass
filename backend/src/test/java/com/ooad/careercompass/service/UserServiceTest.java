package com.ooad.careercompass.service;

import com.ooad.careercompass.model.User;
import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.rest.dto.AuthResponse;
import com.ooad.careercompass.rest.dto.GenericResponse;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    void testCheckIfUserExistsAndRegistrationIsCompleted() {
        String email = "fireflies186@gmail.com";
        User user = new User();
        user.setEmail(email);
        user.setVerified(true);

        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        GenericResponse response = userService.checkIfUserExistsAndRegistrationIsCompleted(email);
        Assertions.assertEquals("Success", response.getStatus());
        Assertions.assertEquals("Successfully executed", response.getMessage());
        Assertions.assertTrue(response.isAccountVerified());
        Assertions.assertTrue(response.isUserAccountPresent());
    }

    @Test
    void testGetUsers() {
        List<User> users = new ArrayList<>();
        users.add(new User());
        users.add(new User());

        Mockito.when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getUsers();
        Assertions.assertEquals(users, result);
    }

    @Test
    void testGetUserByEmail() {
        String email = "fireflies186@gmail.com";
        User user = new User();
        user.setEmail(email);

        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        Optional<User> result = userService.getUserByEmail(email);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals(user, result.get());
    }

    @Test
    void testGetUserLoginAuth() {
        String email = "fireflies186@gmail.com";
        String accessToken = "accessToken";
        User user = new User();
        user.setId(1);
        user.setEmail(email);
        user.setFirstName("Pavan");
        user.setLastName("Sai");
        user.setVerifyHash("verifyHash");
        user.setRole("USER");

        Mockito.when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        AuthResponse response = userService.getUserLoginAuth(email, accessToken);
        Assertions.assertEquals(accessToken, response.accessToken());
        Assertions.assertEquals(user.getId(), response.userId());
        Assertions.assertEquals(user.getEmail(), response.email());
        Assertions.assertEquals(user.getFirstName(), response.firstName());
        Assertions.assertEquals(user.getLastName(), response.lastName());
        Assertions.assertEquals(user.getVerifyHash(), response.verifyHash());
        Assertions.assertEquals(user.getRole(), response.role());
    }

    @Test
    void testHasUserWithEmail() {
        String email = "fireflies186@gmail.com";
        Mockito.when(userRepository.existsByEmail(email)).thenReturn(true);

        boolean result = userService.hasUserWithEmail(email);
        Assertions.assertTrue(result);
    }

    @Test
    void testSaveUser() {
        User user = new User();
        Mockito.when(userRepository.save(user)).thenReturn(user);

        User savedUser = userService.saveUser(user);
        Assertions.assertEquals(user, savedUser);
    }
}