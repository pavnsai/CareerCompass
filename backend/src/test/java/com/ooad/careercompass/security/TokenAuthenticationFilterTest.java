package com.ooad.careercompass.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import static org.mockito.Mockito.*;

class TokenAuthenticationFilterTest {

    private TokenAuthenticationFilter tokenAuthenticationFilter;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private TokenProvider tokenProvider;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        tokenAuthenticationFilter = new TokenAuthenticationFilter(userDetailsService, tokenProvider);
    }

    @Test
    void doFilterInternal_ValidToken_ShouldSetAuthentication() throws Exception {
        String token = "validToken";
        String username = "fireflies186@gmail.com";
        UserDetails userDetails = mock(UserDetails.class);
        Jws<Claims> jws = mock(Jws.class);
        Claims claims = mock(Claims.class);

        when(request.getHeader(TokenAuthenticationFilter.TOKEN_HEADER)).thenReturn(TokenAuthenticationFilter.TOKEN_PREFIX + token);
        when(tokenProvider.validateTokenAndGetJws(token)).thenReturn(java.util.Optional.of(jws));
        when(jws.getBody()).thenReturn(claims);
        when(claims.getSubject()).thenReturn(username);
        when(userDetailsService.loadUserByUsername(username)).thenReturn(userDetails);

        tokenAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(userDetailsService).loadUserByUsername(username);
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void doFilterInternal_InvalidToken_ShouldNotSetAuthentication() throws Exception {
        String token = "invalidToken";

        when(request.getHeader(TokenAuthenticationFilter.TOKEN_HEADER)).thenReturn(TokenAuthenticationFilter.TOKEN_PREFIX + token);
        when(tokenProvider.validateTokenAndGetJws(token)).thenReturn(java.util.Optional.empty());

        tokenAuthenticationFilter.doFilterInternal(request, response, filterChain);

        verify(userDetailsService, never()).loadUserByUsername(anyString());
        verify(filterChain).doFilter(request, response);
    }
}

