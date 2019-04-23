export const signIn = (username, password, language) => {
    const signInUrl = 'http://localhost:8080/api/users/signIn';
    return await fetch(signInUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-language': language
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
        .then(response => response.json())
};

export const signUp = (parameters) => {
    const signUpUrl = 'http://localhost:8080/api/users/signUp';
    return await fetch(signUpUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept-language': language
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
        .then(response => response.json())
};

export const setUserRole = (userId, role, token) => {
    const url = 'http://localhost:8080/api/users/' + userId + "?role=" + role ;
    return await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': language
        }
    })
        .then(response => response.json())
}