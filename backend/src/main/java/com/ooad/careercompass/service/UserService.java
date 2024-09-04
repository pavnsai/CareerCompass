package com.ooad.careercompass.service;

import com.ooad.careercompass.repository.UserRepository;
import com.ooad.careercompass.model.User;
import com.ooad.careercompass.rest.dto.AuthResponse;
import com.ooad.careercompass.rest.dto.GenericResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;


    public GenericResponse checkIfUserExistsAndRegistrationIsCompleted(String email){
        Optional<User> user=userRepository.findByEmail(email);

        GenericResponse genericResponse=new GenericResponse();
        if(user.isPresent()){
            genericResponse.setAccountVerified(user.get().isVerified());
            genericResponse.setUserAccountPresent(true);
        }else{
            genericResponse.setAccountVerified(false);
            genericResponse.setUserAccountPresent(false);
        }
        genericResponse.setStatus("Success");
        genericResponse.setMessage("Successfully executed");
        return genericResponse;
    }
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    public AuthResponse getUserLoginAuth(String email,String accessToken){
        User user= userRepository.findByEmail(email).orElseThrow();
        return new AuthResponse(accessToken,user.getId(),user.getEmail(),user.getFirstName(),user.getLastName(),user.getVerifyHash(),user.getRole());
    }
    public boolean hasUserWithEmail(String email) {
        return userRepository.existsByEmail(email);
    }



    public User saveUser(User user) {
        return userRepository.save(user);
    }


}
