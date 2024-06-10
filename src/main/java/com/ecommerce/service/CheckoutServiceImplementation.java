package com.ecommerce.service;

import com.ecommerce.dao.CustomerRepository;
import com.ecommerce.dto.Purchase;
import com.ecommerce.dto.PurchaseResponse;
import com.ecommerce.entity.Customer;
import com.ecommerce.entity.Order;
import com.ecommerce.entity.OrderItem;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImplementation implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImplementation(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }


    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
    //Retrieve order info
    Order order=purchase.getOrder();

    //Generate tracking number
    String orderTrackingNumber=generateOrderTrackingNumber();
    order.setOrderTrackingNumber(orderTrackingNumber);

    //Populate order with order items
    Set<OrderItem> orderItems=purchase.getOrderItems();
    orderItems.forEach(orderItem-> order.add(orderItem));

    //Populate order with billingAddress and shippingAddress
    order.setBillingAddress(purchase.getBillingAddress());
    order.setShippingAddress(purchase.getShippingAddress());

    //Populate order with customer
    Customer customer=purchase.getCustomer();
    customer.addOrder(order);

    //Save to database
    customerRepository.save(customer);

    return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() {
    //Generate UUID number  ( Universally Unique Identifier )
    return UUID.randomUUID().toString();
    }
}
