package com.example.authservice.security;


import com.example.authservice.model.Customer;

public final class PersonDetailsFactory {

    public static PersonDetailsImpl create(final Customer customer) {
        return new PersonDetailsImpl(
                customer.getId(),
                customer.getEmail(),
                customer.getFullName(),
                customer.getPassword(),
                customer.getRole()
        );
    }

}
