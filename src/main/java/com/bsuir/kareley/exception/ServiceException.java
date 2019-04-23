package com.bsuir.kareley.exception;

import org.springframework.http.HttpStatus;

public class ServiceException extends RuntimeException{

    private HttpStatus httpStatus;
    private Object[] arguments;

    public ServiceException(String message) {
        super(message);
    }

    public ServiceException(String message, HttpStatus httpStatus, Object... arguments) {
        super(message);
        this.httpStatus = httpStatus;
        this.arguments = arguments;
    }

    public ServiceException(HttpStatus httpStatus) {
        this.httpStatus = httpStatus;
    }

    public ServiceException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public ServiceException(String message, Throwable cause, HttpStatus httpStatus) {
        super(message, cause);
        this.httpStatus = httpStatus;
    }

    public Object[] getArguments() {
        return arguments;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
