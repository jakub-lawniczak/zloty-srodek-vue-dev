<template>
    <div class="raport">
        <form class="raport__form" @submit.prevent="registerUserData">
            <ul class="raport__list">
                <p class="raport__subtitle">Pomiary</p>
                <li class="raport__listItem">
                    <label class="raport__label" for="weight">Waga</label>
                    <input
                        class="raport__input"
                        type="number"
                        placeholder="waga"
                        v-model="weight"
                        id="weight"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="height">Wzrost</label>
                    <input
                        class="raport__input"
                        type="number"
                        placeholder="wzrost"
                        v-model="height"
                        id="height"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="waist">Talia</label>
                    <input
                        class="raport__input"
                        type="number"
                        placeholder="talia"
                        v-model="waist"
                        id="waist"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="chest"
                        >Klatka piersiowa</label
                    >
                    <input
                        class="raport__input"
                        type="number"
                        placeholder="klatka piersiowa"
                        v-model="chest"
                        id="chest"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="thigh">Udo</label>
                    <input
                        class="raport__input"
                        type="number"
                        placeholder="udo"
                        v-model="thigh"
                        id="thigh"
                    />
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="biceps">Biceps</label>
                    <input
                        class="raport__input"
                        type="number"
                        placeholder="biceps"
                        v-model="biceps"
                        id="biceps"
                    />
                </li>
                <p class="raport__subtitle">Zdjęcia</p>

                <li class="raport__listItem">
                    <label class="raport__label" for="front">Front</label>
                    <p class="raport__input">
                        <UploadImg v-if="false" />
                        <input
                            class="raport__input"
                            type="file"
                            placeholder="front"
                            @change="file.push($event.target.files[0])"
                            id="front"
                        />
                    </p>
                    <pre>{{file}}</pre>
                </li>
                <!-- <li class="raport__listItem">
                    <label class="raport__label" for="side">Side</label>
                    <p class="raport__input">
                        <UploadImg v-if="false" />
                        <input
                            class="raport__input"
                            type="file"
                            placeholder="side"
                            @change="file[1] = $event.target.files[0]"
                            id="side"
                        />
                    </p>
                </li>

                <li class="raport__listItem">
                    <label class="raport__label" for="back">Back</label>
                    <p class="raport__input">
                        <UploadImg v-if="false" />
                        <input
                            class="raport__input"
                            type="file"
                            placeholder="back"
                            @change="file[2] = $event.target.files[0]"
                            id="back"
                        />
                    </p>
                </li> -->
            </ul>
            <Btn type="submit" text="Add your data" :full="true" />
        </form>
        <!-- {{ authUid }}
        <div>
            <p>Data for admin:</p>
            <div v-for="singleUser in users" :key="singleUser.firstName">
                <pre>{{ singleUser }}</pre>
            </div>
        </div> -->
    </div>
</template>
<script>
import { db } from '../main';
import firebase from 'firebase';
import Btn from '@/components/Btn';
// import UploadImg from '@/components/UploadImg';

export default {
    name: 'FormRaport',
    props: ['authUid'],
    components: {
        Btn,
        // UploadImg,
    },
    data() {
        return {
            users: [],
            weight: null,
            height: '',
            waist: '',
            chest: '',
            thigh: '',
            biceps: '',
            file: [],
        };
    },
    methods: {
        registerUserData() {
            const userRaport = {
                weight: this.weight,
                height: this.height,
                waist: this.waist,
                chest: this.chest,
                thigh: this.thigh,
                biceps: this.biceps,
            };

            db.collection(`users/${this.authUid}/raports`)
                .add(userRaport)
                .then(data => {
                    firebase
                        .storage()
                        .ref(`${this.authUid}/${data.id}/${this.file.name}`)
                        .put(this.file);
                });
        },
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
    firestore() {
        return {
            users: db.collection('users'),
        };
    },
};
</script>
<style lang="scss" scoped>
.raport {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__form {
        width: 80%;
        max-width: 600px;
    }
    &__subtitle {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 20px;
        position: relative;
        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 8rem;
            right: 0;
            height: 0.01rem;
            background-color: #010101;
            transform: translateY(-50%);
        }
    }
    &__listItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    &__label {
        font-size: 1.4rem;
        width: 40%;
        text-align: left;
    }
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
        width: 55%;
        min-height: 100%;
        margin: 0 auto 1.6rem;
        border-radius: 0.8rem;

        @media (min-width: 1024px) {
            margin: 0;
        }
    }
}
</style>
