import {
  maintenanceRoutes,
  accountRoutes,
  companyRoutes,
  S1applicationRoutes,
  S2applicationRoutes,
  applicationRoutes,
} from "./routes-admin.js";

const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      notRequiredAuth: true,
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "home-page",
        path: "",
        meta: {
          notRequiredAuth: true,
        },
        component: () => import("pages/HomePage.vue"),
      }
    ]
  },
  {
    name: "dashboard",
    path: "/asc/page/",
    component: () => import("layouts/ApplicantLayout.vue"),
    children: [
      {
        name: "dashboard",
        path: "",
        component: () => import("components/Admin/Dashboard/DashboardIndex.vue"),
      },
      {
        name: "dashboard",
        path: "announcement",
        component: () => import("pages/AnnouncementView.vue"),
      },
      ...maintenanceRoutes,
      ...accountRoutes,
      ...companyRoutes,
      ...S1applicationRoutes,
      ...S2applicationRoutes,
      ...applicationRoutes,
    ]
  },
  {
    path: "/account",
    name: "account",
    component: () => import("layouts/ApplicantLayout.vue"),
    children: [
      {
        path: "user-profile",
        name: "user-profile",
        component: () => import('pages/Profile/Account/UserProfile/UserProfileIndex.vue'),
      },
    ]
  },

  /*{
    name: "login",
    path: "/auth/login",
    component: () => import("pages/auth/Login.vue"),
  },
  {
    name: "redirect",
    path: "/auth/redirect",
    component: () => import("pages/auth/Redirect.vue"),
  },
  // {
  //   path: "/auth/register",
  //   component: () => import("pages/auth/Register.vue"),
  // },
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),

    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("src/pages/Dashboard.vue"),
        meta: {
          requiresAuth: true,
        },
      },

      {
        path: "/user/accounts",
        component: () => import("src/pages/usersPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },

    ],
  },



  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },*/
];

export default routes;
