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
        // UploadImg,
        FormRaport,
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
    },
    // mounted() {
    //     console.log(firebase.auth().currentUser);
    //     var actionCodeSettings = {
    //         url: 'http://localhost?email=' + firebase.auth().currentUser.email,
    // iOS: {
    //     bundleId: 'com.example.ios',
    // },
    // android: {
    //     packageName: 'com.example.android',
    //     installApp: true,
    //     minimumVersion: '12',
    // },
    // handleCodeInApp: true,
    // When multiple custom dynamic link domains are defined, specify which
    // one to use.
    //         dynamicLinkDomain: 'localhost',
    //     };
    //     firebase
    //         .auth()
    //         .currentUser.sendEmailVerification(actionCodeSettings)
    //         .then(function() {
    //             // Verification email sent.
    //             console.log('ok');
    //         })
    //         .catch(function(error) {
    //             // Error occurred. Inspect error.code.
    //             console.log(error);
    //         });
    // },
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
