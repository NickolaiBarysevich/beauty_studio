package com.bsuir.kareley.dao.api;

import java.util.List;
import java.util.Optional;

public interface Dao<E> {

    void create(E entity);

    void update(E entity);

    void delete(int id);

    Optional<E> findById(int id);

    List<E> findAll();
}
