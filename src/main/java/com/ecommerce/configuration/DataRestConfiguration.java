package com.ecommerce.configuration;

import com.ecommerce.entity.Country;
import com.ecommerce.entity.Product;
import com.ecommerce.entity.ProductCategory;
import com.ecommerce.entity.State;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfiguration implements RepositoryRestConfigurer {

    // to make category id like category name from out (expose it)
    EntityManager entityManager;

    @Autowired
    public DataRestConfiguration(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    // continue down to line 50 for this time

// make the page read only by disable some http methods

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] unsupportedActions = {HttpMethod.POST,HttpMethod.PUT,HttpMethod.DELETE};

        // time to disable these http from normal user
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));


    // do it again for Product Category
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));

        // for Country
        config.getExposureConfiguration()
                .forDomainType(Country.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));

        // for State
        config.getExposureConfiguration()
                .forDomainType(State.class)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedActions));

    // any access on these http request will give http error 405 which is not allowed

    //   /product or /product{id} only for get
    //  /product for post or /product{id} for put or delete will not be available

        // back to exposing ids
    exposeIds(config);
    }


    // to mae the id in json out not in something,
    // so I need to expose it
    private void exposeIds(RepositoryRestConfiguration config) {
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses=new ArrayList<>();
        for(EntityType entityType:entities){
            entityClasses.add(entityType.getJavaType());
        }
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
