import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import { firestorePlugin } from 'vuefire';
import store from '@/store/index';
import * as rules from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';
import { localize } from 'vee-validate';

import pl from 'vee-validate/dist/locale/pl.json';

// Install and Activate the Arabic locale.
localize('pl', pl);

Vue.use(firestorePlugin);

Vue.config.productionTip = false;
var firebaseConfig = {
    apiKey: 'AIzaSyC9G8dbT3qFT2NNu_lInH8VcZQ3Fa8m8JE',
    authDomain: 'zloty-srodek-vue.firebaseapp.com',
    projectId: 'zloty-srodek-vue',
    storageBucket: 'zloty-srodek-vue.appspot.com',
    messagingSenderId: '401828848122',
    appId: '1:401828848122:web:9d73c60e01ed2ada058443',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

export const db = firebase.firestore();

new Vue({
    router,
    store,
    // VeeValidate,
    render: h => h(App),
}).$mount('#app');
