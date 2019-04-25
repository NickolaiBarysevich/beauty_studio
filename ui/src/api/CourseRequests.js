/*
    Returns a json object that contains a list of courses.
    The method available for all users.
    Example:

    [
        {
            "id": 1,
            "title": "title",
            "description": "desc",
            "participantsNumber": 4,
            "startDate": "2019-03-31",
            "endDate": "2019-03-31",
            "lessonsAmount": 4,
            "price": 65,
            "teacher": {
                "id": 1,
                "username": "user",
                "firstName": "name",
                "lastName": " name2",
                "email": "email",
                "phoneNumber": "1234567891023",
                "role": "USER"
            },
            "participants": []
        }
    ]

    token - authorization token for user
    language - the language of response can be "ru" or "en"
    mine - if specified returns courses that the user ordered
*/
export const getCourses = (token, language, mine) => {
    return await fetch("http://localhost:8080/api/courses" +  mine  ? "?mine" : "", {
        headers: {
            "Authorization": "Bearer " + token,
            'Accept-language': language
        }
    })
        .then(response => response.json())
};

/*
    Creates a course.
    The method available for admin only.
    Example of parameters argument:

    {
        "title": "title",
        "description": "desc",
        "participantsNumber": 4,
        "startDate": "2019-03-31",
        "endDate": "2019-03-31",
        "lessonsAmount": 4,
        "price": 65,
        "teacher": {
            "id": 1,
        }
    }

    token - authorization token for user
    language - the language of response can be "ru" or "en"
*/
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

/*
    Deletes a course with specified id.
    The method available for admin only.
    Example of parameters argument:

    id - id of the course to delete
    token - authorization token for user
    language - the language of response can be "ru" or "en"
*/
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

/*
    Modifies the course.
    The method available for admin only.
    Example of course argument:

    {
        "id": 1
        "title": "title",
        "description": "desc",
        "participantsNumber": 4,
        "startDate": "2019-03-31",
        "endDate": "2019-03-31",
        "lessonsAmount": 4,
        "price": 65,
        "teacher": {
            "id": 1,
        }
    }

    token - authorization token for user
    language - the language of response can be "ru" or "en"
*/
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

/*
    Add or remove a participant from the course
    The method available for admin and teacher.

    Example of the participantCourseForm argument:

    {
        "courseId": 1
        "userId": 1
    }

    action - an action that should be done. Can be "addParticipant" or "removeParticipant"
    token - authorization token for user
    language - the language of response can be "ru" or "en"
*/
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