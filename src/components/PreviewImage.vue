<template>
    <div>
        <img :src="url" />
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    props: {
        path: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            url: null,
        };
    },
    watch: {
        path: {
            immediate: true,
            async handler() {
                const ref = firebase.storage().ref(`${this.path}`);
                this.url = await ref.getDownloadURL();
            },
        },
    },
};
</script>
<style lang=""></style>
