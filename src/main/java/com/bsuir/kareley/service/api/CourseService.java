package com.bsuir.kareley.service.api;

import com.bsuir.kareley.entity.Course;
import java.util.List;

public interface CourseService extends Service<Course> {

    void addParticipant(int courseId, int userId);

    void removeParticipant(int courseId, int userId);

    List<Course> findCoursesForUser(int userId);
}
