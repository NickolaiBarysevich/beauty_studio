package com.bsuir.kareley.validator;

public interface EntityValidator<E> {

    void validate(E entity);
}
