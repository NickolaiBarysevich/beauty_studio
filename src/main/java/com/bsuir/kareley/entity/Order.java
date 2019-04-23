package com.bsuir.kareley.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.Objects;

public class Order implements Identifiable {

    private int id;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd hh:mm:ss")
    private LocalDateTime orderTime;
    private User customer;
    private Course course;
    private OrderStatus orderStatus;

    public Order(int id, LocalDateTime orderTime, User customer, Course course, OrderStatus orderStatus) {
        this.id = id;
        this.orderTime = orderTime;
        this.customer = customer;
        this.course = course;
        this.orderStatus = orderStatus;
    }

    public Order(LocalDateTime orderTime, User customer, Course course, OrderStatus orderStatus) {
        this.orderTime = orderTime;
        this.customer = customer;
        this.course = course;
        this.orderStatus = orderStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDateTime getOrderTime() {
        return orderTime;
    }

    public void setOrderTime(LocalDateTime orderTime) {
        this.orderTime = orderTime;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return id == order.id &&
                Objects.equals(orderTime, order.orderTime) &&
                Objects.equals(customer, order.customer) &&
                Objects.equals(course, order.course) &&
                Objects.equals(orderStatus, order.orderStatus);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderTime, customer, course, orderStatus);
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", orderTime=" + orderTime +
                ", customer=" + customer +
                ", course=" + course +
                ", orderStatus=" + orderStatus +
                '}';
    }
}
