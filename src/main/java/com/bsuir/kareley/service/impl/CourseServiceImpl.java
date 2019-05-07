package com.bsuir.kareley.service.impl;

import com.bsuir.kareley.dao.api.CourseDao;
import com.bsuir.kareley.dao.api.UserDao;
import com.bsuir.kareley.dto.CourseDto;
import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.User;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.service.api.CourseService;
import com.bsuir.kareley.validator.EntityValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    private Course mapCourseFromDto(CourseDto courseDto) {
        User teacher = userDao.findByUserName(courseDto.getTeacher()).orElseThrow(() -> new ServiceException("user.not.found", HttpStatus.NOT_FOUND));
        return new Course(
                courseDto.getId(),
                courseDto.getTitle(),
                courseDto.getDescription(),
                courseDto.getParticipantsNumber(),
                courseDto.getStartDate(),
                courseDto.getEndDate(),
                courseDto.getLessonsAmount(),
                courseDto.getPrice(),
                teacher,
                courseDto.getImageUrl(),
                courseDto.getParticipants()
        );
    }

    @Override
    public void create(CourseDto courseDto) {
        Course course = mapCourseFromDto(courseDto);
        courseValidator.validate(course);
        try {
            courseDao.create(course);
        } catch (Exception e) {
            throw new ServiceException("title.duplicate", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public void update(CourseDto courseDto) {
        Course course = mapCourseFromDto(courseDto);
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
    public CourseDto findById(int id) {
        Optional<Course> optionalCourse = courseDao.findById(id);
        Course course = optionalCourse.orElseThrow(() -> new ServiceException("course.not.found", HttpStatus.NOT_FOUND));
        assembleCourse(course);
        return CourseDto.buildFromCourse(course);
    }

    @Override
    public Course findCourseById(int id) {
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
    public List<CourseDto> findAll() {
        List<Course> courses = courseDao.findAll();
        return mapDtosFromCourses(courses);
    }

    private List<CourseDto> mapDtosFromCourses(List<Course> coursesForUser) {
        coursesForUser.forEach(this::assembleCourse);
        List<CourseDto> dtos = new ArrayList<>();
        coursesForUser.forEach(course -> dtos.add(CourseDto.buildFromCourse(course)));
        return dtos;
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
    public List<CourseDto> findCoursesForUser(int userId) {
        List<Course> coursesForUser = courseDao.findCoursesForUser(userId);
        return mapDtosFromCourses(coursesForUser);
    }

}
