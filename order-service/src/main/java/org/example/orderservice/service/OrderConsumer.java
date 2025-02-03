package org.example.orderservice.service;

import lombok.Getter;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderConsumer {

    private String validatedCustomerId;

    @KafkaListener(topics = "auth-validation-response", groupId = "order-service-group")
    public void listenAuthResponse(String message) {
        this.validatedCustomerId = message;
    }

    public String getValidatedCustomerId() {
        return validatedCustomerId;
    }

}
