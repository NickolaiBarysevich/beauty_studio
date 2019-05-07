package com.bsuir.kareley.dao.api;

import com.bsuir.kareley.entity.Course;

import java.util.List;

public interface CourseDao extends Dao<Course> {

    void addParticipant(int courseId, int userId);

    void removeParticipant(int courseId, int userId);

    List<Course> findCoursesForUser(int userId);

}
