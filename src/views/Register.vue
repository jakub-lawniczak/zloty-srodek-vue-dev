<template>
    <div class="register">
        <h2 class="register__title">Register</h2>
        <ValidationObserver v-slot="{ handleSubmit }">
            <form
                class="register__form"
                @submit.prevent="handleSubmit(register)"
            >
                <ul class="register__inputList">
                    <li class="register__listItem">
                        <label class="register__label" for="fullName"
                            >Imię</label
                        >
                        <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                            name="Imię"
                        >
                            <input
                                class="register__input"
                                type="text"
                                placeholder="Imię"
                                v-model="firstName"
                                id="fullName"
                                :class="
                                    errors[0] ? 'register__input--error' : ''
                                "
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>

                    <li class="register__listItem">
                        <label class="register__label" for="lastName"
                            >Nazwisko</label
                        >

                        <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                            name="Nazwisko"
                        >
                            <input
                                class="register__input"
                                type="text"
                                placeholder="Nazwisko"
                                v-model="lastName"
                                id="lastName"
                                :class="
                                    errors[0] ? 'register__input--error' : ''
                                "
                            />

                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <li class="register__listItem">
                        <label class="register__label" for="birthDate"
                            >Data urodzenia</label
                        >
                        <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                            name="Data urodzenia"
                        >
                            <input
                                class="register__input"
                                type="date"
                                placeholder="data urodzenia"
                                v-model="birthDate"
                                id="birthDate"
                                :class="
                                    errors[0] ? 'register__input--error' : ''
                                "
                            />

                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <li class="register__listItem">
                        <label class="register__label" for="email"
                            >Adres e-mail</label
                        >
                        <ValidationProvider
                            rules="required|email"
                            v-slot="{ errors }"
                            name="E-mail"
                        >
                            <input
                                class="register__input"
                                type="email"
                                placeholder="Email address..."
                                v-model="email"
                                :class="
                                    errors[0] ? 'register__input--error' : ''
                                "
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <li class="register__listItem">
                        <label class="register__label" for="email">Hasło</label>

                        <ValidationProvider
                            rules="required"
                            v-slot="{ errors }"
                            name="Hasło"
                        >
                            <input
                                class="register__input"
                                type="password"
                                placeholder="Create your password"
                                v-model="password"
                                :class="
                                    errors[0] ? 'register__input--error' : ''
                                "
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                </ul>
                <Btn
                    type="submit"
                    text="Register"
                    class="x-center"
                    :full="true"
                />
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import { db } from '../main';
import firebase from 'firebase';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Btn from '@/components/Btn';

var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'http://localhost:8080/confirmation',
    // This must be true.
    handleCodeInApp: true,
    // dynamicLinkDomain: 'example.page.link',
};

export default {
    name: 'Register',
    components: {
        Btn,
        ValidationProvider,
        ValidationObserver,
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
                            email: this.email,
                            admin: false,
                        })
                        .then(() => {
                            firebase
                                .auth()
                                .sendSignInLinkToEmail(
                                    this.email,
                                    actionCodeSettings
                                )
                                .then(() => {
                                    // The link was successfully sent. Inform the user.
                                    // Save the email locally so you don't need to ask the user for it again
                                    // if they open the link on the same device.
                                    window.localStorage.setItem(
                                        'emailForSignIn',
                                        this.email
                                    );
                                    // ...
                                    console.log('email send to ' + this.email);
                                })
                                .catch(error => {
                                    console.log(error);
                                });
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
    &__input {
        width: 100%;
        margin: 0;
        &--error {
            border: 1px solid red;
        }
    }
    .x-center {
        display: block;
        margin: 2rem auto 0;
    }
    .error {
        font-size: 1rem;
        font-weight: 300;
        color: red;
        text-align: right;
    }
}
</style>
