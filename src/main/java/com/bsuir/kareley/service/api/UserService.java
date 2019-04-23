package com.bsuir.kareley.service.api;

import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.dto.SignUpForm;

import java.util.Optional;

public interface UserService extends Service<User> {

    Optional<User> findByUsername(String username);

    void createFromForm(SignUpForm signUpForm);
}
