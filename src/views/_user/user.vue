<template>
    <div>
        <ul v-if="userData">
            <li>
                <h2>{{ userData.firstName }} {{ userData.lastName }}</h2>
            </li>
            <li>
                <p>{{ userData.birthDate }}</p>
            </li>
            <li>
                <p>{{ userData.email }}</p>
            </li>
            <template v-if="userRaports.length">
                <li>cel: {{ userRaports[0].data.goal }}</li>
                <li>
                    częstotliwość treningów: {{ userRaports[0].data.quantity }}
                </li>
                <li>czas treningu: {{ userRaports[0].data.workoutTime }}</li>
            </template>
            <li></li>
        </ul>
        <hr />
        <ul>
            <li v-for="raport in userRaports" :key="raport.uid">
                {{ raport.uid }} -
                {{ dateFormat(raport.data.date.seconds) }}
            </li>
        </ul>
        <pre>{{ userRaports }}</pre>
    </div>
</template>
<script>
import { db } from '../../main';
export default {
    name: 'User',
    data() {
        return {
            userData: null,
            userRaports: [],
        };
    },
    methods: {
        dateFormat(d) {
            var raportDate = new Date(d * 1000);
            // raportDate = raportDate.substring(4, 15);
            // raportDate.toString('');
            return raportDate;
        },
    },
    mounted() {
        db.collection('users/')
            .doc(this.$route.params.id)
            .onSnapshot(doc => {
                this.userData = doc.data();
            });

        db.collection(`users/${this.$route.params.id}/raports`).onSnapshot(
            doc => {
                doc.docs.forEach(item => console.log(item.id));
                this.userRaports = doc.docs.map(item => ({
                    uid: item.id,
                    data: item.data(),
                }));
            }
        );
    },
    firestore() {
        return {
            users: db.collection('users'),
        };
    },
};
</script>
<style lang=""></style>
