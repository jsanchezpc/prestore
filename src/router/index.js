import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

import HomeLayout from "./../layouts/HomeLayout.vue";
import ProductLayout from "../layouts/ProductLayout.vue";
import CreateProduct from "../views/CreateProduct.vue";
import DiscoverView from "../views/DiscoverView.vue";
import InsightsView from "../views/InsightsView.vue";
import LoginLayout from "../layouts/LoginLayout.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import { useUserStore } from "../store/user-store";

const routes = [
  {
    path: "/account",
    component: LoginLayout,
    children: [
      {
        path: "login",
        component: LoginView,
      },
      {
        path: "create",
        component: SignupView,
      },
    ],
  },
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "",
        component: DashboardView,
        meta: { requiresAuth: true },
      },
      {
        path: "discover",
        component: DiscoverView,
        meta: { requiresAuth: true },
      },
      {
        path: "insights",
        component: InsightsView,
        meta: { requiresAuth: true },
      },
      {
        path: "dashboard/create",
        component: CreateProduct,
        meta: { requiresAuth: true },
      },
    ],
  },
  { path: "/:webname", component: ProductLayout, props: true },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("userToken"); 

    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      next({ path: "/account/login" });
    } else {
      try {
        const response = await axios.get("http://localhost:3000/account/sync", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
          params: {
            userId: userId
          }
        });

        if (response.status === 200) {
          useUserStore().setAccount(response.data.user.user);
          next();
        }
      } catch (error) {
        console.error("Error sincronizando el token: ", error);
        localStorage.removeItem("userToken"); 
        localStorage.removeItem("userId"); 
        next({ path: "/account/login" });
      }
    }
  } else {
    next();
  }
});

export default router;
