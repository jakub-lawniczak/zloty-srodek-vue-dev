<template>
    <div class="panel">
        <h2 class="panel__title">Raport</h2>
        <p class="panel__text">
            This page is your your raport
        </p>
        <UploadImg :authUid="authUid" />
        <Raport :authUid="authUid" />
    </div>
</template>

<script>
import UploadImg from '../components/UploadImg.vue';
import Raport from '../components/Raport.vue';
export default {
    name: 'Panel',
    components: {
        UploadImg,
        Raport,
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
    },
};
</script>

<style lang="scss" scoped></style>
