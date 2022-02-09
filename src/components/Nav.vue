<template>
    <div id="nav">
        <router-link v-if="!ifAuth" to="/">Login</router-link>
        <router-link v-else to="/panel">Panel</router-link> |
        <router-link to="/register">Register</router-link>
        <Btn v-if="ifAuth" @click.native="logout" text="Logout" :full="true" />
    </div>
</template>
<script>
import firebase from 'firebase';
import Btn from '@/components/Btn';
export default {
    name: 'Nav',
    components: {
        Btn,
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$store.commit('setAuth', null);
                    alert('Successfully logged out');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
    },
    computed: {
        ifAuth() {
            return this.$store.getters.checkAuth;
        },
    },
};
</script>
<style lang="scss"></style>
