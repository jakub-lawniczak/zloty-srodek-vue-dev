<template>
    <div class="raport">
        <form class="raport__form" @submit.prevent="registerUserData">
            <ul class="raport__list">
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
                    <label class="raport__label" for="age">Wiek</label>
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="wiek"
                        v-model="age"
                        id="age"
                    />
                </li>
                <p class="raport__subtitle">Pomiary</p>
                <li class="raport__listItem">
                    <label class="raport__label" for="weight">Waga</label>
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="waga"
                        v-model="weight"
                        id="weight"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="height">Wzrost</label>
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="wzrost"
                        v-model="height"
                        id="height"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="waist">Talia</label>
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="talia"
                        v-model="waist"
                        id="waist"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="chest"
                        >Klatka piersiowa</label
                    >
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="klatka piersiowa"
                        v-model="chest"
                        id="chest"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="thigh">Udo</label>
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="udo"
                        v-model="thigh"
                        id="thigh"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="biceps">Biceps</label>
                    <input
                        class="raport__input"
                        type="numeric"
                        placeholder="biceps"
                        v-model="biceps"
                        id="biceps"
                    />
                </li>
                <li class="raport__listItem"></li>
                <li class="raport__listItem"></li>
                <li class="raport__listItem"></li>
            </ul>
            <Btn type="submit" text="Add your data" :full="true" />
        </form>
        <!-- {{ authUid }}
        <div>
            <p>Data for admin:</p>
            <div v-for="singleUser in users" :key="singleUser.firstName">
                <pre>{{ singleUser }}</pre>
            </div>
        </div> -->
    </div>
</template>
<script>
import { db } from '../main';
import Btn from '@/components/Btn';
// import firebase from 'firebase';

export default {
    name: 'FormRaport',
    props: ['authUid'],
    components: {
        Btn,
    },
    data() {
        return {
            users: [],
            firstName: '',
            lastName: '',
            age: '',
            weight: '',
            height: '',
            waist: '',
            chest: '',
            thigh: '',
            biceps: '',
        };
    },
    methods: {
        registerUserData() {
            const user = {
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.age,
                weight: this.weight,
                height: this.height,
                waist: this.waist,
                chest: this.chest,
                thigh: this.thigh,
                biceps: this.biceps,
                userId: this.authUid,
            };
            db.collection(`users/`)
                .doc(this.authUid)
                .set(user)
                .then(() => {
                    console.log('added to db');
                    console.log(user);
                });
        },
    },
    firestore() {
        return {
            users: db.collection('users'),
        };
    },
};
</script>
<style lang="scss" scoped>
.raport {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__form {
        width: 80%;
        max-width: 600px;
    }
    &__subtitle {
        font-size: 1.4rem;
        font-weight: 700;
        border-bottom: 1px solid #010101;
        margin-bottom: 20px;
    }
    &__listItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    &__label {
        font-size: 1rem;
        width: 40%;
        text-align: left;
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
        font-size: 1rem;
        width: 55%;
        min-height: 100%;
        margin: 0 auto 1.6rem;
        border-radius: 0.8rem;

        @media (min-width: 1024px) {
            margin: 0;
        }
    }
}
</style>
