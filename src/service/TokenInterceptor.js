import axios from 'axios'

function intercept() {
    // Set token to all requests
    axios.interceptors.request.use(function (config) {
        config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
        return config
    }, function (error) {
        return Promise.reject(error)
    })
}

export default intercept()

