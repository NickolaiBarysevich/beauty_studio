package com.bsuir.kareley.service.api;

import com.bsuir.kareley.dto.CourseDto;
import com.bsuir.kareley.entity.Course;

import java.util.List;

public interface CourseService extends Service<CourseDto> {

    void addParticipant(int courseId, int userId);

    void removeParticipant(int courseId, int userId);

    List<CourseDto> findCoursesForUser(int userId);

    Course findCourseById(int id);
}
