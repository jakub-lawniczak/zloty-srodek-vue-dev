<template>
    <div class="raport">
        <pre>{{ userRaports }}</pre>
        <UserRaportList
            v-if="userRaports.length > 1"
            :userData="userRaports[userRaports.length - 1].data"
            :authUid="authUid"
            :raportUid="userRaports[userRaports.length - 1].uid"
        />
        <UserRaportList
            v-if="userRaports.length"
            :userData="userRaports[0].data"
            :authUid="authUid"
            :raportUid="userRaports[0].uid"
        />
    </div>
</template>

<script>
import { db } from '../main';
import UserRaportList from '@/components/UserRaportList.vue';
export default {
    name: 'UserData',
    props: ['authUid'],
    components: { UserRaportList },
    data() {
        return {
            userData: null,
            userRaports: [],
        };
    },
    mounted() {
        db.collection(`users/${this.authUid}/raports`).onSnapshot(doc => {
            doc.docs.forEach(item => console.log(item.id));
            this.userRaports = doc.docs.map(item => ({
                uid: item.id,
                data: item.data(),
            }));
        });
    },
    firestore() {
        return {
            users: db.collection('users'),
        };
    },
};
</script>

<style lang="scss" scoped></style>
