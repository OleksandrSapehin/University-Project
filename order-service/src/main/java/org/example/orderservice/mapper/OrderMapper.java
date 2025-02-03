package org.example.orderservice.mapper;

import org.example.orderservice.dto.OrderDTO;
import org.example.orderservice.model.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    public OrderDTO toDto(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setCustomerId(order.getCustomerId().toString());
        orderDTO.setCartId(order.getCartId().toString());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setCompletedAt(order.getCompletedAt());
        return orderDTO;
    }

    public Order toEntity(OrderDTO orderDTO) {
        Order order = new Order();
        order.setId(orderDTO.getId());
        order.setCustomerId(Long.parseLong(orderDTO.getCustomerId()));
        order.setCartId(Long.parseLong(orderDTO.getCartId()));
        order.setTotalAmount(orderDTO.getTotalAmount());
        order.setStatus(orderDTO.getStatus());
        order.setCompletedAt(orderDTO.getCompletedAt());
        return order;
    }

}
