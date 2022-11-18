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
        <router-link
            v-if="ifAuth"
            to="/raport"
            :class="!needRaportCheck ? 'disabled' : 'needRaport'"
            >Raport</router-link
        >
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
import { db } from '../main';
export default {
    name: 'Nav',
    components: {
        Btn,
    },
    data() {
        return {
            userData: null,
        };
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
    mounted() {
        db.collection('users/')
            .doc(this.authUid)
            .onSnapshot(doc => {
                this.userData = doc.data();
            });
    },
    computed: {
        ifAuth() {
            return this.$store.getters.checkAuth;
        },
        authUid() {
            return this.$store.state.auth.user.uid;
        },
        needRaportCheck() {
            return this.userData?.needRaport;
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
.disabled {
    pointer-events: none;
    font-weight: 500;
    opacity: 0.5;
}
.needRaport {
    animation: pulse-animation 1s infinite;
}
@keyframes pulse-animation {
    0% {
        // text-shadow: 0 0 5px #121212, 0 0 25px #121212, 0 0 50px #121212,
        //     0 0 100px #121212;
    }
    // 25% {
    //     text-shadow: 0px 0px 0.25rem #e67e22, 0px 0px 1.25rem #e67e22,
    //         0px 0px 2.5rem #e67e22, 0 0 5rem #e67e22;
    //     font-weight: 600;
    //     letter-spacing: 0.025rem;
    //     // transform: scale(1.1);
    //     color: #e67e22;
    // }
    50% {
        // text-shadow: 0px 0px 5px #e67e22, 0px 0px 25px #e67e22,
        //     0px 0px 50px #e67e22, 0 0 100px #e67e22;
        // font-weight: 700;
        // letter-spacing: 0.05rem;
        transform: scale(1.1);
        color: #e67e22;
    }
    // 75% {
    //     text-shadow: 0px 0px 0.25rem #e67e22, 0px 0px 1.25rem #e67e22,
    //         0px 0px 2.5rem #e67e22, 0 0 5rem #e67e22;
    //     font-weight: 600;
    //     letter-spacing: 0.025rem;
    //     // transform: scale(1.1);
    //     color: #e67e22;
    // }

    100% {
        // text-shadow: 0 0 1rem #121212, 0 0 10rem #121212, 0 0 12.5rem #121212,
        //     0 0 15rem #121212;
    }
}
</style>
