<template>
    <div>
        <input
            class="raport__input"
            type="file"
            placeholder="front"
            @change="$emit('change', $event.target.files[0])"
            id="front"
        />
        <div class="raport__UploadIcon" v-if="!fileName">
            <UploadIcon />
        </div>
        <span v-else>{{ fileName }}</span>
    </div>
</template>
<script>
// import firebase from 'firebase';

import UploadIcon from '@/components/UploadIcon';
export default {
    name: 'UploadImg',
    components: {
        UploadIcon,
    },
    props: ['fileName', 'userUid'],
    data() {
        return {
            uploadValue: 0,
        };
    },
    // computed: {
    //     authUid() {
    //         return this.$store.state.auth.user.uid;
    //     },
    // },
    // methods: {
    //     onUpload() {
    //         const storageRef = firebase
    //             .storage()
    //             .ref(`${this.authUid}/${this.imageData.name}`)
    //             .put(this.imageData);
    //         storageRef.on(
    //             `state_changed`,
    //             snapshot => {
    //                 this.uploadValue =
    //                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //             },
    //             error => {
    //                 console.log(error.message);
    //             }
    //             // storageRef.snapshot.ref.getDownloadURL().then(url => {
    //             //     this.picture = url;
    //             // })
    //         );
    //     },
    // },
};
</script>
<style lang="scss" scoped>
.raport {
    &__input,
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        display: block;
        border: 0;
        outline: none;
        background-color: #f1f1f1;
        padding: 0.5rem 1rem;
        font-size: 1.4rem;
        text-align: right;
        font-weight: 700;
        width: 65%;
        min-height: 100%;
        margin: 0 0 1.6rem;
        border-radius: 0.8rem;
        position: relative;
        z-index: 2;

        @media (min-width: 1024px) {
            margin: 0;
        }
        [type='file'] {
            height: 100%;
            overflow: hidden;
            width: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }
    &__UploadIcon {
        position: absolute;
        top: 40%;
        left: 50%;
        width: 2rem;
        height: 1rem;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
}
</style>
