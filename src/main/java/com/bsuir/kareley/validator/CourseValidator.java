package com.bsuir.kareley.validator;

import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.exception.ServiceException;
import org.springframework.stereotype.Component;

import static com.bsuir.kareley.util.StringUtils.isBlank;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Component
public class CourseValidator implements EntityValidator<Course> {

    @Override
    public void validate(Course course) {
        if (isBlank(course.getTitle()))
            throw new ServiceException("title.blank", BAD_REQUEST);
        if (isBlank(course.getDescription()))
            throw new ServiceException("description.blank", BAD_REQUEST);
        if (course.getLessonsAmount() < 1)
            throw new ServiceException("lessons.invalid", BAD_REQUEST);
        if (course.getParticipantsNumber() < 1)
            throw new ServiceException("participants.number.invalid", BAD_REQUEST);
        if (course.getTeacher() == null || course.getTeacher().getId() == 0)
            throw new ServiceException("course.teacher.invalid", BAD_REQUEST);
        if (course.getPrice().doubleValue() < 1)
            throw new ServiceException("course.price.invalid", BAD_REQUEST);
        if (course.getEndDate().compareTo(course.getStartDate()) < 1)
            throw new ServiceException("course.dates.invalid", BAD_REQUEST);
    }
}
