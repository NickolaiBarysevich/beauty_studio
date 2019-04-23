package com.bsuir.kareley.validator;

import com.bsuir.kareley.dto.SignInForm;
import com.bsuir.kareley.exception.ServiceException;
import org.springframework.stereotype.Component;

import static com.bsuir.kareley.util.StringUtils.isBlank;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class SignInFormValidator implements EntityValidator<SignInForm> {

    @Override
    public void validate(SignInForm signInForm) {
        String username = signInForm.getUsername();
        if (isBlank(username) || username.length() < 3 || username.length() > 15)
            throw new ServiceException("username.invalid", BAD_REQUEST);
        if (isBlank(signInForm.getPassword()))
            throw new ServiceException("password.invalid", BAD_REQUEST);
    }
}
