import axios from 'axios'
import {config} from '../../Constants'
import {parseJwt} from './Helpers'

export const careerCompassApi = {
    postApiCall,
    getApiCall,
    deleteApiCall,
    putApiCall,
    patchApiCall,
    postApiCallWithoutToken,
    getApiCallWithoutToken,
    authenticate,
    signup
}

async function postApiCall(userJson, path, body) {
    try {
        const response = await instance.post(path, body, {
            headers: {'Content-type': 'application/json', 'Authorization': bearerAuth(userJson)}
        })
        if (response.status === 201 || response.status === 200) {
            return {
                statusCode: response.status,
                data: response.data
            };
        } else {
            return {
                statusCode: response.status,
                message: response.message
            }
        }
    } catch (e) {
        return {
            statusCode: 409,
            message: e.message
        }
    }
}

async function postApiCallWithoutToken(path, body) {
    try {
        const response = await instance.post(path, body, {
            headers: {'Content-type': 'application/json'}
        })

        if (response.status === 201 || response.status === 200) {
            return {
                statusCode: response.status,
                data: response.data
            };
        } else {
            return {
                statusCode: response.status,
                message: response.message
            }
        }
    } catch (e) {
        return {
            statusCode: 409,
            message: e.message
        }
    }
}

async function patchApiCall(userJson, path) {
    const response = await instance.patch(path, {}, {
        headers: {'Authorization': bearerAuth(userJson)}
    })

    if (response.status === 200) {
        return {
            statusCode: response.status,
            data: response.data
        };
    } else {
        return {
            statusCode: response.status,
            message: response.message
        }
    }
}

async function getApiCall(userJson, path) {
    const response = await instance.get(path, {
        headers: {'Authorization': bearerAuth(userJson)}
    })

    if (response.status === 200) {
        return {
            statusCode: response.status,
            data: response.data
        };
    } else {
        return {
            statusCode: response.status,
            message: response.message
        }
    }
}

async function getApiCallWithoutToken(path) {
    const response = await instance.get(path)

    if (response.status === 200) {
        return {
            statusCode: response.status,
            data: response.data
        };
    } else {
        return {
            statusCode: response.status,
            message: response.message
        }
    }
}

async function putApiCall(userJson, path, body) {
    try {
        const response = await instance.put(path, body, {
            headers: {'Content-type': 'application/json', 'Authorization': bearerAuth(userJson)}
        })
        if (response.status === 201 || response.status === 200) {
            return {
                statusCode: response.status,
                data: response.data
            };
        } else {
            return {
                statusCode: response.status,
                message: response.message
            }
        }
    } catch (e) {
        return {
            statusCode: 409,
            message: e.message
        }
    }
}

async function deleteApiCall(userJson, path) {
    const response = await instance.delete(path, {
        headers: {'Authorization': bearerAuth(userJson)}
    })

    if (response.status === 200 || response.status === 204) {
        return {
            statusCode: response.status,
            data: response.data
        };
    } else {
        return {
            statusCode: response.status,
            message: response.message
        }
    }
}

function authenticate(username, password) {
    return instance.post('/auth/authenticate', {username, password}, {
        headers: {'Content-type': 'application/json'}
    })
}

function signup(user) {
    return instance.post('/auth/signup', user, {
        headers: {'Content-type': 'application/json'}
    })
}


const instance = axios.create({
    baseURL: config.url.API_BASE_URL
})

instance.interceptors.request.use(function (config) {
    if (config.headers.Authorization) {
        const token = config.headers.Authorization.split(' ')[1]
        const data = parseJwt(token)
        if (Date.now() > data.exp * 1000) {
            window.location.href = "/login"
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

function bearerAuth(user) {
    return `Bearer ${user.accessToken}`
}