package com.example.authservice.controller;

import com.example.authservice.dto.auth.JwtRequestDTO;
import com.example.authservice.dto.auth.JwtResponseDTO;
import com.example.authservice.dto.customer.CustomerDTO;
import com.example.authservice.mapper.CustomerMapper;
import com.example.authservice.model.Customer;
import com.example.authservice.security.JwtTokenProvider;
import com.example.authservice.service.AuthService;
import com.example.authservice.service.CustomerService;
import com.example.authservice.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final CustomerMapper customerMapper;
    private final CustomerService customerService;
    private final AuthService authService;
    private final JwtTokenProvider tokenProvider;
    private final KafkaProducerService kafkaProducerService;

    @PostMapping("/register")
    public CustomerDTO register(@RequestBody @Validated final  CustomerDTO customerDTO) {
        Customer customer = customerMapper.toEntity(customerDTO);
        Customer createdCustomer = customerService.create(customer);
        String message = String.format("{\"event\":\"USER_REGISTERED\",\"id\":%d,\"fullName\":\"%s\",\"email\":\"%s\"}",
                createdCustomer.getId(), createdCustomer.getFullName(), createdCustomer.getEmail());
        kafkaProducerService.sendMessage("user-events", message);
        return customerMapper.toDto(createdCustomer);
    }

    @PostMapping("/login")
    public JwtResponseDTO login(@RequestBody @Validated JwtRequestDTO requestDTO){
        String message = String.format("{\"event\":\"USER_LOGGED_IN\",\"email\":\"%s\",\"loginTime\":\"%s\"}",
                requestDTO.getEmail(), Instant.now().toString());
        kafkaProducerService.sendMessage("user-events", message);
        return authService.login(requestDTO);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtResponseDTO> refreshTokens(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        if (refreshToken == null || refreshToken.isEmpty()) {
            throw new IllegalArgumentException("Refresh Token отсутствует");
        }
        JwtResponseDTO jwtResponse = tokenProvider.refreshUserTokens(refreshToken);
        String message = String.format("{\"event\":\"TOKEN_REFRESHED\",\"email\":\"%s\",\"refreshTime\":\"%s\"}",
                jwtResponse.getEmail(), Instant.now().toString());
        kafkaProducerService.sendMessage("user-events", message);
        return ResponseEntity.ok(jwtResponse);
    }

}
