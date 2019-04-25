export const getOrders = (token, mine) => {
    const url = 'http://localhost:8080/api/orders' + mine ? "?mine" : "" ;
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': language
        }
    })
        .then(response => response.json())
}

export const createOrder = (token, courseId) => {
    const url = 'http://localhost:8080/api/orders?courseId=' + courseId ;
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

export const createOrder = (token, orderId, status) => {
    const url = 'http://localhost:8080/api/orders/' + orderId + "?status=" + status;
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