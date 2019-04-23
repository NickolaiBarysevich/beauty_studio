package com.bsuir.kareley.controller;

import com.bsuir.kareley.dto.SignInForm;
import com.bsuir.kareley.dto.SignUpForm;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.entity.UserRole;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.security.AuthorizationProvider;
import com.bsuir.kareley.service.api.Service;
import com.bsuir.kareley.service.api.UserService;
import com.bsuir.kareley.validator.EntityValidator;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Stream;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserService userService;
    private AuthorizationProvider authProvider;
    private EntityValidator<SignInForm> signInFormValidator;
    private EntityValidator<SignUpForm> signUpFormValidator;

    @Autowired
    public UserController(UserService userService, AuthorizationProvider authProvider,
                          EntityValidator<SignInForm> signInFormValidator,
                          EntityValidator<SignUpForm> signUpFormValidator) {
        this.userService = userService;
        this.authProvider = authProvider;
        this.signInFormValidator = signInFormValidator;
        this.signUpFormValidator = signUpFormValidator;
    }

    @PostMapping("/signIn")
    public ResponseEntity<Object> signIn(@RequestBody SignInForm signInForm) {
        signInFormValidator.validate(signInForm);
        User user = userService.findByUsername(signInForm.getUsername())
                .orElseThrow(() -> new ServiceException("credentials.incorrect", HttpStatus.UNAUTHORIZED));
        String encodedPassword = DigestUtils.sha256Hex(signInForm.getPassword());
        if (user.getPassword().equals(encodedPassword))
            return ResponseEntity.ok(authProvider.generateJwtToken(user));
        else
            throw new ServiceException("credentials.incorrect", HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/signUp")
    public ResponseEntity<Object> signUp(@RequestBody SignUpForm form) {
        signUpFormValidator.validate(form);
        String encodedPassword = DigestUtils.sha256Hex(form.getPassword());
        form.setPassword(encodedPassword);
        userService.createFromForm(form);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> setRole(@PathVariable int id,
                                        @RequestParam String role,
                                        @RequestHeader(value = "Authorization", required = false) String authToken) {
        authProvider.validateUser(authToken, UserRole.ADMIN);
        if (Stream.of(UserRole.values()).noneMatch(userRole -> userRole.name().equalsIgnoreCase(role))) {
            throw new ServiceException("role.unknown", HttpStatus.BAD_REQUEST);
        }
        UserRole userRole = UserRole.valueOf(role.toUpperCase());
        if (userRole == UserRole.ADMIN)
            throw new ServiceException("operation.unavailable", HttpStatus.FORBIDDEN);
        User user = userService.findById(id);
        user.setRole(userRole);
        userService.update(user);
        return ResponseEntity.ok(user);
    }
}
