<template>
    <div class="userData">
        {{ userData }}
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
            <button @click="needRaport">
                Need raport{{ userData.needRaport }}
            </button>
        </ul>
        <ul class="userData__raportList">
            <li
                class="userData__singleRaport"
                v-for="raport in userRaports"
                :key="raport.uid"
            >
                <p class="userData__raportDate" v-if="raport.data.date">
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
                    <li
                        v-if="
                            raport.data.changes &&
                                raport.data.changes.length > 0
                        "
                    >
                        Zmiany: {{ raport.data.changes }}
                    </li>
                    <li>
                        <ul class="userData__sublist">
                            <li class="userData__sublistItem">
                                <PreviewImage
                                    :path="
                                        `/${authUid}/raports/${raport.uid}/front/${raport.data.frontFileName}`
                                    "
                                    v-if="raport.data.frontFileName"
                                />
                                <label class="userData__label" for="front"
                                    >Front</label
                                >
                            </li>
                            <li class="userData__sublistItem">
                                <PreviewImage
                                    :path="
                                        `/${authUid}/raports/${raport.uid}/back/${raport.data.backFileName}`
                                    "
                                    v-if="raport.data.backFileName"
                                />
                                <label class="userData__label" for="back"
                                    >Back</label
                                >
                            </li>
                            <li class="userData__sublistItem">
                                <PreviewImage
                                    :path="
                                        `/${authUid}/raports/${raport.uid}/side/${raport.data.sideFileName}`
                                    "
                                    v-if="raport.data.sideFileName"
                                />
                                <label class="userData__label" for="side"
                                    >Side</label
                                >
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
import { db } from '../../main';

import PreviewImage from '@/components/PreviewImage.vue';
export default {
    name: 'User',
    components: {
        PreviewImage,
    },
    data() {
        return {
            userData: null,
            userRaports: [],
        };
    },
    methods: {
        dateFormat(d) {
            var raportDate = new Date(d * 1000);
            raportDate = raportDate.toLocaleDateString('pl-US');
            return raportDate;
        },
        needRaport() {
            db.collection(`users/`)
                .doc(this.$route.params.id)
                .set({
                    ...this.userData,
                    needRaport: !this.userData.needRaport,
                });
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
                console.log(this.userRaports);
            }
        );
    },
    firestore() {
        return {
            users: db.collection('users'),
        };
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
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
        background-color: rgba(#e67e22, 0.5);
        border-radius: 0.5rem;
        padding: 1rem;
        margin-top: 1rem;
    }
    &__raportDate {
        font-weight: 700;
    }
    &__sublist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-top: 1rem;
    }
    &__sublistItem {
        text-align: center;
    }
    &__label {
        display: block;
        margin-top: 0.5rem;
    }
}
</style>
