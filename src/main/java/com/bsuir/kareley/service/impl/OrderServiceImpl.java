package com.bsuir.kareley.service.impl;

import com.bsuir.kareley.dao.api.OrderDao;
import com.bsuir.kareley.dao.api.UserDao;
import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.Order;
import com.bsuir.kareley.entity.OrderStatus;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.service.api.CourseService;
import com.bsuir.kareley.service.api.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private OrderDao orderDao;
    private UserDao userDao;
    private CourseService courseService;

    @Autowired
    public OrderServiceImpl(OrderDao orderDao, UserDao userDao, CourseService courseService) {
        this.orderDao = orderDao;
        this.userDao = userDao;
        this.courseService = courseService;
    }

    @Override
    public void create(Order order) {
        courseService.findById(order.getCourse().getId());
        orderDao.create(order);
    }

    @Override
    public void update(Order order) {
        orderDao.update(order);
    }

    @Override
    public void delete(int id) {
        orderDao.delete(id);
    }

    @Override
    public Order findById(int id) {
        Order order = orderDao.findById(id).orElseThrow(() -> new ServiceException("order.not.found", HttpStatus.NOT_FOUND));
        assembleOrder(order);
        return order;
    }

    private void assembleOrder(Order order) {
        User user = userDao.findById(order.getCustomer().getId()).orElseThrow(() -> new ServiceException("user.not.found", HttpStatus.NOT_FOUND));
        Course course = courseService.findCourseById(order.getCourse().getId());
        order.setCustomer(user);
        order.setCourse(course);
    }

    @Override
    public List<Order> findAll() {
        List<Order> orders = orderDao.findAll();
        orders.forEach(this::assembleOrder);
        return orders;
    }

    @Override
    public List<Order> findOrdersForUser(int userId) {
        List<Order> ordersForUser = orderDao.findOrdersForUser(userId);
        ordersForUser.forEach(this::assembleOrder);
        return ordersForUser;
    }

    @Override
    @Transactional
    public Order approveOrder(int orderId, int courseId) {
        Order order = findById(orderId);
        order.setOrderStatus(OrderStatus.APPROVED);
        courseService.addParticipant(courseId, order.getCustomer().getId());
        update(order);
        return order;
    }

    @Override
    public Order cancelOrder(int orderId) {
        Order order = findById(orderId);
        order.setOrderStatus(OrderStatus.CANCELED);
        update(order);
        return order;
    }
}
