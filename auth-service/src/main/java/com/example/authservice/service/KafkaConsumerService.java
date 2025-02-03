package com.example.authservice.service;

import com.example.authservice.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final KafkaProducerService kafkaProducerService;
    private final JwtTokenProvider jwtTokenProvider;

    private static final String RESPONSE_TOPIC = "auth-validation-response";

    @KafkaListener(topics = "auth-validation-request", groupId = "auth-service-group")
    public void consumeAuthValidationRequest(String token) {
        String customerId;

        try {
            customerId = jwtTokenProvider.getId(token);
        } catch (Exception e) {
            customerId = "Invalid Token";
        }

        kafkaProducerService.sendMessage(RESPONSE_TOPIC, customerId);
        System.out.println("Validated token: " + customerId);
    }
}
