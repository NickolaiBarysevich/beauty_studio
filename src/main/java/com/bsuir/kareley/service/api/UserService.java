package com.bsuir.kareley.service.api;

import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.dto.SignUpForm;
import com.bsuir.kareley.util.PaginatedQuery;

import java.util.Map;
import java.util.Optional;

public interface UserService extends Service<User> {

    Optional<User> findByUsername(String username);

    void createFromForm(SignUpForm signUpForm);

    PaginatedQuery<User> findAllWithLimit(Map<String, String> parameters);
}
