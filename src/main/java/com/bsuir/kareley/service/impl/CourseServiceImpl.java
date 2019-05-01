package com.bsuir.kareley.service.impl;

import com.bsuir.kareley.dao.api.CourseDao;
import com.bsuir.kareley.dao.api.UserDao;
import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.service.api.CourseService;
import com.bsuir.kareley.validator.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseServiceImpl implements CourseService {

    private CourseDao courseDao;
    private UserDao userDao;
    private EntityValidator<Course> courseValidator;

    @Autowired
    public CourseServiceImpl(CourseDao courseDao, UserDao userDao, EntityValidator<Course> courseValidator) {
        this.courseDao = courseDao;
        this.userDao = userDao;
        this.courseValidator = courseValidator;
    }

    @Override
    public void create(Course course) {
        courseValidator.validate(course);
        try {
            courseDao.create(course);
        } catch (Exception e) {
            throw new ServiceException("title.duplicate", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void update(Course course) {
        courseValidator.validate(course);
        try {
            courseDao.update(course);
        } catch (ServiceException e) {
            throw new ServiceException("course.not.found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ServiceException("title.duplicate", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void delete(int id) {
        try {
            courseDao.delete(id);
        } catch (ServiceException e) {
            throw new ServiceException("course.not.found", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ServiceException("unknown.error", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public Course findById(int id) {
        Optional<Course> optionalCourse = courseDao.findById(id);
        Course course = optionalCourse.orElseThrow(() -> new ServiceException("course.not.found", HttpStatus.NOT_FOUND));
        assembleCourse(course);
        return course;
    }

    private void assembleCourse(Course course) {
        User teacher = userDao.findById(course.getTeacher().getId()).orElseThrow(() -> new ServiceException("user.not.found", HttpStatus.NOT_FOUND));
        List<User> participants = userDao.findParticipantsByCourseId(course.getId());
        course.setTeacher(teacher);
        course.setParticipants(participants);
    }

    @Override
    public List<Course> findAll() {
        List<Course> courses = courseDao.findAll();
        courses.forEach(this::assembleCourse);
        return courses;
    }

    @Override
    public void addParticipant(int courseId, int userId) {
        try {
            courseDao.addParticipant(courseId, userId);
        } catch (Exception e) {
            throw new ServiceException("user.added.error", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void removeParticipant(int courseId, int userId) {
        try {
            courseDao.removeParticipant(courseId, userId);
        } catch (ServiceException e) {
            throw new ServiceException("user.removed.error", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public List<Course> findCoursesForUser(int userId) {
        List<Course> coursesForUser = courseDao.findCoursesForUser(userId);
        coursesForUser.forEach(this::assembleCourse);
        return coursesForUser;
    }


}
