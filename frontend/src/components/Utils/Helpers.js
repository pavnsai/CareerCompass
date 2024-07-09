export function parseJwt(token) {
    if (!token) {
        return
    }
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

export const handleLogError = (error) => {
    if (error.response) {
        console.error(error.response.data)
    } else if (error.request) {
        console.error(error.request)
    } else {
        console.error(error.message)
    }
}


