package com.bsuir.kareley.controller;

import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.Order;
import com.bsuir.kareley.entity.OrderStatus;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.entity.UserRole;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.security.AuthorizationProvider;
import com.bsuir.kareley.security.UserPrincipal;
import com.bsuir.kareley.service.api.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping(value = "/api/orders",
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class OrderController {

    private OrderService orderService;
    private AuthorizationProvider authProvider;

    @Autowired
    public OrderController(OrderService orderService, AuthorizationProvider authProvider) {
        this.orderService = orderService;
        this.authProvider = authProvider;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getALLOrders(@RequestHeader(value = "Authorization", required = false) String authToken) {
        authProvider.validateUser(authToken, UserRole.ADMIN, UserRole.TEACHER);
        return ResponseEntity.ok(orderService.findAll());
    }

    @GetMapping(params = "mine")
    public ResponseEntity<List<Order>> getOrders(@RequestHeader(value = "Authorization", required = false) String authToken) {
        UserPrincipal userPrincipal = authProvider.validateUser(authToken, UserRole.TEACHER, UserRole.USER, UserRole.ADMIN);
        return ResponseEntity.ok(orderService.findOrdersForUser(userPrincipal.getId()));
    }

    @PostMapping
    public ResponseEntity<Order> makeOrder(@RequestHeader(value = "Authorization", required = false) String authToken,
                                           @RequestParam int courseId) {
        UserPrincipal userPrincipal = authProvider.validateUser(authToken, UserRole.USER);
        Order order = new Order(LocalDateTime.now(), new User(userPrincipal.getId()), new Course(courseId), OrderStatus.PROCESSING);
        orderService.create(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.findById(order.getId()));
    }

    @PutMapping(value = "/{id}", params = "approve")
    private ResponseEntity<Order> approveOrder(@RequestHeader(value = "Authorization", required = false) String authToken,
                                               @PathVariable int id,
                                               @RequestParam int courseId) {
        authProvider.validateUser(authToken, UserRole.ADMIN);
        return ResponseEntity.ok(orderService.approveOrder(id, courseId));
    }

    @PutMapping(value = "/{id}", params = "cancel")
    private ResponseEntity<Order> cancelOrder(@RequestHeader(value = "Authorization", required = false) String authToken,
                                               @PathVariable int id) {
        authProvider.validateUser(authToken, UserRole.ADMIN);
        return ResponseEntity.ok(orderService.cancelOrder(id));
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Order> deleteOrder(@RequestHeader(value = "Authorization", required = false) String authToken,
                                              @PathVariable int id) {
        authProvider.validateUser(authToken, UserRole.USER);
        orderService.delete(id);
        return ResponseEntity.ok().build();
    }
}
