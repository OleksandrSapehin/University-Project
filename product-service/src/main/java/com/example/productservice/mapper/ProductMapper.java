package com.example.productservice.mapper;

import com.example.productservice.dto.ProductDTO;
import com.example.productservice.model.Product;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductMapper {

    public ProductDTO toDto(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setAmount(product.getAmount());
        productDTO.setDescription(product.getDescription());
        productDTO.setImageUrl(product.getImagePath());
        return productDTO;
    }

    public Product toEntity(ProductDTO productDTO) {
        Product product = new Product();
        product.setId(productDTO.getId());
        product.setName(productDTO.getName());
        product.setAmount(productDTO.getAmount());
        product.setDescription(productDTO.getDescription());
        product.setImagePath(productDTO.getImageUrl());
        return product;
    }
    public List<ProductDTO> toDto(List<Product> products) {
        return products.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    public List<Product> toEntity(List<ProductDTO> productDTOs) {
        return productDTOs.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }


}
