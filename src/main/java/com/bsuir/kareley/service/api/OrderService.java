package com.bsuir.kareley.service.api;

import com.bsuir.kareley.entity.Order;

import java.util.List;

public interface OrderService extends Service<Order> {

    List<Order> findOrdersForUser(int userId);

    Order updateStatus(int orderId, String orderStatus);
}
