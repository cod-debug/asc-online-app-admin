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

export const addTypeOfDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/document-type/create`,
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


export const getTypeOfDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/document-type/getall/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}


export const updateTypeOfDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/document-type/update/?id=${payload.id}`,
        data: payload.data,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}

export const getSpecificTypeOfDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/document-type/getone/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}



export const addTypeOfMainDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/main-document-type/create`,
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


export const getTypeOfMainDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/main-document-type/getall/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}


export const updateTypeOfMainDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "post",
        url: `${getEnv('API_BASE_URL')}/main-document-type/update/?id=${payload.id}`,
        data: payload.data,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}

export const getSpecificTypeOfMainDocu = async ({ commit }, payload) => {
    let res = {};
    try {
        res = await axios({
        method: "get",
        url: `${getEnv('API_BASE_URL')}/main-document-type/getone/`,
        params: payload,
        headers: headers,
        })
    } catch (e) {
        res.data = e.response.data
        res.status = e.response.status
    }
    return res;
}