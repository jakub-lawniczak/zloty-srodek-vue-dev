import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
});

const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        auth: null,
        user: {
            firstName: '',
            lastName: '',
        },
    },
    mutations: {
        setAuth(state, auth) {
            state.auth = auth;
        },
    },
    getters: {
        checkAuth(state) {
            return state.auth;
        },
    },
});

export default store;
