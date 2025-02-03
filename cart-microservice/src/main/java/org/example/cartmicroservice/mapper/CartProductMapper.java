package org.example.cartmicroservice.mapper;

import org.example.cartmicroservice.dto.CartProductDTO;
import org.example.cartmicroservice.model.CartProduct;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CartProductMapper {

    public CartProductDTO toDto(CartProduct cartProduct) {
        if (cartProduct == null) {
            return null;
        }

        CartProductDTO cartProductDTO = new CartProductDTO();
        cartProductDTO.setProductId(cartProduct.getProductId());
        cartProductDTO.setQuantity(cartProduct.getQuantity());

        return cartProductDTO;
    }

    // Преобразование списка CartProduct в список CartProductDTO
    public List<CartProductDTO> toDto(List<CartProduct> cartProducts) {
        if (cartProducts == null) {
            return null;
        }

        List<CartProductDTO> cartProductDTOList = new ArrayList<>();
        for (CartProduct cartProduct : cartProducts) {
            cartProductDTOList.add(toDto(cartProduct));
        }

        return cartProductDTOList;
    }

    // Преобразование CartProductDTO в CartProduct
    public CartProduct toEntity(CartProductDTO cartProductDTO) {
        if (cartProductDTO == null) {
            return null;
        }

        CartProduct cartProduct = new CartProduct();
        cartProduct.setProductId(cartProductDTO.getProductId());
        cartProduct.setQuantity(cartProductDTO.getQuantity());

        return cartProduct;
    }

}
