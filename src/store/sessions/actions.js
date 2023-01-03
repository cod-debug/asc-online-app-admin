const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

// const config = {
//   API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
// }

let token = localStorage.getItem('token') || '';
const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': `Bearer ${token.replace('__q_strn|', '')}`
}

const config = {
  ADMIN_API_BASE_URL: window?.appConfig?.API_BASE_URL || process.env.API_BASE_URL
}

export function getEnv(name) {
  return config[name];
}

export const _user_logged = async(context) => {
  let res = await axios({
    url: `${getEnv('ADMIN_API_BASE_URL')}/users/logged-in`,
    data: null,
    method: "get",
    headers: headers
  })
  return res;
}


export const save_sessions = async (context, params) => {

}
