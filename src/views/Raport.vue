<template>
    <div class="raport">
        <h2 class="raport__title">Raport</h2>

        <!-- <UploadImg :authUid="authUid" /> -->
        <FormRaport :authUid="authUid" />
    </div>
</template>

<script>
// import UploadImg from '../components/UploadImg.vue';
import FormRaport from '../components/FormRaport.vue';
export default {
    name: 'Raport',
    components: {
        // UploadImg,
        FormRaport,
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
    },
};
</script>

<style lang="scss" scoped>
.raport {
    &__title {
        font-size: 2rem;
        margin: 2rem;
        text-align: center;
    }
}
</style>
