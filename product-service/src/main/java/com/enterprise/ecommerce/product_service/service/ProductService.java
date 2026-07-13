package com.enterprise.ecommerce.product_service.service;

import com.enterprise.ecommerce.product_service.dto.ProductRequest;
import com.enterprise.ecommerce.product_service.dto.ProductResponse;
import com.enterprise.ecommerce.product_service.model.Product;
import com.enterprise.ecommerce.product_service.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(ProductResponse::fromProduct);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        return ProductResponse.fromProduct(product);
    }

    public Page<ProductResponse> searchProducts(String query, Pageable pageable) {
        if (query == null || query.trim().isEmpty()) {
            return getAllProducts(pageable);
        }
        return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query, pageable)
                .map(ProductResponse::fromProduct);
    }

    public List<String> getAllCategories() {
        return productRepository.findDistinctCategories();
    }

    public Page<ProductResponse> getProductsByCategory(String category, Pageable pageable) {
        return productRepository.findByCategoryIgnoreCase(category, pageable)
                .map(ProductResponse::fromProduct);
    }

    public Page<ProductResponse> getProductsBySeller(Long sellerId, Pageable pageable) {
        return productRepository.findBySellerId(sellerId, pageable)
                .map(ProductResponse::fromProduct);
    }

    public ProductResponse createProduct(ProductRequest request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .imageUrl(request.getImageUrl())
                .stockQuantity(request.getStockQuantity())
                .sellerId(request.getSellerId())
                .build();
                
        Product savedProduct = productRepository.save(product);
        return ProductResponse.fromProduct(savedProduct);
    }

    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
                
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl());
        }
        product.setStockQuantity(request.getStockQuantity());
        if (request.getSellerId() != null) {
            product.setSellerId(request.getSellerId());
        }
        
        Product updatedProduct = productRepository.save(product);
        return ProductResponse.fromProduct(updatedProduct);
    }

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}
