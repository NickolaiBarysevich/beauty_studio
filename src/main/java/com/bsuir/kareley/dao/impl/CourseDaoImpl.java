package com.bsuir.kareley.dao.impl;

import com.bsuir.kareley.dao.api.CourseDao;
import com.bsuir.kareley.dao.mapper.EntityMapper;
import com.bsuir.kareley.dao.query.Query;
import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import javax.sql.DataSource;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CourseDaoImpl extends AbstractDao<Course> implements CourseDao {

    private static final String CREATE_QUERY = "INSERT INTO course (title, description, participants_number," +
            " start_date, end_date, lessons_amount, price, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    private static final String UPDATE_QUERY = "UPDATE course SET title = ?, description = ?, participants_number =?, " +
            "start_date = ?, end_date = ?, lessons_amount = ?, price = ?, teacher_id = ? WHERE id = ?";
    private static final String ADD_PARTICIPANT_QUERY = "INSERT INTO course_user VALUES (?, ?)";
    private static final String REMOVE_PARTICIPANT_QUERY = "DELETE FROM course_user WHERE course_id = ? AND user_id = ?";
    private static final String FIND_USER_COURSES_QUERY = "SELECT * FROM course JOIN course_user AS cu ON course.id = cu.course_id WHERE cu.user_id = ?";

    @Autowired
    public CourseDaoImpl(DataSource dataSource) {
        super(dataSource);
    }

    @Override
    protected Query getCreateQuery(Course course) {
        List<Object> parameters = extractCourse(course);
        return new Query(CREATE_QUERY, parameters.toArray());
    }

    private List<Object> extractCourse(Course course) {
        List<Object> values = new ArrayList<>();
        values.add(course.getTitle());
        values.add(course.getDescription());
        values.add(course.getParticipantsNumber());
        values.add(course.getStartDate());
        values.add(course.getEndDate());
        values.add(course.getLessonsAmount());
        values.add(course.getPrice());
        values.add(course.getTeacher().getId());
        return values;
    }

    @Override
    protected Query getUpdateQuery(Course course) {
        List<Object> parameters = extractCourse(course);
        parameters.add(course.getId());
        return new Query(UPDATE_QUERY, parameters.toArray());
    }

    @Override
    protected String getTableName() {
        return "course";
    }

    @Override
    protected EntityMapper<Course> getMapper() {
        return rs -> {
            int id = rs.getInt("id");
            String title = rs.getString("title");
            String description = rs.getString("description");
            int participantsNumber = rs.getInt("participants_number");
            LocalDate startDate = rs.getDate("start_date").toLocalDate();
            LocalDate endDate = rs.getDate("end_date").toLocalDate();
            int lessonsAmount = rs.getInt("lessons_amount");
            BigDecimal price = rs.getBigDecimal("price");
            User teacher = new User(rs.getInt("teacher_id"));
            return new Course(id, title, description, participantsNumber, startDate, endDate, lessonsAmount, price, teacher, new ArrayList<>());
        };
    }

    @Override
    public void addParticipant(int courseId, int userId) {
        executeUpdate(ADD_PARTICIPANT_QUERY, courseId, userId);
    }

    @Override
    public void removeParticipant(int courseId, int userId) {
        executeUpdate(REMOVE_PARTICIPANT_QUERY, courseId, userId);
    }

    @Override
    public List<Course> findCoursesForUser(int userId) {
        return executeQuery(FIND_USER_COURSES_QUERY, userId);
    }
}
