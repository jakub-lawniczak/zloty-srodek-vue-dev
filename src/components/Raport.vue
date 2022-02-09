<template>
    <div>
        <form @submit.prevent="registerUserData">
            <label for="fullName">Imię</label>
            <input
                type="text"
                placeholder="Imię"
                v-model="firstName"
                id="fullName"
            />
            <input type="text" placeholder="Nazwisko" v-model="lastName" />
            <input type="numeric" placeholder="wiek" v-model="age" />
            <input type="numeric" placeholder="waga" v-model="weight" />
            <input type="numeric" placeholder="wzrost" v-model="height" />
            <button type="submit">Add your data</button>
        </form>
        {{ authUid }}
        <div>
            <p>Data for admin:</p>
            <div v-for="singleUser in users" :key="singleUser.firstName">
                <pre>{{ singleUser }}</pre>
            </div>
        </div>
    </div>
</template>
<script>
import { db } from '../main';
// import firebase from 'firebase';

export default {
    name: 'Raport',
    props: ['authUid'],
    data() {
        return {
            users: [],
            firstName: '',
            lastName: '',
            age: '',
            weight: '',
            height: '',
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
