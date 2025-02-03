package org.example.cartmicroservice.service;

import jakarta.transaction.Transactional;
import org.example.cartmicroservice.model.Cart;
import org.example.cartmicroservice.repository.CartProductRepository;
import org.example.cartmicroservice.repository.CartRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRep;

    public CartService(CartRepository cartRep) {
        this.cartRep = cartRep;
    }

    public Cart getCartByCustomerId(Long customerId) {
        return cartRep.findByCustomerId(customerId)
                .orElseGet(() -> {
                    Cart cart = new Cart();
                    cart.setCustomerId(customerId);
                    return cartRep.save(cart);
                });
    }

    public Cart getById(Long id) {
        return cartRep.findById(id).orElseThrow(() -> new RuntimeException("Cart not found."));
    }

    @KafkaListener(topics = "product-updates", groupId = "cart-service-group")
    public void handleProductMessage(String message) {
    }

    @KafkaListener(topics = "customer-updates", groupId = "cart-service-group")
    public void handleCustomerMessage(String message) {
    }
}
