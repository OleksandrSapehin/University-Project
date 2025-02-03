package com.example.authservice.dto.customer;

import lombok.Data;

@Data
public class CustomerDTO {

    private Long id;

    private String fullName;

    private String phoneNumber;

    private String email;

    private String password;

}
