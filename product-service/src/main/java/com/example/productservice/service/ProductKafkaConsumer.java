package com.example.productservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ProductKafkaConsumer {

    @KafkaListener(topics = "user-events", groupId = "product-service-group")
    public void listen(String message) {
        System.out.println("Received message: " + message);
        // Обработайте сообщение, если нужно
    }

}
