package org.example.orderservice.dto;

import lombok.Data;
import org.example.orderservice.model.OrderStatus;

import java.time.LocalDateTime;

public class OrderDTO {

    private Long id;


    private String customerId;
    private String cartId;

    private double totalAmount;

    private OrderStatus status;

    private LocalDateTime completedAt;

    public OrderDTO(Long id, String customerId, String cartId, double totalAmount, OrderStatus status, LocalDateTime completedAt) {
        this.id = id;
        this.customerId = customerId;
        this.cartId = cartId;
        this.totalAmount = totalAmount;
        this.status = status;
        this.completedAt = completedAt;
    }

    public OrderDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCartId() {
        return cartId;
    }

    public void setCartId(String cartId) {
        this.cartId = cartId;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
