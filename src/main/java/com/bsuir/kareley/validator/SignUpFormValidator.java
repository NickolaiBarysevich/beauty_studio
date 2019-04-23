package com.bsuir.kareley.validator;

import com.bsuir.kareley.dto.SignUpForm;
import com.bsuir.kareley.exception.ServiceException;
import org.springframework.stereotype.Component;

import static com.bsuir.kareley.util.StringUtils.isBlank;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class SignUpFormValidator implements EntityValidator<SignUpForm> {

    private static final String USERNAME_PATTERN = "^[a-z0-9_-]{3,15}$";
    private static final String PASSWORD_PATTERN = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$";
    private static final String EMAIL_PATTERN = "^([0-9]{9})|([A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3})$";

    @Override
    public void validate(SignUpForm signUpForm) {
        String username = signUpForm.getUsername();
        if (isBlank(username) || !username.matches(USERNAME_PATTERN))
            throw new ServiceException("username.invalid", BAD_REQUEST);
        String password = signUpForm.getPassword();
        if (isBlank(password)|| !password.matches(PASSWORD_PATTERN))
            throw new ServiceException("password.invalid", BAD_REQUEST);
        String email = signUpForm.getEmail();
        if (isBlank(email) || !email.matches(EMAIL_PATTERN))
            throw new ServiceException("email.invalid", BAD_REQUEST);
        if (isBlank(signUpForm.getFirstName()))
            throw new ServiceException("first.name.invalid", BAD_REQUEST);
        if (isBlank(signUpForm.getLastName()))
            throw new ServiceException("last.name.invalid", BAD_REQUEST);
        String phoneNumber = signUpForm.getPhoneNumber();
        if (isBlank(phoneNumber))
            throw new ServiceException("phone.number.invalid", BAD_REQUEST);
    }
}
