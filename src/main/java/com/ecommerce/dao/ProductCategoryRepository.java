package com.ecommerce.dao;

import com.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

// name of JSON entry " productCategory " and path  /product-category
// the default path is entity name to lower case then add s or ies instead of y
// like this productCategories    camel case 1st letter small and 1st letter of other words are capital
@RepositoryRestResource(collectionResourceRel = "productCategory" ,path = "product-category")
@CrossOrigin("http://localhost:4200")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
}
