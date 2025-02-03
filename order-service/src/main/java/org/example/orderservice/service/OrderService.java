package org.example.orderservice.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.orderservice.dto.OrderDTO;
import org.example.orderservice.mapper.OrderMapper;
import org.example.orderservice.model.Order;
import org.example.orderservice.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final OrderProducer orderProducer;

    public OrderService(OrderRepository orderRepository, OrderMapper orderMapper, OrderProducer orderProducer) {
        this.orderRepository = orderRepository;
        this.orderMapper = orderMapper;
        this.orderProducer = orderProducer;
    }


    @Transactional
    public OrderDTO createOrder(OrderDTO orderDTO) {
        // Сохранение заказа в базе данных
        Order order = orderMapper.toEntity(orderDTO);
        Order savedOrder = orderRepository.save(order);

        return orderMapper.toDto(savedOrder);
    }

    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(orderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDTO updateOrder(Long orderId, OrderDTO updatedOrderDTO) {
        Order existingOrder = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));

        existingOrder.setCartId(Long.valueOf(updatedOrderDTO.getCartId()));
        existingOrder.setCustomerId(Long.valueOf(updatedOrderDTO.getCustomerId()));
        existingOrder.setTotalAmount(updatedOrderDTO.getTotalAmount());
        existingOrder.setStatus(updatedOrderDTO.getStatus());
        existingOrder.setCompletedAt(updatedOrderDTO.getCompletedAt());

        Order savedOrder = orderRepository.save(existingOrder);

        return orderMapper.toDto(savedOrder);
    }

    public OrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found with ID: " + orderId));
        return orderMapper.toDto(order);
    }

    @Transactional
    public void deleteOrder(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new IllegalArgumentException("Order not found with ID: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }
}

