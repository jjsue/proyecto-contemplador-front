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
async function registerCall(user, pass, email) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/register`,
        // headers: {
        // },
        data: {
            userName: `${user}`,
            email: `${email}`,
            password: `${pass}`
        },
        withCredentials: false,
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            return error.response;
        })
}
async function publicCharacterCall(queryString) {
    return axios({
        method: 'GET',
        url: `${backEnd}/api/character?${queryString}`,
        // headers: {
        // },
        withCredentials: false,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}

export { loginCall, registerCall, publicCharacterCall };