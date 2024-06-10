package com.ecommerce.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.engine.internal.Cascade;

import java.util.Set;

@Entity
@Table(name = "product_category")
// @Data will cause bug because of relation shit like one to many and many to one
@Getter
@Setter
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "category_name")
    private String categoryName;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "category")
    private Set<Product> products;

}
