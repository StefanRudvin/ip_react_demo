import axios from 'axios'

function intercept() {
    // Set token to all requests
    axios.interceptors.request.use(function (config) {
        config.headers.authorization = 'Bearer ' + process.env.REACT_APP_IP_TOKEN
        return config
    }, function (error) {
        return Promise.reject(error)
    })
}

export default intercept()

