export const setToken =  (state , token)=>{
  state.token = token;
  state.isAuthenticated = true;

}

export const removeToken =  (state , token)=>{
  state.token = '';
  state.isAuthenticated = false;
  state.userDetails = {};

}

export const setUserDetails =  (state , userDetails)=>{
  state.userDetails = userDetails;
}


