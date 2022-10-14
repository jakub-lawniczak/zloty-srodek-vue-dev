<template>
    <div class="panel">
        <h2 class="panel__title">Panel</h2>
        <!-- <p class="panel__text">
            This page is your panel
        </p> -->
        <UserData v-if="authUid" :authUid="authUid" />

        <UserRaports v-if="authUid" :authUid="authUid" />
    </div>
</template>

<script>
import UserData from '../components/UserData.vue';
import UserRaports from '../components/UserRaports';
export default {
    name: 'Panel',
    components: {
        UserData,
        UserRaports,
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
    },
};
</script>

<style lang="scss" scoped>
.panel {
    text-align: center;
    &__title {
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.4;
    }
    &__text {
        font-size: 1.6rem;
    }
}
</style>
