const axios = require('axios').default;

const backEnd = 'http://localhost:3000'

async function loginCall(user, pass) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/login`,
        // headers: {
        // },
        data: {
            email: `${user}`,
            password: `${pass}`
        },
        withCredentials: true,
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response;
        })
}

export { loginCall };