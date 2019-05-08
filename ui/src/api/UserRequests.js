/*
    Signs user in.
    Response example:

    {
        "username": "admin",
        "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MiwiaWF0IjoxNTU2MjE2Njk5LCJleHAiOjE1NTYyMjAyOTl9.LM2k02RlHtxHHU6KzTsbvlTmY-_8zXX2c6nGthKwz0iqScvZ0RNJhYG2-dffxCj_uoKsiuu1uMZjoKufux8H-A",
        "expirationDate": "2019-04-25 22:24:59"
    }

    Token in the response is the key value of the authorization.
    It should be provided with all requests where it needed.
    It's better to store it somewhere.
    Expiration date signs when the token will be expired. When
    the token came expired, the user should re-login.

    username - username of the user
    password - user's password
    language - the language of response can be "ru" or "en"
*/
export const signIn = (username, password) => {
    const signInUrl = '/api/users/signIn';
    return fetch(signInUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-language': "ru"
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
};

/*
    Signs user up.

    Parameters argument example:

    {
		"username": "username",
		"password": "password",
		"firstName": "firstName",
		"lastName" : "lastName",
		"phoneNumber": "phoneNumber",
		"email": "email@email.com"
    }

*/
export const signUp = (parameters) => {
    const signUpUrl = '/api/users/signUp';
    return fetch(signUpUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-language': "ru"
        },
        body: JSON.stringify({
            username: parameters.username,
            password: parameters.password,
            firstName: parameters.firstName,
            lastName: parameters.lastName,
            email: parameters.email,
            phoneNumber: parameters.phoneNumber
        })
    })
        .then(response => {
            if (response.status === 201) {
                return {
                    status: 201
                }
            } else {
                return response.json();
            }
        })
};

/*
    Changes the role of the user.
    Available for admin only

    userId - id of the user which role should be changed
    role - the role that should be set. Options: "user", "teacher"
    token - authorization token for user
    language - the language of response can be "ru" or "en"
*/
export const setUserRole = (userId, role, token) => {
    const url = '/api/users/' + userId + "?role=" + role;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': "ru"
        }
    })
        .then(response => response.json())
}

/*
    Available for admin only.
    Response example:

    {
        "list": [
            {
                "id": 1,
                "username": "user",
                "firstName": "name",
                "lastName": " name2",
                "email": "email",
                "phoneNumber": "1234567891023",
                "role": "USER"
            },
            {
                "id": 2,
                "username": "admin",
                "firstName": "admin",
                "lastName": "admin",
                "email": "admin@gmail.com",
                "phoneNumber": "admin",
                "role": "ADMIN"
            }
        ],
        "totalRows": 2
    }

    List in the response is an array of users. Total rows is the amount of
    users in database. The value "totalRows" provided for an opportunity
    of creation of pagination interface.

    token - authorization token for user
*/
export const getUsers = token => {
    const url = '/api/users/';
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': "ru"
        }
    })
        .then(response => response.json())
};