package com.bsuir.kareley.dao.impl;

import com.bsuir.kareley.dao.api.UserDao;
import com.bsuir.kareley.dao.mapper.EntityMapper;
import com.bsuir.kareley.dao.query.Query;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.entity.UserRole;
import com.bsuir.kareley.util.PaginatedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserDaoImpl extends AbstractDao<User> implements UserDao {

    private static final String CREATE_QUERY = "INSERT INTO user (username, password, first_name, last_name, email," +
            " phone_number, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE user SET username = ?, password = ?, first_name = ?," +
            " last_name = ?, email = ?, phone_number = ?, role = ? WHERE id = ?";
    private static final String FIND_PARTICIPANTS_QUERY =
            "SELECT * FROM user" +
                    " JOIN course_user AS cu ON user.id = cu.user_id" +
                    " WHERE cu.course_id = ?";
    private static final String FIND_BY_USERNAME_QUERY = "SELECT * FROM user WHERE username = ?";

    @Autowired
    public UserDaoImpl(DataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected Query getCreateQuery(User user) {
        List<Object> parameters = extractUser(user);
        return new Query(CREATE_QUERY, parameters.toArray());
    }

    private List<Object> extractUser(User user) {
        List<Object> values = new ArrayList<>();
        values.add(user.getUsername());
        values.add(user.getPassword());
        values.add(user.getFirstName());
        values.add(user.getLastName());
        values.add(user.getEmail());
        values.add(user.getPhoneNumber());
        values.add(user.getRole().name());
        return values;
    }

    @Override
    protected Query getUpdateQuery(User user) {
        List<Object> parameters = extractUser(user);
        parameters.add(user.getId());
        return new Query(UPDATE_QUERY, parameters.toArray());
    }

    @Override
    protected String getTableName() {
        return "user";
    }

    @Override
    protected EntityMapper<User> getMapper() {
        return rs -> {
            int id = rs.getInt("id");
            String username = rs.getString("username");
            String password = rs.getString("password");
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String email = rs.getString("email");
            String phoneNumber = rs.getString("phone_number");
            UserRole role = UserRole.valueOf(rs.getString("role"));
            return new User(id, username, password, firstName, lastName, email, phoneNumber, role);
        };
    }

    @Override
    public List<User> findParticipantsByCourseId(int id) {
        return executeQuery(FIND_PARTICIPANTS_QUERY, id);
    }

    @Override
    public Optional<User> findByUserName(String username) {
        return executeForSingleResult(FIND_BY_USERNAME_QUERY, username);
    }

    @Override
    public PaginatedQuery<User> findAllWithLimit(int limit, int offset) {
        List<User> users = executeLimitOffsetQuery(limit, offset);
        int totalRows = countRows();
        return new PaginatedQuery<>(users, totalRows);
    }
}
