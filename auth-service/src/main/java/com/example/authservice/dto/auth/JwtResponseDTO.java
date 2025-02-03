package com.example.authservice.dto.auth;

import lombok.Data;

@Data
public class JwtResponseDTO {
    private Long id;
    private String email;
    private String accessToken;
    private String refreshToken;
}
