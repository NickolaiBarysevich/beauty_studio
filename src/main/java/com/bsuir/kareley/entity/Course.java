package com.bsuir.kareley.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

public class Course implements Identifiable {

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
    private User teacher;
    private String imageUrl;
    private List<User> participants;

    public Course() {
    }

    public Course(int id) {
        this.id = id;
    }

    public Course(int id, String title, String description, int participantsNumber, LocalDate startDate,
                  LocalDate endDate, int lessonsAmount, BigDecimal price, User teacher, String imageUrl) {
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
    }

    public Course(String title, String description, int participantsNumber, LocalDate startDate, LocalDate endDate,
                  int lessonsAmount, BigDecimal price, User teacher, String imageUrl, List<User> participants) {
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

    public Course(int id, String title, String description, int participantsNumber, LocalDate startDate, LocalDate endDate, int lessonsAmount, BigDecimal price, User teacher, String imageUrl, List<User> participants) {
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

    public User getTeacher() {
        return teacher;
    }

    public void setTeacher(User teacher) {
        this.teacher = teacher;
    }

    public List<User> getParticipants() {
        return participants;
    }

    public void setParticipants(List<User> participants) {
        this.participants = participants;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return id == course.id &&
                participantsNumber == course.participantsNumber &&
                lessonsAmount == course.lessonsAmount &&
                Objects.equals(title, course.title) &&
                Objects.equals(description, course.description) &&
                Objects.equals(startDate, course.startDate) &&
                Objects.equals(endDate, course.endDate) &&
                Objects.equals(price, course.price) &&
                Objects.equals(teacher, course.teacher) &&
                Objects.equals(participants, course.participants);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, participantsNumber, startDate, endDate, lessonsAmount, price, teacher, participants);
    }

    @Override
    public String toString() {
        return "Course{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", participantsNumber=" + participantsNumber +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", lessonsAmount=" + lessonsAmount +
                ", price=" + price +
                ", teacher=" + teacher +
                ", participants=" + participants +
                '}';
    }
}
