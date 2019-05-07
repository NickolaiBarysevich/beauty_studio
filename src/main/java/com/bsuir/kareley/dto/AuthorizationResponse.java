package com.bsuir.kareley.dto;

import com.bsuir.kareley.entity.UserRole;

public class AuthorizationResponse {

    private String username;
    private String token;
    private UserRole userRole;


    public AuthorizationResponse(String username, String token, UserRole userRole) {
        this.username = username;
        this.token = token;
        this.userRole = userRole;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserRole getUserRole() {
        return userRole;
    }

    public void setUserRole(UserRole userRole) {
        this.userRole = userRole;
    }
}
