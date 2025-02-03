package com.example.authservice.service;

import com.example.authservice.model.Customer;
import com.example.authservice.model.enums.Role;
import com.example.authservice.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.errors.ResourceNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    private final PasswordEncoder passwordEncoder;

    public Customer getByEmail(String email) {
        return customerRepository.findPersonByEmail(email).orElseThrow(()->new ResourceNotFoundException("User not found."));
    }

    public Customer getById(Long id) {
        return customerRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found."));
    }


    @Transactional
    public Customer create(Customer customer) {
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRole(Role.USER);
        customerRepository.save(customer);
        return customer;
    }
}
