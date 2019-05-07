package com.bsuir.kareley.controller;

import com.bsuir.kareley.dto.CourseDto;
import com.bsuir.kareley.dto.ParticipantCourseForm;
import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.UserRole;
import com.bsuir.kareley.exception.ServiceException;
import com.bsuir.kareley.security.AuthorizationProvider;
import com.bsuir.kareley.security.UserPrincipal;
import com.bsuir.kareley.service.api.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/courses",
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE,
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
public class CourseController {

    private CourseService courseService;
    private AuthorizationProvider authProvider;

    @Autowired
    public CourseController(CourseService courseService, AuthorizationProvider authProvider) {
        this.courseService = courseService;
        this.authProvider = authProvider;
    }

    @GetMapping
    public ResponseEntity<List<CourseDto>> getCourses()
    {
        return ResponseEntity.ok(courseService.findAll());
    }

    @GetMapping(params = "mine")
    public ResponseEntity<List<CourseDto>> getCourses(@RequestHeader(value = "Authorization", required = false) String authToken) {
        UserPrincipal userPrincipal = authProvider.validateUser(authToken, UserRole.USER, UserRole.TEACHER);
        return ResponseEntity.ok(courseService.findCoursesForUser(userPrincipal.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable int id) {
        return ResponseEntity.ok(courseService.findById(id));
    }

    @PostMapping
    public ResponseEntity<CourseDto> createCourse(@RequestBody CourseDto course,
                                               @RequestHeader(value = "Authorization", required = false) String authToken) {
        authProvider.validateUser(authToken, UserRole.ADMIN);
        courseService.create(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(courseService.findById(course.getId()));
    }

    @PutMapping
    public ResponseEntity<CourseDto> processUserActions(@RequestBody ParticipantCourseForm form,
                                                     @RequestParam String userAction,
                                                     @RequestHeader(value = "Authorization", required = false) String authToken) {
        authProvider.validateUser(authToken, UserRole.ADMIN, UserRole.TEACHER);
        if ("addParticipant".equals(userAction))
            courseService.addParticipant(form.getCourseId(), form.getUserId());
        else if ("removeParticipant".equals(userAction))
            courseService.removeParticipant(form.getCourseId(), form.getUserId());
        else
            throw new ServiceException("action.unknown", HttpStatus.BAD_REQUEST);
        return ResponseEntity.ok(courseService.findById(form.getCourseId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseDto> editCourse(@RequestBody CourseDto course, @PathVariable int id,
                                             @RequestHeader(value = "Authorization", required = false) String authToken) {
        authProvider.validateUser(authToken, UserRole.ADMIN, UserRole.TEACHER);
        course.setId(id);
        courseService.update(course);
        return ResponseEntity.ok(courseService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CourseDto> deleteCourse(@PathVariable int id,
                                               @RequestHeader(value = "Authorization", required = false) String authToken) {
        authProvider.validateUser(authToken, UserRole.ADMIN);
        courseService.delete(id);
        return ResponseEntity.ok().build();
    }
}
