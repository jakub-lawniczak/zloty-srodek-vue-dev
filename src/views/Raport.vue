<template>
    <div class="raport">
        <h2 class="raport__title">Raport</h2>
        <FormRaport :authUid="authUid" />
    </div>
</template>

<script>
import FormRaport from '../components/FormRaport.vue';
// import firebase from 'firebase';
export default {
    name: 'Raport',
    components: {
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
        margin-bottom: 5rem;
        text-align: center;
    }
}
</style>
