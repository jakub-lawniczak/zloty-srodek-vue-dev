<template>
    <div>
        Dzięujemy za rejestracje i potwierdzenie maila. Mozesz dodać
        <router-link to="/raport" class="raport__link">
            swój pierwszy raport</router-link
        >
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    mounted() {
        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            // Additional state parameters can also be passed via URL.
            // This can be used to continue the user's intended action before triggering
            // the sign-in operation.
            // Get the email if available. This should be available if the user completes
            // the flow on the same device where they started it.
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again. For example:
                email = window.prompt(
                    'Please provide your email for confirmation'
                );
            }
            // The client SDK will parse the code from the link for you.
            firebase
                .auth()
                .signInWithEmailLink(email, window.location.href)
                .then(result => {
                    // Clear email from storage.
                    window.localStorage.removeItem('emailForSignIn');
                    // You can access the new user via result.user
                    // Additional user info profile not available via:
                    // result.additionalUserInfo.profile == null
                    // You can check if the user is new or existing:
                    // result.additionalUserInfo.isNewUser
                    console.log(result);
                })
                .catch(error => {
                    // Some error occurred, you can inspect the code: error.code
                    // Common errors could be invalid email and invalid or expired OTPs.
                    console.log(error);
                });
        }
    },
};
</script>
<style></style>
