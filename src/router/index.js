import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Panel from '../views/Panel.vue';
import Register from '../views/Register.vue';
import Confirmation from '../views/Confirmation.vue';
import Admin from '../views/Admin.vue';
import User from '../views/_user/id.vue';
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
        component: Register,
    },
    {
        path: '/confirmation',
        name: 'Confirmation',
        component: Confirmation,
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
    },
    {
        path: '/panel',
        name: 'Panel',
        component: Panel,
        meta: {
            authRequired: true,
        },
    },
    {
        path: '/raport',
        name: 'Raport',
        component: () =>
            import(/* webpackChunkName: "Panel" */ '../views/Raport.vue'),
        meta: {
            authRequired: true,
        },
    },
    {
        name: 'User',
        path: '/user/:uid',
        component: User,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        if (store.state.auth) {
            next({ name: 'Panel' });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.authRequired)) {
        if (store.state.auth) {
            next();
        } else {
            alert('You must be logged in to see this page');
            next({ name: 'Login' });
        }
    } else {
        next();
    }
});
export default router;
