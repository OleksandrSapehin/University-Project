package org.example.cartmicroservice.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class CartProducer {

    private static final String REQUEST_TOPIC = "auth-validation-request";
    private final KafkaTemplate<String, String> kafkaTemplate;


    public CartProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendAuthRequest(String token) {
        kafkaTemplate.send(REQUEST_TOPIC, token);
    }
}
