const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}

const config = {
  API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const addCategory = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/product-categ/create`,
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


export const getCategory = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/product-categ/getall/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}



export const updateCategory = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/product-categ/update/?id=${payload.id}`,
        data: payload.data,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}

export const getSpecificCategory = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/product-categ/getone/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}