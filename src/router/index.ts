import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/proxy",
        name: "proxy",
        // route level code-splitting
        // this generates a separate chunk (proxy.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "proxy" */ "../views/proxy.vue")
    },
    {
        path: "/regexp",
        component: () =>
            import(/* webpackChunkName: "regexp" */ "../views/regexp/index.vue")
    },
    {
        path: "/offer",
        // TODO：不加component还不行，难道children必须有父 component？
        component: () => import(/* webpackChunkName: "sword" */ "../views/sword/index.vue"),
        children: [
            {
                path: '35',
                component: () => import(/* webpackChunkName: "35" */ "../views/sword/35.vue")
            }
        ],
    },
    {
        path: "*",
        component: () => import(/* webpackChunkName: "home" */ "../views/home.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
