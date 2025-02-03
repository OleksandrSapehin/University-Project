package org.example.cartmicroservice.repository;

import org.example.cartmicroservice.model.Cart;
import org.example.cartmicroservice.model.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartProductRepository extends JpaRepository<CartProduct,Long> {
    Optional<CartProduct> findByCartAndProductId(Cart cart, Long productId);
    List<CartProduct> findByCart(Cart cart);
}
