import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';
import { firestorePlugin } from 'vuefire';
import store from '@/store/index';

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

export const db = firebase.firestore();

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
