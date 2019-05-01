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
            throw new ServiceException("username.duplicate", HttpStatus.BAD_REQUEST);
        }
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

    @Override
    public PaginatedQuery<User> findAllWithLimit(Map<String, String> parameters) {
        String limitValue = parameters.get("limit");
        String offsetValue = parameters.get("offset");
        if (limitValue == null || offsetValue == null)
            throw new ServiceException("limit.offset.invalid", HttpStatus.BAD_REQUEST);
        int limit;
        int offset;
        try {
            limit = Integer.parseInt(limitValue);
            offset = Integer.parseInt(offsetValue);
        } catch (NumberFormatException e) {
            throw new ServiceException("limit.offset.invalid", HttpStatus.BAD_REQUEST);
        }
        if (limit < 0 || offset < 0)
            throw new ServiceException("limit.offset.invalid", HttpStatus.BAD_REQUEST);
        return userDao.findAllWithLimit(limit, offset);
    }
}
