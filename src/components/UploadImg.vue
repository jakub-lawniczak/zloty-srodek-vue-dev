<template>
    <div>
        <div>
            <p>Upload your image:</p>
            <input type="file" @change="previewImage" accept="image" />
        </div>
        <div>
            <p>
                Progress: {{ uploadValue.toFixed() + '%' }}
                <progress :value="uploadValue" max="100"></progress>
            </p>
        </div>
        <div>
            <img class="preview" :src="picture" />
            <br />
            <button @click="onUpload">Upload</button>
        </div>
    </div>
</template>
<script>
import firebase from 'firebase';
export default {
    name: 'UploadImg',
    // props: ['authUid'],
    data() {
        return {
            imageData: null,
            picture: null,
            uploadValue: 0,
        };
    },
    computed: {
        authUid() {
            return this.$store.state.auth.user.uid;
        },
    },
    methods: {
        previewImage(event) {
            this.uploadValue = 0;
            this.picture = null;
            this.imageData = event.target.files[0];
        },
        onUpload() {
            this.picture = null;
            const storageRef = firebase
                .storage()
                .ref(`${this.authUid}/${this.imageData.name}`)
                .put(this.imageData);
            storageRef.on(
                `state_changed`,
                snapshot => {
                    this.uploadValue =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                error => {
                    console.log(error.message);
                },
                storageRef.snapshot.ref.getDownloadURL().then(url => {
                    this.picture = url;
                })
            );
        },
    },
};
</script>
<style scoped>
img.preview {
    width: 200px;
}
</style>
