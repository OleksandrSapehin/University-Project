package com.example.productservice.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class ProductProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendProductAddedEvent(Long productId) {
        kafkaTemplate.send("product-topic", String.valueOf(productId));
    }

    public ProductProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }
}
