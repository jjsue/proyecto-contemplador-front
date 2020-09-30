const axios = require('axios').default;

//const backEnd = 'http://10.10.10.99:3000'
const backEnd = 'https://proyectocontemplador.es'

async function pnjGeneratorCallDnD35(level, clase, raza, dices) {
    return axios({
        method: 'POST',
        url: `${backEnd}/api/dyd35/charactergenerator`,
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


export { pnjGeneratorCallDnD35 };