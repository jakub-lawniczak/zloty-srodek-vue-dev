<template>
    <div class="raport">
        <h3 v-if="!userRaports.length" class="raport__noRaport">
            Aby zobaczyć swoje wymiary musisz uzepełnić swoje dane w raporcie
            <router-link to="/raport" class="raport__link">
                <Btn text="Raport" :full="false"
            /></router-link>
        </h3>

        <Btn v-if="ifAuth" text="Logout" :full="true" />
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
import Btn from '@/components/Btn';
export default {
    name: 'UserData',
    props: ['authUid'],
    components: { UserRaportList, Btn },
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

<style lang="scss" scoped>
.raport {
    margin-top: 3rem;
    &__noRaport {
        font-size: 2rem;
        color: red;
        line-height: 1.2;
    }
    &__link {
        display: block;
        margin-top: 1rem;
        text-decoration: none;
        font-weight: 600;
    }
}
</style>
