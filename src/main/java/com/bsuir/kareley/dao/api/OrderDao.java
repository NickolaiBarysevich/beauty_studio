package com.bsuir.kareley.dao.api;

import com.bsuir.kareley.entity.Order;

import java.util.List;

public interface OrderDao extends Dao<Order> {

    List<Order> findOrdersForUser(int userId);
}
