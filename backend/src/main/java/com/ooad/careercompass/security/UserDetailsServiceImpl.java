package com.ooad.careercompass.security;

import com.ooad.careercompass.model.User;
import com.ooad.careercompass.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format("Username %s not found", email)));
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(user.getRole()));
        return mapUserToCustomUserDetails(user, authorities);
    }

    private CustomUserDetails mapUserToCustomUserDetails(User user, List<SimpleGrantedAuthority> authorities) {
        CustomUserDetails customUserDetails = new CustomUserDetails();
        customUserDetails.setId(user.getId());
        customUserDetails.setUsername(user.getEmail());
        customUserDetails.setPassword(user.getPassword());
        customUserDetails.setName(user.getFirstName());
        customUserDetails.setEmail(user.getEmail());
        customUserDetails.setAuthorities(authorities);
        customUserDetails.setIsAccountNonLocked(user.isVerified());
        return customUserDetails;
    }
}
