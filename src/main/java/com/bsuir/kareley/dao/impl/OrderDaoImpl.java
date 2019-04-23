package com.bsuir.kareley.dao.impl;

import com.bsuir.kareley.dao.api.OrderDao;
import com.bsuir.kareley.dao.mapper.EntityMapper;
import com.bsuir.kareley.dao.query.Query;
import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.Order;
import com.bsuir.kareley.entity.OrderStatus;
import com.bsuir.kareley.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class OrderDaoImpl extends AbstractDao<Order> implements OrderDao {

    private static final String CREATE_QUERY = "INSERT INTO course_order (order_time, user_id, course_id, order_status) VALUES (?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE course_order SET order_status = ? WHERE id = ?";
    private static final String FIND_ORDERS_FOR_USER_QUERY = "SELECT * FROM course_order WHERE user_id = ?";

    @Override
    protected Query getCreateQuery(Order order) {
        return new Query(CREATE_QUERY,
                order.getOrderTime(), order.getCustomer().getId(), order.getCourse().getId(), order.getOrderStatus());
    }

    @Autowired
    public OrderDaoImpl(DataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected Query getUpdateQuery(Order order) {
        return new Query(UPDATE_QUERY, order.getOrderStatus(), order.getId());
    }

    @Override
    public void delete(int id) {
        throw new UnsupportedOperationException("Order cannot be deleted");
    }

    @Override
    protected String getTableName() {
        return "course_order";
    }

    @Override
    protected EntityMapper<Order> getMapper() {
        return rs -> {
            var id = rs.getInt("id");
            var orderTime = rs.getTimestamp("order_time").toLocalDateTime();
            var customer = new User(rs.getInt("user_id"));
            var course = new Course(rs.getInt("course_id"));
            var orderStatus = OrderStatus.valueOf(rs.getString("order_status"));
            return new Order(id, orderTime, customer, course, orderStatus);
        };
    }

    @Override
    public List<Order> findOrdersForUser(int userId) {
        return executeQuery(FIND_ORDERS_FOR_USER_QUERY, userId);
    }
}
