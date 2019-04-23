package com.bsuir.kareley.exception.handler;

import com.bsuir.kareley.dto.ErrorResponse;
import com.bsuir.kareley.exception.ServiceException;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Locale;

@ControllerAdvice
public class ServiceExceptionHandler extends ResponseEntityExceptionHandler {

    private MessageSource messageSource;

    public ServiceExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<ErrorResponse> handleException(ServiceException e, Locale locale) {
        HttpStatus errorStatus = e.getHttpStatus();
        String message = messageSource.getMessage(e.getMessage(), e.getArguments(), locale);
        return ResponseEntity.status(errorStatus).body(new ErrorResponse(errorStatus.value(), message));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception e, HttpStatus httpStatus, Locale locale) {
        String message = e.getMessage();
        return ResponseEntity.status(httpStatus).body(new ErrorResponse(httpStatus.value(), message));
    }
}
