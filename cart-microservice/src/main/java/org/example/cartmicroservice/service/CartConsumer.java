package org.example.cartmicroservice.service;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class CartConsumer {

    private final CartProductService cartProductService;
    private String validatedCustomerId;

    public CartConsumer(CartProductService cartProductService) {
        this.cartProductService = cartProductService;
    }

    @KafkaListener(topics = "product-topic", groupId = "cart-service-group")
    public void listenProductAdded(String message) {
        Long productId = Long.valueOf(message);
        cartProductService.handleProductEvent(String.valueOf(productId));
    }

    @KafkaListener(topics = "auth-validation-response", groupId = "cart-service-group")
    public void listenAuthResponse(String message) {
        this.validatedCustomerId = message;
    }

    public String getValidatedCustomerId() {
        return validatedCustomerId;
    }
}
