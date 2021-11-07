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
        component: () => import(/* webpackChunkName: "sword" */ "../views/sword/index.vue"),
        children: [
            {
                path: '35',
                component: () => import(/* webpackChunkName: "35" */ "../views/sword/35.vue")
            },{
                path: '36',
                component: () => import(/* webpackChunkName: "36" */ "../views/sword/36.vue")
            },{
                path: '37',
                component: () => import(/* webpackChunkName: "37" */ "../views/sword/37.vue")
            },{
                path: '38',
                component: () => import(/* webpackChunkName: "38" */ "../views/sword/38.vue")
            },{
                path: '39',
                component: () => import(/* webpackChunkName: "39" */ "../views/sword/39.vue")
            },{
                path: '40',
                component: () => import(/* webpackChunkName: "40" */ "../views/sword/40.vue")
            },{
                path: '41',
                component: () => import(/* webpackChunkName: "41" */ "../views/sword/41.vue")
            },{
                path: '42',
                component: () => import(/* webpackChunkName: "42" */ "../views/sword/42.vue")
            },{
                path: '43',
                component: () => import(/* webpackChunkName: "43" */ "../views/sword/43.vue")
            },{
                path: '44',
                component: () => import(/* webpackChunkName: "44" */ "../views/sword/44.vue")
            },
            {
                path: 'JZ-23',
                component: () => import(/* webpackChunkName: "JZ-23" */ "../views/sword/JZ-23.vue")
            }
        ],
    },
    {
        path: "/ts",
        component: () => import(/* webpackChunkName: "ts" */ "../views/ts/index.vue"),
        children: [
            {
                path: 'infer',
                component: () => import(/* webpackChunkName: "infer" */ "../views/ts/infer.vue")
            }
        ],
    },
    {
        path: "/editor",
        component: () => import(/* webpackChunkName: "editor" */ "../views/quill-editor/index.vue"),
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
