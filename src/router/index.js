import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    },
    // {
    //     path: '/raport',
    //     name: 'Raport',
    //     component: () =>
    //         import(/* webpackChunkName: "about" */ '../components/Raport.vue'),
    // },
    {
        path: '/panel',
        name: 'Panel',
        component: () =>
            import(/* webpackChunkName: "Panel" */ '../views/Panel.vue'),
        meta: {
            authRequired: true,
        },
    },
    // {
    //     path: '/first-raport',
    //     name: 'FirstRaport',
    //     component: () =>
    //         import(/* webpackChunkName: "Panel" */ '../views/FirstRaport.vue'),
    //     meta: {
    //         authRequired: true,
    //     },
    // },
    {
        path: '/raport',
        name: 'Raport',
        component: () =>
            import(/* webpackChunkName: "Panel" */ '../views/Raport.vue'),
        meta: {
            authRequired: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authRequired)) {
        if (store.state.auth) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({
                path: '/',
            });
        }
    } else {
        next();
    }
});

export default router;
