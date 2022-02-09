<template>
    <div>
        <form @submit.prevent="register">
            <!-- <h2>Register</h2> -->
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
            <Btn type="submit" text="Register" :full="true" />
        </form>
    </div>
</template>
<script>
import firebase from 'firebase';
import Btn from '@/components/Btn';

export default {
    name: 'Register',
    components: {
        Btn,
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert('Successfully registered! Please login.');
                    this.$router.push('/');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>
