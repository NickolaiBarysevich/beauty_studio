export const getCourses = (token, language, mine) => {
    return await fetch("http://localhost:8080/api/courses" +  mine  ? "?mine" : "", {
        headers: {
            "Authorization": "Bearer " + token,
            'Accept-language': language
        }
    })
        .then(response => response.json())
};

export const createCourse = (parameters, token, language) => {
    return await fetch("http://localhost:8080/api/courses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': language
        },
        body: JSON.stringify({
            title: parameters.title,
            description: parameters.description,
            participantsNumber: parameters.participantsNumber,
            startDate: parameters.startDate,
            endDate: parameters.endDate,
            lessonsAmount: parameters.lessonsAmount,
            price: parameters.price,
            teacher: {
                id: parameters.teacherId
            }
        })
    })
        .then(response => response.json())
};

export const deleteCourse = (id, token, language) => {
    const url = "http://localhost:8080/api/courses/" + id;
    return await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': language
        }
    })
        .then(response => response.ok ? "ok" : response.json())
};

export const updateCourse = (course, token, language) => {
    return await fetch("http://localhost:8080/api/courses/" + course.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': language
        },
        body: JSON.stringify({
            title: parameters.title,
            description: parameters.description,
            participantsNumber: parameters.participantsNumber,
            startDate: parameters.startDate,
            endDate: parameters.endDate,
            lessonsAmount: parameters.lessonsAmount,
            price: parameters.price,
            teacher: {
                id: parameters.teacherId
            }
        })
    })
        .then(response => response.json())
};

export const addOrRemoveParticipant = (participantCourseForm, action, token, language) => {
    return await fetch("http://localhost:8080/api/courses?userAction=" + action, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': language
        },
        body: JSON.stringify({
            courseId: participantCourseForm.courseId,
            userId: participantCourseForm.userId
        })
    })
        .then(response => response.json())
};
