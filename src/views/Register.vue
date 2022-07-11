<template>
    <div class="register">
        <h2 class="register__title">Register</h2>
        <form class="register__form" @submit.prevent="register">
            <ul class="register__inputList">
                <li class="register__listItem">
                    <label class="register__label" for="fullName">Imię</label>
                    <input
                        class="register__input"
                        type="text"
                        placeholder="Imię"
                        v-model="firstName"
                        id="fullName"
                    />
                </li>

                <li class="register__listItem">
                    <label class="register__label" for="lastName"
                        >Nazwisko</label
                    >
                    <input
                        class="register__input"
                        type="text"
                        placeholder="Nazwisko"
                        v-model="lastName"
                        id="lastName"
                    />
                </li>
                <li class="register__listItem">
                    <label class="register__label" for="birthDate"
                        >Data urodzenia</label
                    >
                    <input
                        class="register__input"
                        type="date"
                        placeholder="data urodzenia"
                        v-model="birthDate"
                        id="birthDate"
                    />
                </li>
                <li class="register__listItem">
                    <label class="register__label" for="email"
                        >Adres e-mail</label
                    >
                    <input
                        class="register__input"
                        type="email"
                        placeholder="Email address..."
                        v-model="email"
                    />
                </li>
                <li class="register__listItem">
                    <label class="register__label" for="email"
                        >Hasło</label
                    >
                    <input
                        class="register__input"
                        type="password"
                        placeholder="Create your password"
                        v-model="password"
                    />
                </li>
            </ul>
            <Btn type="submit" text="Register" class="x-center" :full="true" />
        </form>
    </div>
</template>
<script>
import { db } from '../main';
import firebase from 'firebase';
import Btn from '@/components/Btn';

export default {
    name: 'Register',
    components: {
        Btn,
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            birthDate: '',
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)

                .then(data => {
                    console.log(this.authUid, data.user.uid);
                    db.collection(`users/`)
                        .doc(data.user.uid)
                        .set({
                            firstName: this.firstName,
                            lastName: this.lastName,
                            birthDate: this.birthDate,
                        })
                        .then(() => {
                            this.$router.push('/first-register');
                            console.log('added to db');
                        });
                    alert('Successfully registered! Please login.');
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
        margin: 2rem;
        margin-bottom: 5rem;
        text-align: center;
    }
    &__form {
        display: block;
        width: 40%;
        align-items: center;
        flex-direction: column;
        margin: 0 auto;
        @media screen and (max-width: 1024px) {
            width: 80%;
        }
    }
    &__inputList {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: auto;
        width: 100%;
    }
    &__listItem {
        width: 100%;
        margin-bottom: 1rem;
    }
    &__label {
        display: inline-block;
        font-size: 1.2rem;
        margin-bottom: 0.45rem;
    }
    &__input {
        width: 100%;
        margin: 0;
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
        min-height: 100%;
        margin: 0 auto 1.6rem;
        border-radius: 0.8rem;
    }
    .x-center {
        display: block;
        margin: 2rem auto 0;
    }
}
</style>
