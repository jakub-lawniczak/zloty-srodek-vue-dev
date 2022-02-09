<template>
    <div class="register">
        <h2 class="register__title">Register</h2>
        <form class="register__form" @submit.prevent="register">
            <input
                class="register__input"
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                class="register__input"
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <Btn type="submit" text="Register" :full="true" />
        </form>
    </div>
</template>
<script>
import firebase from 'firebase';
import Btn from '@/components/Btn';

export default {
    name: 'Register',
    components: {
        Btn,
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/first-raport');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.register {
    &__title {
        font-size: 2rem;
        line-height: 6rem;
        text-align: center;
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
        padding: 0.75rem 1.5rem;
        font-size: 1.8rem;
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
