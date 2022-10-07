<template>
    <div v-if="userData" class="userData">
        <h2 class="userData__title">
            {{ userData.firstName }} {{ userData.lastName }}
        </h2>
        <!-- <p>{{ userData.birthDate }}</p> -->
    </div>
</template>

<script>
import { db } from '../main';
export default {
    name: 'UserData',
    props: ['authUid'],
    data() {
        return {
            userData: null,
        };
    },
    mounted() {
        // db.collection(`users/`)
        //     .doc(this.authUid)
        //     .set(user)
        //     .then(() => {
        //         console.log('added to db');
        //         console.log(user);
        //     });
        db.collection('users/')
            .doc(this.authUid)
            .onSnapshot(doc => {
                this.userData = doc.data();
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
.userData {
    margin-top: 2rem;
    &__title {
        font-size: 3.2rem;
        font-weight: 600;
    }
}
</style>
