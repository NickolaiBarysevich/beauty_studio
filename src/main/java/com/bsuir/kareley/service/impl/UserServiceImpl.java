package com.bsuir.kareley.service.impl;

import com.bsuir.kareley.dao.api.UserDao;
import com.bsuir.kareley.dto.SignUpForm;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.entity.UserRole;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.service.api.UserService;
import com.bsuir.kareley.util.PaginatedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public void create(User user) {
        try {
            userDao.create(user);
        } catch (Exception e) {
            throw new ServiceException(defineDuplicate(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    private String defineDuplicate(String exceptionMessage) {
        if (exceptionMessage.contains("phone_number_UNIQUE"))
            return "phoneNumber.duplicate";
        if (exceptionMessage.contains("username_UNIQUE"))
            return "username.duplicate";
        if (exceptionMessage.contains("email_UNIQUE"))
            return "email.duplicate";
        throw new RuntimeException(exceptionMessage);
    }

    @Override
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    public void delete(int id) {
        userDao.delete(id);
    }

    @Override
    public User findById(int id) {
        return userDao.findById(id).orElseThrow(() -> new ServiceException("user.not.found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userDao.findByUserName(username);
    }

    @Override
    public void createFromForm(SignUpForm signUpForm) {
        create(mapToUser(signUpForm));
    }

    private User mapToUser(SignUpForm signUpForm) {
        return new User(signUpForm.getUsername(), signUpForm.getPassword(), signUpForm.getFirstName(),
                signUpForm.getLastName(), signUpForm.getEmail(), signUpForm.getPhoneNumber(), UserRole.USER);
    }


}
