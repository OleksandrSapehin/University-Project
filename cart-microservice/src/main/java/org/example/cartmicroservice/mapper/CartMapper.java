package org.example.cartmicroservice.mapper;

import org.example.cartmicroservice.dto.CartDTO;
import org.example.cartmicroservice.dto.CartProductDTO;
import org.example.cartmicroservice.model.Cart;
import org.example.cartmicroservice.model.CartProduct;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CartMapper {
    private final CartProductMapper cartProductMapper;

    public CartMapper(CartProductMapper cartProductMapper) {
        this.cartProductMapper = cartProductMapper;
    }

    // Преобразование Cart в CartDTO
    public CartDTO toDto(Cart cart) {
        if (cart == null) {
            return null;
        }

        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(cart.getId());
        cartDTO.setCustomerId(cart.getCustomerId());

        // Преобразуем список CartProduct в CartProductDTO
        List<CartProductDTO> cartProductDTOList = cartProductMapper.toDto(cart.getCartProducts());
        cartDTO.setProducts(cartProductDTOList);

        return cartDTO;
    }

    // Преобразование списка Cart в список CartDTO
    public List<CartDTO> toDto(List<Cart> carts) {
        if (carts == null) {
            return null;
        }

        List<CartDTO> cartDTOList = new ArrayList<>();
        for (Cart cart : carts) {
            cartDTOList.add(toDto(cart));
        }

        return cartDTOList;
    }

    public Cart toEntity(CartDTO cartDTO) {
        if (cartDTO == null) {
            return null;
        }

        Cart cart = new Cart();
        cart.setId(cartDTO.getId());
        cart.setCustomerId(cartDTO.getCustomerId());

        // Преобразуем список CartProductDTO в CartProduct
        List<CartProduct> cartProducts = new ArrayList<>();
        for (CartProductDTO productDTO : cartDTO.getProducts()) {
            cartProducts.add(cartProductMapper.toEntity(productDTO));
        }
        cart.setCartProducts(cartProducts);

        return cart;
    }
}
