package com.enterprise.ecommerce.product_service.dto;

import com.enterprise.ecommerce.product_service.model.Product;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private String category;
    private String imageUrl;
    private Integer stockQuantity;
    private Long sellerId;
    private LocalDateTime createdAt;
    
    public static ProductResponse fromProduct(Product product) {
        if (product == null) return null;
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .category(product.getCategory())
                .imageUrl(product.getImageUrl())
                .stockQuantity(product.getStockQuantity())
                .sellerId(product.getSellerId())
                .createdAt(product.getCreatedAt())
                .build();
    }
}
