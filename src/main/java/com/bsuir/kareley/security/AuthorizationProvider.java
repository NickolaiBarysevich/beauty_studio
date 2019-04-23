package com.bsuir.kareley.security;

import com.bsuir.kareley.dto.AuthorizationResponse;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.entity.UserRole;
import com.bsuir.kareley.exception.ServiceException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.stream.Stream;

@Component
public class AuthorizationProvider {

    private static final String TOKEN_TYPE = "Bearer ";
    private static final String SECRET = "Kareley";
    private static final String ROLE_CLAIM = "role";
    private static final String USER_ID_CLAIM = "userId";
    private static final long TOKEN_LIFE_TIME = 3600000;

    public UserPrincipal validateUser(String authToken, UserRole... grantedRoles) {
        String token;
        if (authToken == null)
            throw new ServiceException("forbidden", HttpStatus.FORBIDDEN);
        else if (!authToken.startsWith(TOKEN_TYPE))
            throw new ServiceException("invalid.token", HttpStatus.FORBIDDEN);
        else
            token = authToken.replace(TOKEN_TYPE, "");
        validateToken(token);
        UserPrincipal userPrincipal = buildUserPrincipal(token);
        if (grantedRoles.length == 0) {
            return userPrincipal;
        }
        if (Stream.of(grantedRoles).noneMatch(userRole -> userRole == userPrincipal.getUserRole())) {
            throw new ServiceException("forbidden", HttpStatus.FORBIDDEN);
        }
        return userPrincipal;
    }

    private void validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            throw new ServiceException("token.expired", HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            throw new ServiceException("token.invalid", HttpStatus.FORBIDDEN);
        }
    }

    private UserPrincipal buildUserPrincipal(String authToken) {
        var id = parseId(authToken);
        var username = parseUsername(authToken);
        var role = parseRole(authToken);
        return new UserPrincipal(id, username, role);
    }

    private int parseId(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().get(USER_ID_CLAIM, Integer.class);
    }

    private String parseUsername(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    private UserRole parseRole(String token) {
        String role = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().get(ROLE_CLAIM, String.class);
        return UserRole.valueOf(role);
    }

    public AuthorizationResponse generateJwtToken(User user) {

        Date expirationDate = new Date((new Date()).getTime() + TOKEN_LIFE_TIME);
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .claim(ROLE_CLAIM, user.getRole())
                .claim(USER_ID_CLAIM, user.getId())
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        return new AuthorizationResponse(user.getUsername(), token, LocalDateTime.ofInstant(expirationDate.toInstant(), ZoneId.systemDefault()));
    }

}
