//package com.ooad.careercompass.runner;
//
//import com.ooad.careercompass.model.User;
//import com.ooad.careercompass.service.UserService;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//import java.util.Collections;
//
//import static org.mockito.Mockito.*;
//
//@SpringBootTest
//class DatabaseInitializerTest {
//
//    @Mock
//    private UserService userService;
//
//    @Mock
//    private PasswordEncoder passwordEncoder;
//
//    @InjectMocks
//    private DatabaseInitializer databaseInitializer;
//
//    @Test
//    void run_whenUsersExist_shouldNotInitializeDatabase() throws Exception {
//        when(userService.getUsers()).thenReturn(Collections.singletonList(new User()));
//
//        databaseInitializer.run();
//
//        verify(userService, times(1)).getUsers();
//        verify(userService, never()).saveUser(any(User.class));
//    }
//
//    @Test
//    void run_whenNoUsersExist_shouldInitializeDatabase() throws Exception {
//        when(userService.getUsers()).thenReturn(Collections.emptyList());
//        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
//
//        databaseInitializer.run();
//
//        verify(userService, times(1)).getUsers();
//        verify(passwordEncoder, times(2)).encode(anyString());
//        verify(userService, times(2)).saveUser(any(User.class));
//    }
//}