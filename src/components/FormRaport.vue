<template>
    <div class="raport">
        <p class="raport__hint">
            Nie wiesz jak sie mierzyć?<br />
            <a
                href="https://www.youtube.com/watch?v=OXA9GPgjuGI&ab_channel=TrenerMariuszMr%C3%B3z"
                target="_blank"
                >Sprawdź</a
            >
        </p>
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
                    <label class="raport__label" for="chest">Klatka</label>
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
                    <div class="raport__input">
                        <UploadImg v-if="false" />
                        <input
                            class="raport__input"
                            type="file"
                            placeholder="front"
                            @change="files.front = $event.target.files[0]"
                            id="front"
                        />
                        <div class="raport__UploadIcon">
                            <UploadIcon />
                        </div>
                        <span>{{ files.front }}</span>
                    </div>
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="back">Back</label>
                    <div class="raport__input">
                        <UploadImg v-if="false" />
                        <input
                            class="raport__input"
                            type="file"
                            placeholder="back"
                            @change="files.back = $event.target.files[0]"
                            id="back"
                        />
                        <div class="raport__UploadIcon">
                            <UploadIcon />
                        </div>
                        <span v-if="files.back">{{ files.back }}</span>
                    </div>
                </li>
                <li class="raport__listItem">
                    <label class="raport__label" for="side">Side</label>
                    <div class="raport__input">
                        <UploadImg v-if="false" />
                        <input
                            class="raport__input"
                            type="file"
                            placeholder="side"
                            @change="files.side = $event.target.files[0]"
                            id="side"
                        />
                        <div class="raport__UploadIcon">
                            <UploadIcon />
                        </div>
                        <!-- <span v-if="files.side.name"
                            ><pre>{{ files.side.name }}</pre></span
                        > -->
                    </div>
                </li>
                <p class="raport__subtitle" v-if="userRaports.length === 0">
                    Twój cel
                </p>
                <li
                    class="raport__listItem--goal"
                    v-if="userRaports.length === 0"
                >
                    <ul class="raport__sublist">
                        <li class="raport__listItem raport__listItem--radio">
                            <label
                                class="raport__label raport__label--radio"
                                for="loseWeight"
                                >Redukcja<br />tkanki tłuszczowej
                                <input
                                    class="raport__inputRadio"
                                    type="radio"
                                    id="loseWeight"
                                    name="goal"
                                    v-model="goal"
                                    value="redukcja"
                            /></label>
                        </li>
                        <li class="raport__listItem raport__listItem--radio">
                            <label
                                class="raport__label raport__label--radio"
                                for="gainWeight"
                                >Budowa<br />masy mięśniowej
                                <input
                                    class="raport__inputRadio"
                                    type="radio"
                                    id="gainWeight"
                                    name="goal"
                                    v-model="goal"
                                    value="masa"
                            /></label>
                        </li>
                        <li class="raport__listItem raport__listItem--radio">
                            <label
                                class="raport__label raport__label--radio"
                                for="getRidOfBackPain"
                                >Pozbycie się<br />bólu pleców
                                <input
                                    class="raport__inputRadio"
                                    type="radio"
                                    id="getRidOfBackPain"
                                    name="goal"
                                    v-model="goal"
                                    value="plecy"
                            /></label>
                        </li>
                    </ul>
                </li>
            </ul>
            <Btn type="submit" text="Add your data" :full="true" class="btn" />
        </form>
    </div>
</template>
<script>
import { db } from '../main';
import firebase from 'firebase';
import Btn from '@/components/Btn';
import UploadImg from '@/components/UploadImg';
import UploadIcon from '@/components/UploadIcon';

export default {
    name: 'FormRaport',
    props: ['authUid'],
    components: {
        Btn,
        UploadImg,
        UploadIcon,
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
            files: {
                front: null,
                back: null,
                side: null,
            },
            goal: '',
            userRaports: [],
        };
    },
    methods: {
        async registerUserData() {
            const userRaport = {
                weight: this.weight,
                height: this.height,
                waist: this.waist,
                chest: this.chest,
                thigh: this.thigh,
                biceps: this.biceps,
                date: new Date(),
                frontFileName: this.files.front?.name ?? null,
                backFileName: this.files.back?.name ?? null,
                sideFileName: this.files.side?.name ?? null,
            };

            const reportResponse = await db
                .collection(`users/${this.authUid}/raports`)
                .add(userRaport);
            await Promise.all(
                Object.entries(this.files).map(([name, file]) => {
                    if (!file) {
                        return;
                    }
                    return firebase
                        .storage()
                        .ref(
                            `${this.authUid}/${reportResponse.id}/${name}/${file.name}`
                        )
                        .put(file);
                })
            );
            alert('Your raport submitted');
            this.$router.push('/panel');
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
                    console.log(url);
                })
            );
        },
    },
    mounted() {
        db.collection(`users/${this.authUid}/raports`).onSnapshot(doc => {
            doc.docs.forEach(item => console.log(item.id));
            this.userRaports = doc.docs.map(item => ({
                uid: item.id,
                data: item.data(),
            }));
        });
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
    &__hint {
        padding: 0.5rem;
        background: #d8d8d8;
        border-radius: 8px;
        font-size: 14px;
        text-align: center;
        margin: 1rem;
    }
    &__form {
        width: 80%;
        max-width: 600px;
    }
    &__sublist {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        @media screen and (max-width: 1024px) {
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
    &__subtitle {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 20px;
        position: relative;
        text-align: left;
        &:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 10rem;
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
        &--image {
            flex-direction: column;
            justify-content: center;
        }
        &--radio {
            flex-direction: column;
            line-height: 1.5;
            text-align: center;
            @media screen and (max-width: 1024px) {
                flex-direction: row;
            }
        }
    }
    &__label {
        font-size: 1.6rem;
        // width: 40%;
        // text-align: left;
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
    input[type='radio'] {
        /* Add if not using autoprefixer */
        -webkit-appearance: none;
        /* Remove most all native input styles */
        appearance: none;
        /* For iOS < 15 */
        background-color: transparent;
        /* Not removed via appearance */
        margin: 1rem auto;

        font: inherit;
        color: #ffba15;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid #ffba15;
        border-radius: 50%;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
    }

    input[type='radio']::before {
        content: '';
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em #ffba15;
        /* Windows High Contrast Mode */
        background-color: #ffba15;
    }

    input[type='radio']:checked::before {
        transform: scale(1);
    }
}
.btn {
    display: block;
    margin: 2rem auto;
}
</style>
