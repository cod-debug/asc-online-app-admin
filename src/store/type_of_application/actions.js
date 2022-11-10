const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const addTypeOfApplication = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/application-type/create`,
        data: payload,
        headers: headers,
        })
    } catch (e) {
        console.log(e);
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}


export const getTypeOfApplication = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/application-type/getall/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}
