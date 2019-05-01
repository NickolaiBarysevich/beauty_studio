package com.bsuir.kareley.dao.impl;

import com.bsuir.kareley.dao.api.Dao;
import com.bsuir.kareley.dao.mapper.EntityMapper;
import com.bsuir.kareley.dao.query.Query;
import com.bsuir.kareley.entity.Identifiable;
import com.bsuir.kareley.exception.ServiceException;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public abstract class AbstractDao<E extends Identifiable> implements Dao<E> {

    private static final String DELETE_QUERY = "DELETE FROM $tableName WHERE id = ?";
    private static final String FIND_BY_ID_QUERY = "SELECT * FROM $tableName WHERE id = ?";
    private static final String FIND_ALL_QUERY = "SELECT * FROM $tableName ";

    private DataSource dataSource;

    public AbstractDao(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Override
    public void create(E entity) {
        Query createQuery = getCreateQuery(entity);
        entity.setId(executeUpdate(createQuery.getQuery(), createQuery.getParameters()));
    }

    @Override
    public void update(E entity) {
        Query updateQuery = getUpdateQuery(entity);
        executeUpdate(updateQuery.getQuery(), updateQuery.getParameters());
    }

    @Override
    public void delete(int id) {
        String deleteQuery = DELETE_QUERY.replace("$tableName", getTableName());
        executeUpdate(deleteQuery, id);
    }

    @Override
    public Optional<E> findById(int id) {
        String findByIdQuery = FIND_BY_ID_QUERY.replace("$tableName", getTableName());
        return executeForSingleResult(findByIdQuery, id);
    }

    protected int executeUpdate(String updateQuery, Object... parameters) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(updateQuery, Statement.RETURN_GENERATED_KEYS)) {
            prepareStatement(statement, parameters);
            int affectedRows = statement.executeUpdate();
            if (affectedRows == 0)
                throw new ServiceException("No rows affected, entity may not exists");
            ResultSet generatedKeys = statement.getGeneratedKeys();
            if (generatedKeys.next())
                return generatedKeys.getInt(1);
            else
                return 0;
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private void prepareStatement(PreparedStatement statement, Object... parameters) throws SQLException {
        for (int i = 0; i < parameters.length; i++) {
            Object parameter = parameters[i];
            if (parameter != null)
                statement.setString(i + 1, parameter.toString());
            else
                statement.setString(i + 1, null);
        }
    }

    protected List<E> executeQuery(String query, Object... parameters) {
        try (Connection connection = dataSource.getConnection();
             PreparedStatement statement = connection.prepareStatement(query)) {
            prepareStatement(statement, parameters);
            ResultSet resultSet = statement.executeQuery();
            List<E> resultList = new ArrayList<>();
            EntityMapper<E> mapper = getMapper();
            while (resultSet.next())
                resultList.add(mapper.map(resultSet));
            return resultList;
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    protected Optional<E> executeForSingleResult(String query, Object... parameters) {
        List<E> result = executeQuery(query, parameters);
        if (result.size() > 1) {
            throw new RuntimeException(String.format("Expected 1, got : %d", result.size()));
        }
        return result.size() != 0
                ? Optional.of(result.get(0))
                : Optional.empty();
    }

    protected List<E> executeLimitOffsetQuery(int limit, int offset) {
        return executeQuery(String.format("SELECT * FROM %s LIMIT %d OFFSET %d", getTableName(), limit, offset));
    }

    protected int countRows() {
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement()) {
            ResultSet resultSet = statement.executeQuery(String.format("SELECT COUNT(*) FROM %s", getTableName()));
            resultSet.next();
            return resultSet.getInt(1);
        } catch (SQLException e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    @Override
    public List<E> findAll() {
        return executeQuery(FIND_ALL_QUERY.replace("$tableName", getTableName()));
    }

    protected abstract Query getCreateQuery(E entity);

    protected abstract Query getUpdateQuery(E entity);

    protected abstract String getTableName();

    protected abstract EntityMapper<E> getMapper();
}
