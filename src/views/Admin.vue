<template>
    <div>
        <ul class="usersList" v-if="userData && userData.admin">
            <li v-for="user in users" :key="user.uid" class="usersList__item">
                <router-link :to="'/user/' + user.uid">
                    {{ user.data.firstName }}
                    {{ user.data.lastName }}
                </router-link>
            </li>
        </ul>
        <div v-else>
            Nie masz uprawnień!
        </div>
    </div>
</template>
<script>
import { db } from '../main';
export default {
    data() {
        return {
            users: [],
            userData: null,
        };
    },
    mounted() {
        db.collection(`users`).onSnapshot(doc => {
            doc.docs.forEach(item => console.log(item.id));
            this.users = doc.docs.map(item => ({
                uid: item.id,
                data: item.data(),
            }));
        });
        db.collection(`users/${this.authUid}/private`)
            .doc('admin')
            .onSnapshot(doc => {
                this.userData = doc.data();
            });
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
    },
};
</script>
<style lang="scss">
.usersList {
    &__item {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        a {
            text-decoration: none;
        }
    }
}
</style>
