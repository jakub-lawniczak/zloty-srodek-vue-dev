<template>
    <div>
        <ul class="usersList">
            <li v-for="user in users" :key="user.uid" class="usersList__item">
                <router-link :to="'/user/:id'">
                    {{ user.data.firstName }}
                    {{ user.data.lastName }}
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { db } from '../main';
export default {
    data() {
        return {
            users: [],
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
