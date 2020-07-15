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
async function uniqueCharacterCall(characterId) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/character`,
        data: {
            id: characterId,
        },
        // headers: {
        // },
        withCredentials: true,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}
async function retrieveOwn() {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/character`,
        // headers: {
        // },
        withCredentials: true,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}
async function characterCreatorCall(level, clase, raza, dices) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/charactergenerator`,
        // headers: {
        // },
        data: {
            level: `${level}`,
            class: `${clase}`,
            race: `${raza}`,
            dices: `${dices}`,
        },
        withCredentials: false,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}

async function characterSaveCall (character) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/savecharacter`,
        // headers: {
        // },
        data: {
            name: character.name,
            clase: character.clase,
            nivel: character.nivel,
            raza: character.raza,
            especial: character.especial,
            tam: character.tam,
            salvaciones: character.salvaciones,
            caracteristicas: character.caracteristicas,
            habilidades: character.habilidades,
            equipo: character.equipo,
            ataqueBase: character.ataqueBase,
            ataques: character.ataques,
            ca: character.ca,
            velocidad: character.velocidad,
            pg: character.pg,
            alineamiento: character.alineamiento,
            conjuros: character.conjuros,
        },
        withCredentials: true,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}

async function obtainCharacterIsPublic (characterId) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/makepublic`,
        // headers: {
        // },
        data: {
            character: characterId
        },
        withCredentials: true,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}

async function changeCharacterPublic (makePublic, characterId) {
    return axios({
        method: 'PUT',
        url: `${backEnd}/api/makepublic`,
        // headers: {
        // },
        data: {
            public: makePublic,
            character: characterId,
        },
        withCredentials: true,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error.response;
        })
}
export { loginCall, registerCall, publicCharacterCall, characterCreatorCall, characterSaveCall, uniqueCharacterCall, retrieveOwn, obtainCharacterIsPublic, changeCharacterPublic };