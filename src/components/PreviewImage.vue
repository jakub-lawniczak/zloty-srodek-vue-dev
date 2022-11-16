<template>
    <div class="previewImage">
        <CoolLightBox
            :items="items"
            :index="index"
            @close="index = null"
            :closeOnClickOutsideMobile="true"
            :enableScrollLock="true"
            :loop="false"
            :slideshow="false"
        >
        </CoolLightBox>

        <div class="images-wrapper">
            <div
                class="image"
                v-for="(image, imageIndex) in items"
                :key="imageIndex"
                @click="index = imageIndex"
                :style="{ backgroundImage: 'url(' + image + ')' }"
            ></div>
        </div>
        <!-- index: {{ index }} items: {{ items }} -->
    </div>
</template>
<script>
import firebase from 'firebase';
import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';

export default {
    props: {
        path: {
            type: String,
            required: true,
        },
    },
    components: {
        CoolLightBox,
    },
    data() {
        return {
            url: '',
            index: null,
            customIndex: 0,
            items: [],
        };
    },
    watch: {
        path: {
            immediate: true,
            async handler() {
                const ref = firebase.storage().ref(`${this.path}`);
                this.url = await ref.getDownloadURL();
                this.items.push(this.url);
            },
        },
    },
};
</script>
<style lang="scss" scoped>
.previewImage {
    width: 20rem;
    height: 30rem;
    @media screen and (max-width: 1024px) {
        width: 15rem;
        height: 20rem;
    }
    .images-wrapper {
        width: 100%;
        height: 100%;
    }
    .image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
