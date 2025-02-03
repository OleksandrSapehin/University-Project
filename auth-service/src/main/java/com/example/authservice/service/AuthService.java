package com.example.authservice.service;

import com.example.authservice.dto.auth.JwtRequestDTO;
import com.example.authservice.dto.auth.JwtResponseDTO;
import com.example.authservice.model.Customer;
import com.example.authservice.security.JwtTokenProvider;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final CustomerService customerService;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;

    public JwtResponseDTO login(JwtRequestDTO loginRequest) {
        JwtResponseDTO jwtResponse = new JwtResponseDTO();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getPassword())
        );
        Customer person = customerService.getByEmail(loginRequest.getEmail());
        jwtResponse.setId(person.getId());
        jwtResponse.setEmail(person.getEmail());
        jwtResponse.setAccessToken(jwtTokenProvider.createAccessToken(
                person.getId(), String.valueOf(person.getRole()), person.getEmail())
        );
        jwtResponse.setRefreshToken(jwtTokenProvider.createRefreshToken(
                person.getId(), String.valueOf(person.getRole()), person.getEmail())
        );
        return jwtResponse;
    }

}
