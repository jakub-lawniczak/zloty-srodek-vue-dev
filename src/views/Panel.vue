<template>
    <div>
        <h2>Panel</h2>
        <p>This page is only visible to users that are currently logged in</p>
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
