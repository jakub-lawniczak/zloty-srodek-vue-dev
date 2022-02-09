<template>
    <div>
        <form @submit.prevent="login">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email address..."
                v-model="email"
            />
            <input
                type="password"
                placeholder="password..."
                v-model="password"
            />
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(auth => {
                    alert('Successfully logged in');
                    this.$store.commit('setAuth', auth);
                    this.$router.push('/panel');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
