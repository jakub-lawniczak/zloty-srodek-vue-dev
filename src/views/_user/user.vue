<template>
    <div class="userData">
        <ul v-if="userData" class="userData__mainList">
            <li class="userData__mainListItem">
                <h2>{{ userData.firstName }} {{ userData.lastName }}</h2>
            </li>
            <li class="userData__mainListItem">
                <p>{{ userData.birthDate }}</p>
            </li>
            <li class="userData__mainListItem">
                <p>{{ userData.email }}</p>
            </li>
            <template v-if="userRaports.length">
                <li class="userData__mainListItem">
                    cel: {{ userRaports[0].data.goal }}
                </li>
                <li class="userData__mainListItem">
                    częstotliwość treningów: {{ userRaports[0].data.quantity }}
                </li>
                <li class="userData__mainListItem">
                    czas treningu: {{ userRaports[0].data.workoutTime }}
                </li>
            </template>
        </ul>
        <ul class="userData__raportList">
            <li
                class="userData__singleRaport"
                v-for="raport in userRaports"
                :key="raport.uid"
            >
                <p class="userData__raportDate">
                    Raport z dnia:
                    {{ dateFormat(raport.data.date.seconds) }}
                </p>
                <ul>
                    <li>Waga: {{ raport.data.weight }}</li>
                    <li>Wzrost: {{ raport.data.height }}</li>
                    <li>Talia: {{ raport.data.weist }}</li>
                    <li>Klatka piersiowa: {{ raport.data.chest }}</li>
                    <li>Udo: {{ raport.data.thigh }}</li>
                    <li>Biceps: {{ raport.data.biceps }}</li>
                    <li v-if="raport.data.changes.length > 0">
                        Zmiany: {{ raport.data.changes }}
                    </li>
                </ul>
            </li>
        </ul>
        <!-- <pre>{{ userRaports }}</pre> -->
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
            raportDate = raportDate.toLocaleDateString('pl-US');
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
<style lang="scss">
.userData {
    font-size: 2rem;
    &__mainList {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__mainListItem {
        margin-bottom: 0.5rem;
    }
    &__singleRaport {
        background-color: #dedede;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-top: 1rem;
    }
    &__raportDate {
        font-weight: 700;
    }
}
</style>
