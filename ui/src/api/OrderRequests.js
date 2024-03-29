/*
    Returns a json object that contains a list of orders.
    If the argument "mine" is specified returns and array of orders for concrete user.
    If it not return an array of all orders
    Example:

    [
        {
            "id": 1,
            "orderTime": "2019-03-31 06:07:16",
            "customer": {
                ...
            },
            "course": {
                ...
            },
            "orderStatus": "PROCESSING"
        }
    ]

    token - authorization token for user
    mine - if specified returns user orders
*/
export const getOrders = (token) => {
    const url = '/api/orders';
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

export const getUserOrders = (token) => {
    const url = '/api/orders?mine';
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

/*
    Creates an order for the concrete user.
    Available four users and teachers.

    token - authorization token for user
    courseId - id of the course that must be ordered
*/
export const createOrder = (token, courseId) => {
    const url = '/api/orders?courseId=' + courseId;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': "ru"
        }
    })
        .then(response => response.json())
};

/*
    Changes the order status.
    Available for admin only.

    token - authorization token for user
    orderId - id of the order which status must be changed
    status - status that should be applied. Options: processing, approved, canceled.
*/
export const approveOrder = (token, orderId, courseId) => {
    const url = '/api/orders/' + orderId + '?approve&courseId=' + courseId;
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': "ru"
        }
    })
        .then(response => response.json())
};

export const cancelOrder = (token, orderId) => {
    const url = '/api/orders/' + orderId + '?cancel';
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': "ru"
        }
    })
        .then(response => response.json())
};

export const deleteOrder = (id, token) => {
    const url = "/api/orders/" + id;
    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token,
            'Accept-language': "ru"
        }
    })
        .then(response => response.status === 200 ? {status: 200} : response.json())
};