<template>
    <div id="nav" class="nav">
        <div class="logo">
            <img
                src="@/assets/icons/logo-white.svg"
                alt="logo"
                class="logo__icon"
            />
        </div>
        <router-link v-if="!ifAuth" to="/">Login</router-link>
        <router-link v-if="!ifAuth" to="/register">Register</router-link>
        <router-link v-if="ifAuth" to="/panel">Panel</router-link>
        <router-link v-if="ifAuth" to="/raport">Raport</router-link>
        <Btn
            v-if="ifAuth"
            @click.native="logout"
            text="Logout"
            :full="true"
            class="nav__logout"
        />
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
    align-items: center;
    padding: 0.5rem 2rem;
    background-color: #121212;

    a {
        font-size: 1.6rem;
        font-weight: 100;
        color: #ededed;
        text-decoration: none;
        margin: 0 1rem;
    }

    a.router-link-exact-active {
        color: #e67e22;
        font-weight: 700;
    }
    &__logout {
        margin-left: auto;
    }
}
.logo {
    width: 80px;
    height: unset;
    // &:hover {

    // }
}
</style>
