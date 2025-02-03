package com.example.authservice.security;

import com.example.authservice.dto.auth.JwtResponseDTO;
import com.example.authservice.model.Customer;
import com.example.authservice.security.prop.JwtProperties;
import com.example.authservice.service.CustomerService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JwtTokenProvider {
    private final JwtProperties jwtProperties ;
    private final UserDetailsService userDetailsService;
    private final CustomerService customerService;
    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes());
    }


    public String createAccessToken(
            final Long userId,
            final String username,
            final String role
    ) {
        Claims claims = Jwts.claims()
                .subject(username)
                .add("id", String.valueOf(userId))
                .add("role", role)
                .build();
        Instant validity = Instant.now()
                .plus(jwtProperties.getAccess(), ChronoUnit.HOURS);
        return Jwts.builder()
                .claims(claims)
                .expiration(Date.from(validity))
                .signWith(key)
                .compact();
    }


    public String createRefreshToken(final Long userId, final String username,final String role) {
        Claims claims = Jwts.claims()
                .subject(username)
                .add("id", String.valueOf(userId))
                .add("role", role)
                .build();
        Instant validity = Instant.now()
                .plus(jwtProperties.getRefresh(), ChronoUnit.DAYS);
        return Jwts.builder()
                .claims(claims)
                .expiration(Date.from(validity))
                .signWith(key)
                .compact();
    }

    public JwtResponseDTO refreshUserTokens(final String refreshToken) {
        JwtResponseDTO jwtResponse = new JwtResponseDTO();
        if (!isValid(refreshToken)) {
            //  throw new AccessDeniedException();
        }
        Long userId = Long.valueOf(getId(refreshToken));
        Customer customer = customerService.getById(userId);
        jwtResponse.setId(userId);
        jwtResponse.setEmail(customer.getEmail());
        jwtResponse.setAccessToken(
                createAccessToken(userId, String.valueOf(customer.getRole()), customer.getEmail()
                ));
        jwtResponse.setRefreshToken(
                createRefreshToken(userId, String.valueOf(customer.getRole()), customer.getEmail())
        );
        return jwtResponse;
    }

    public boolean isValid(final String token) {
        Jws<Claims> claims = Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token);
        return claims.getPayload()
                .getExpiration()
                .after(new Date());
    }

    private String getRole(final String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("role", String.class);
    }

    public String getId(final String token){
        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("id", String.class);

    }

    private String getUsername(final String token) {
        return Jwts
                .parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public UsernamePasswordAuthenticationToken getAuthentication(final String token) {
        String username = getUsername(token);
        String role = getRole(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

        return new UsernamePasswordAuthenticationToken(userDetails, "",userDetails.getAuthorities());
    }
}
