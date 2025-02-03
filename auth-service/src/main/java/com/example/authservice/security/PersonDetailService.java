package com.example.authservice.security;

import com.example.authservice.model.Customer;
import com.example.authservice.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PersonDetailService implements UserDetailsService {

    private final CustomerService customerService;

    @Override
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        Customer customer = customerService.getByEmail(username);
        return PersonDetailsFactory.create(customer);
    }

    public Long getAuthPersonId(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        PersonDetailsImpl personDetails = (PersonDetailsImpl) authentication.getPrincipal();
        return personDetails.getId();
    }

}
