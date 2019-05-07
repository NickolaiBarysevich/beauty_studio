package com.bsuir.kareley.dto;

import com.bsuir.kareley.entity.Course;
import com.bsuir.kareley.entity.User;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class CourseDto {

    private int id;
    private String title;
    private String description;
    private int participantsNumber;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private int lessonsAmount;
    private BigDecimal price;
    private String teacher;
    private String imageUrl;
    private List<User> participants;

    public CourseDto() {
    }

    private CourseDto(int id, String title, String description, int participantsNumber, LocalDate startDate, LocalDate endDate, int lessonsAmount, BigDecimal price, String teacher, String imageUrl, List<User> participants) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.participantsNumber = participantsNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.lessonsAmount = lessonsAmount;
        this.price = price;
        this.teacher = teacher;
        this.imageUrl = imageUrl;
        this.participants = participants;
    }

    public static CourseDto buildFromCourse(Course course) {
        return new CourseDto(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getParticipantsNumber(),
                course.getStartDate(),
                course.getEndDate(),
                course.getLessonsAmount(),
                course.getPrice(),
                course.getTeacher().getUsername(),
                course.getImageUrl(),
                course.getParticipants()
        );
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getParticipantsNumber() {
        return participantsNumber;
    }

    public void setParticipantsNumber(int participantsNumber) {
        this.participantsNumber = participantsNumber;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public int getLessonsAmount() {
        return lessonsAmount;
    }

    public void setLessonsAmount(int lessonsAmount) {
        this.lessonsAmount = lessonsAmount;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }
}