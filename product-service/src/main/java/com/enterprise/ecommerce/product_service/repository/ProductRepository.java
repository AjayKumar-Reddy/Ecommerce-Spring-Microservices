package com.enterprise.ecommerce.product_service.repository;

import com.enterprise.ecommerce.product_service.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByCategoryIgnoreCase(String category, Pageable pageable);
    
    Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description, Pageable pageable);
    
    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findDistinctCategories();
    
    Page<Product> findBySellerId(Long sellerId, Pageable pageable);
}
