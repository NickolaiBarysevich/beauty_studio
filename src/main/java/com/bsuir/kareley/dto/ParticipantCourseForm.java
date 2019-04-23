package com.bsuir.kareley.dto;

public class ParticipantCourseForm {

    private int courseId;
    private int userId;

    public ParticipantCourseForm() {
    }

    public ParticipantCourseForm(int courseId, int userId) {
        this.courseId = courseId;
        this.userId = userId;
    }

    public int getCourseId() {
        return courseId;
    }

    public int getUserId() {
        return userId;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
