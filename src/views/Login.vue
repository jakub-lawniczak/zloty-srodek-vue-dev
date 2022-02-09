<template>
    <div class="login">
        <h2 class="login__title">Login</h2>
        <form class="login__form" @submit.prevent="login">
            <input
                class="login__input"
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                class="login__input"
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <Btn type="submit" text="Login" :full="true" />
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';
import Btn from '@/components/Btn';

export default {
    components: {
        Btn,
    },
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(auth => {
                    alert('Successfully logged in');
                    this.$store.commit('setAuth', auth);
                    this.$router.push('/panel');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.login {
    &__title {
        font-size: 2rem;
        margin: 2rem;
    }
    &__form {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        height: auto;
    }
    &__input,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        display: block;
        border: 0;
        outline: none;
        background-color: #f1f1f1;
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
        max-width: 80%;
        min-height: 100%;
        margin: 0 auto 1.6rem;
        border-radius: 0.8rem;

        @media (min-width: 1024px) {
            margin: 0 2rem 0 0;
        }
    }
}
</style>
