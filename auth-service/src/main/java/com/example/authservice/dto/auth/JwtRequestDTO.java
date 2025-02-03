package com.example.authservice.dto.auth;

import lombok.Data;

@Data
public class JwtRequestDTO {

    private String email;

    private String password;

}
