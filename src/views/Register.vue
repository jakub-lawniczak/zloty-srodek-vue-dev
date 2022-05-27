<template>
    <div class="register">
        <h2 class="register__title">Register</h2>
        <form class="register__form" @submit.prevent="register">
            <ul>
                <li class="raport__listItem">
                    <label class="raport__label" for="fullName">Imię</label>
                    <input
                        class="raport__input"
                        type="text"
                        placeholder="Imię"
                        v-model="firstName"
                        id="fullName"
                    />
                </li>

                <li class="raport__listItem">
                    <label class="raport__label" for="lastName">Nazwisko</label>
                    <input
                        class="raport__input"
                        type="text"
                        placeholder="Nazwisko"
                        v-model="lastName"
                        id="lastName"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="birthDate">Wiek</label>
                    <input
                        class="raport__input"
                        type="date"
                        placeholder="data urodzenia"
                        v-model="birthDate"
                        id="birthDate"
                    />
                </li>
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
            </ul>
            <Btn type="submit" text="Register" :full="true" />
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
                            this.$router.push('/first-raport');
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
