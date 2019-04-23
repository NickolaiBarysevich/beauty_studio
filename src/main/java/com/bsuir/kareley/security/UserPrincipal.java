package com.bsuir.kareley.security;

import com.bsuir.kareley.entity.UserRole;

public class UserPrincipal {

    private int id;
    private String username;
    private UserRole userRole;

    public UserPrincipal(int id, String username, UserRole userRole) {
        this.id = id;
        this.username = username;
        this.userRole = userRole;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public UserRole getUserRole() {
        return userRole;
    }
}
