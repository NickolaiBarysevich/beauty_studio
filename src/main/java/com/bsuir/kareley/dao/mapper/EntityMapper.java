package com.bsuir.kareley.dao.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

@FunctionalInterface
public interface EntityMapper<E> {

    E map(ResultSet resultSet) throws SQLException;
}
