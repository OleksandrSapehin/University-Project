package org.example.cartmicroservice.service;

import jakarta.transaction.Transactional;
import org.example.cartmicroservice.model.Cart;
import org.example.cartmicroservice.model.CartProduct;
import org.example.cartmicroservice.repository.CartProductRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class CartProductService {

    private final CartProductRepository cartProductRep;
    private final CartService cartService;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public CartProductService(CartProductRepository cartProductRep, CartService cartService, KafkaTemplate<String, String> kafkaTemplate) {
        this.cartProductRep = cartProductRep;
        this.cartService = cartService;
        this.kafkaTemplate = kafkaTemplate;
    }


    public CartProduct addProductToCart(Long customerId, Long productId, int quantity) {
        Cart cart = cartService.getCartByCustomerId(customerId);

        // Create a Kafka event to check the existence of the product in the Product service
        kafkaTemplate.send("product-requests", "check-product:" + productId);

        CartProduct cartProduct = cartProductRep.findByCartAndProductId(cart, productId)
                .orElse(new CartProduct(cart, productId, 0));

        cartProduct.setQuantity(cartProduct.getQuantity() + quantity);
        CartProduct savedCartProduct = cartProductRep.save(cartProduct);

        kafkaTemplate.send("cart-updates", "Product added to cart for customer: " + customerId);

        return savedCartProduct;
    }

    public CartProduct updateCartItem(Long customerId, Long productId, int quantity) {
        Cart cart = cartService.getCartByCustomerId(customerId);

        CartProduct cartProduct = cartProductRep.findByCartAndProductId(cart, productId)
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        if (quantity <= 0) {
            cartProductRep.delete(cartProduct);
            kafkaTemplate.send("cart-updates", "Product removed from cart for customer: " + customerId);
            return null;
        }

        cartProduct.setQuantity(quantity);
        CartProduct updatedCartProduct = cartProductRep.save(cartProduct);

        kafkaTemplate.send("cart-updates", "Cart item updated for customer: " + customerId);

        return updatedCartProduct;
    }

    public void removeProductFromCart(Long customerId, Long productId) {
        Cart cart = cartService.getCartByCustomerId(customerId);

        CartProduct cartProduct = cartProductRep.findByCartAndProductId(cart, productId)
                .orElseThrow(() -> new RuntimeException("Product not found in cart"));

        cartProductRep.delete(cartProduct);
        kafkaTemplate.send("cart-updates", "Product removed from cart for customer: " + customerId);
    }

    public List<CartProduct> getCartItems(Long customerId) {
        Cart cart = cartService.getCartByCustomerId(customerId);
        return cartProductRep.findByCart(cart);
    }

    public void clearCart(Long customerId) {
        Cart cart = cartService.getCartByCustomerId(customerId);
        List<CartProduct> cartProducts = cartProductRep.findByCart(cart);

        if (!cartProducts.isEmpty()) {
            cartProductRep.deleteAll(cartProducts);
            kafkaTemplate.send("cart-updates", "Cart cleared for customer: " + customerId);
        }
    }
    @KafkaListener(topics = "product-events", groupId = "cart-product-service-group")
    public void handleProductEvent(String productId) {
    }

}
