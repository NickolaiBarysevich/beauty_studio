package com.bsuir.kareley.service.api;

import java.util.List;

public interface Service<E> {

    void create(E entity);

    void update(E entity);

    void delete(int id);

    E findById(int id);

    List<E> findAll();
}
