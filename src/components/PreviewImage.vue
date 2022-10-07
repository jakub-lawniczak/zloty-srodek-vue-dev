<template>
    <div class="previewImage">
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
<style lang="scss" scoped>
.previewImage {
    width: 40rem;
    @media screen and (max-width: 1024px) {
        width: calc(100% - 3.5rem);
    }
    img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>
