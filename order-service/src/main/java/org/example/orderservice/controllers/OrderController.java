package org.example.orderservice.controllers;

import lombok.RequiredArgsConstructor;
import org.example.orderservice.service.OrderConsumer;
import org.example.orderservice.service.OrderProducer;
import org.example.orderservice.dto.OrderDTO;
import org.example.orderservice.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;
    private final OrderProducer orderProducer;
    private final OrderConsumer orderConsumer;

    public OrderController(OrderService orderService, OrderProducer orderProducer, OrderConsumer orderConsumer) {
        this.orderService = orderService;
        this.orderProducer = orderProducer;
        this.orderConsumer = orderConsumer;
    }


    @PostMapping("/create")
    public ResponseEntity<OrderDTO> createOrder(@RequestHeader("Authorization") String authorizationHeader,
                                                @RequestBody OrderDTO orderDTO) {
        String token = authorizationHeader.replace("Bearer ", "");
        orderProducer.sendAuthRequest(token);
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        String customerId = orderConsumer.getValidatedCustomerId();

        if (customerId == null || customerId.equals("Invalid Token")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        orderDTO.setCustomerId(customerId);
        OrderDTO createdOrder = orderService.createOrder(orderDTO);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/all")
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> allOrders = orderService.getAllOrders();
        return ResponseEntity.ok(allOrders);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<OrderDTO> updateOrder(
            @PathVariable Long orderId,
            @RequestBody OrderDTO orderDTO) {
        OrderDTO updatedOrder = orderService.updateOrder(orderId, orderDTO);
        return ResponseEntity.ok(updatedOrder);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long orderId) {
        OrderDTO orderDTO = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderDTO);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return ResponseEntity.noContent().build();
    }
}
