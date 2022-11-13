const { LocalStorage, Notify } = require("quasar");
import axios from "axios";

export const approveUser = async ({ commit }, payload) => {
  let res = await axios({
    url:
      process.env.API_URL +
      `/apprv/${payload.id}`,
    method: "post",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token').replace('__q_strn|', '')}`
    }
  })
  return res;
}