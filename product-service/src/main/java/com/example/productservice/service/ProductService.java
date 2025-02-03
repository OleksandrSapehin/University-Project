package com.example.productservice.service;

import com.example.productservice.exeptions.ResourceNotFoundException;
import com.example.productservice.model.Product;
import com.example.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRep;
    private final String uploadDir = "src/main/resources/static/images/";

    public ProductService(ProductRepository productRep) {
        this.productRep = productRep;
    }

    @Transactional
    public Product create(String name, String amount, String description, double price, MultipartFile image) throws IOException {
        Product product = new Product();
        product.setName(name);
        product.setAmount(amount);
        product.setDescription(description);
        product.setPrice(price);

        if (image != null && !image.isEmpty()) {
            String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get(uploadDir, imageName);
            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, image.getBytes());

            product.setImagePath("/images/" + imageName);
        }

        return productRep.save(product);
    }

    public Product getById(Long id) {
        return productRep.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Id is null"));
    }

    @Transactional
    public Product update(Long id, String name, String amount, String description, double price, MultipartFile image) throws IOException {
        Product existingProduct = getById(id);

        existingProduct.setName(name);
        existingProduct.setAmount(amount);
        existingProduct.setDescription(description);
        existingProduct.setPrice(price);

        if (image != null && !image.isEmpty()) {

            String imageName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path imagePath = Paths.get(uploadDir, imageName);

            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, image.getBytes());

            String oldImagePath = existingProduct.getImagePath();
            if (oldImagePath != null) {
                Path oldPath = Paths.get(uploadDir, oldImagePath.replace("/images/", ""));
                Files.deleteIfExists(oldPath);
            }

            existingProduct.setImagePath("/images/" + imageName);
        }

        return productRep.save(existingProduct);
    }

    @Transactional
    public void deleteById(Long productId){
        productRep.deleteById(productId);
    }

    public List<Product> getAll() {
        return productRep.findAll();
    }


}
