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
import medium from "./medium";
import execution from "./execution";
import medium_execution from "./medium_execution";
import reason from "./reason";
import document_file_size from "./document_file_size";
import number_of_multi_app from "./number_of_multi_app";
import rationale from "./rationale";
import screener_reviewer_pair from "./screener_reviewer_pair";
import brand_penalties from "./brand_penalties";
import company_penalties from "./company_penalties";
import s1 from "./s1";
import asc_user from "./asc_user";
import holiday from "./holiday";
import application_expiration from "./application_expiration";
import promissory_note_period from "./promissory_note_period";
import s1_sched_of_fees from "./s1_sched_of_fees";
import s1_incomplete_expiration from "./s1_incomplete_expiration";
import weekly_user_schedule from "./weekly_user_schedule";
import sessions from "./sessions";
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
      medium,
      execution,
      medium_execution,
      reason,
      document_file_size,
      number_of_multi_app,
      rationale,
      screener_reviewer_pair,
      brand_penalties,
      company_penalties,
      s1,
      asc_user,
      holiday,
      application_expiration,
      promissory_note_period,
      s1_sched_of_fees,
      s1_incomplete_expiration,
      weekly_user_schedule,
      sessions,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});
