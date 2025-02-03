package org.example.cartmicroservice.contoller;

import org.example.cartmicroservice.dto.CartProductDTO;
import org.example.cartmicroservice.mapper.CartProductMapper;
import org.example.cartmicroservice.model.CartProduct;
import org.example.cartmicroservice.service.CartConsumer;
import org.example.cartmicroservice.service.CartProducer;
import org.example.cartmicroservice.service.CartProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartProductService cartProductService;
    private final CartProducer cartProducer;
    private final CartConsumer cartConsumer;
    private final CartProductMapper cartProductMapper;

    public CartController(CartProductService cartProductService, CartProducer cartProducer, CartConsumer cartConsumer, CartProductMapper cartProductMapper) {
        this.cartProductService = cartProductService;
        this.cartProducer = cartProducer;
        this.cartConsumer = cartConsumer;
        this.cartProductMapper = cartProductMapper;
    }


    @GetMapping("/items")
    public ResponseEntity<List<CartProductDTO>> getCartItems(
            @RequestHeader("Authorization") String authorizationHeader) {
        Long customerId = extractCustomerIdFromToken(authorizationHeader);

        List<CartProduct> cartProducts = cartProductService.getCartItems(customerId);
        List<CartProductDTO> cartItemsDTO = cartProductMapper.toDto(cartProducts);

        return ResponseEntity.ok(cartItemsDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<CartProductDTO> addProductToCart(@RequestBody CartProductDTO cartProductDTO,
                                                           @RequestHeader("Authorization") String authorizationHeader) {
        Long customerId = extractCustomerIdFromToken(authorizationHeader);
        CartProduct cartProduct = cartProductService.addProductToCart(
                customerId,
                cartProductDTO.getProductId(),
                cartProductDTO.getQuantity()
        );

        return ResponseEntity.ok(cartProductMapper.toDto(cartProduct));
    }

    @PutMapping("/update")
    public ResponseEntity<CartProductDTO> updateCartItem(@RequestBody CartProductDTO cartProductDTO,
                                                      @RequestHeader("Authorization") String authorizationHeader) {
        Long customerId = extractCustomerIdFromToken(authorizationHeader);
        CartProduct updatedCartProduct = cartProductService.updateCartItem(
                customerId,
                cartProductDTO.getProductId(),
                cartProductDTO.getQuantity()
        );
        return ResponseEntity.ok(cartProductMapper.toDto(updatedCartProduct));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeProductFromCart(@RequestBody Map<String, Long> payload,
                                                      @RequestHeader("Authorization") String authorizationHeader) {
        Long customerId = extractCustomerIdFromToken(authorizationHeader);
        Long productId = payload.get("productId");
        cartProductService.removeProductFromCart(customerId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("Authorization") String authorizationHeader) {
        Long customerId = extractCustomerIdFromToken(authorizationHeader);
        cartProductService.clearCart(customerId);
        return ResponseEntity.noContent().build();
    }

    private Long extractCustomerIdFromToken(String authorizationHeader) {
        System.out.println("Authorization header: " + authorizationHeader);

        String token = authorizationHeader.replace("Bearer ", "");

        cartProducer.sendAuthRequest(token);


        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        String customerId = cartConsumer.getValidatedCustomerId();

        System.out.println("Received customerId: " + customerId);

        try {
            return Long.valueOf(customerId);
        } catch (NumberFormatException e) {
            System.out.println("Error parsing customerId: " + customerId);
            throw new IllegalArgumentException("Invalid customer ID format", e);
        }
    }
}
