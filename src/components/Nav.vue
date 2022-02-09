<template>
    <div id="nav" class="nav">
        <router-link v-if="!ifAuth" to="/">Login</router-link>
        <router-link v-if="!ifAuth" to="/register">Register</router-link>
        <router-link v-if="ifAuth" to="/panel">Panel</router-link>
        <router-link v-if="ifAuth" to="/raport">Raport</router-link>
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
<style lang="scss" scoped>
.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px;
    a {
        font-size: 1.6rem;
        font-weight: bold;
        color: #2c3e50;
        text-decoration: none;
        margin: 0 1rem;
    }

    a.router-link-exact-active {
        color: #ffba15;
    }
}
</style>
