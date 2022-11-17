import { store } from "quasar/wrappers";
import { createStore } from "vuex";
import auth from "./auth";
import users from "./users";
import account from "./account";
import company from "./company";
import affiliation from "./affiliation";
import announcements from "./announcements";
import type_of_application from "./type_of_application";
import type_of_docu from "./type_of_docu";
import email from "./email";
import payment from "./payment";
import dialect from "./dialect";
import category from "./category";
import brand from "./brand";
import product from "./product";
import clearance from "./clearance";


// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
      auth,
      users,
      account,
      company,
      affiliation,
      announcements,
      type_of_application,
      type_of_docu,
      email,
      payment,
      dialect,
      category,
      brand,
      product,
      clearance,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
