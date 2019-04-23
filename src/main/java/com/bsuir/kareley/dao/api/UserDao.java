package com.bsuir.kareley.dao.api;

import com.bsuir.kareley.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserDao extends Dao<User>{

    List<User> findParticipantsByCourseId(int id);

    Optional<User> findByUserName(String username);
}
