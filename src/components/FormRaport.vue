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
        <ValidationObserver v-slot="{ handleSubmit }">
            <form
                class="raport__form"
                @submit.prevent="handleSubmit(registerUserData)"
            >
                <ul class="raport__list">
                    <p class="raport__subtitle">Pomiary</p>
                    <li class="raport__listItem">
                        <label class="raport__label" for="weight">Waga</label>
                        <ValidationProvider
                            name="Waga"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <input
                                class="raport__input"
                                type="number"
                                placeholder="waga"
                                v-model="weight"
                                id="weight"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <template v-if="userRaports.length === 0">
                        <li class="raport__listItem">
                            <label class="raport__label" for="height"
                                >Wzrost</label
                            >
                            <ValidationProvider
                                name="Wzrost"
                                rules="required"
                                class="validationProvider"
                                v-slot="{ errors }"
                            >
                                <input
                                    class="raport__input"
                                    type="number"
                                    placeholder="wzrost"
                                    v-model="height"
                                    id="height"
                                    :class="
                                        errors[0] ? 'raport__input--error' : ''
                                    "
                                />
                                <p class="error">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </li>
                    </template>
                    <li class="raport__listItem">
                        <label class="raport__label" for="waist">Talia</label>
                        <ValidationProvider
                            name="Talia"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <input
                                class="raport__input"
                                type="number"
                                placeholder="talia"
                                v-model="waist"
                                id="waist"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <!-- <li class="raport__listItem">
                        <label class="raport__label" for="chest">Klatka</label>
                        <ValidationProvider
                            name="Klatka"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <input
                                class="raport__input"
                                type="number"
                                placeholder="klatka piersiowa"
                                v-model="chest"
                                id="chest"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li> -->
                    <li class="raport__listItem">
                        <label class="raport__label" for="chest">Barki</label>
                        <ValidationProvider
                            name="Barki"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <input
                                class="raport__input"
                                type="number"
                                placeholder="obwór w barkach"
                                v-model="shoulders"
                                id="shoulders"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <li class="raport__listItem">
                        <label class="raport__label" for="thigh">Udo</label>
                        <ValidationProvider
                            name="Udo"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <input
                                class="raport__input"
                                type="number"
                                placeholder="udo"
                                v-model="thigh"
                                id="thigh"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <li class="raport__listItem">
                        <label class="raport__label" for="biceps">Biceps</label>
                        <ValidationProvider
                            name="Biceps"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <input
                                class="raport__input"
                                type="number"
                                placeholder="biceps"
                                v-model="biceps"
                                id="biceps"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            />
                            <p class="error">
                                {{ errors[0] }}
                            </p>
                        </ValidationProvider>
                    </li>
                    <p class="raport__subtitle">Zdjęcia</p>

                    <li class="raport__listItem">
                        <label class="raport__label" for="front">Przód</label
                        ><ValidationProvider
                            name="Przód"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <div
                                class="raport__input"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            >
                                <UploadImg
                                    @change="files.front = $event"
                                    :fileName="
                                        files.front ? files.front.name : ''
                                    "
                                    field="Przód"
                                    v-model="files.front"
                                />
                                <p class="error error--file">
                                    {{ errors[0] }}
                                </p>
                            </div>
                        </ValidationProvider>
                    </li>
                    <li class="raport__listItem">
                        <label class="raport__label" for="back">Tył</label
                        ><ValidationProvider
                            name="Tył"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <div
                                class="raport__input"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            >
                                <UploadImg
                                    @change="files.back = $event"
                                    :fileName="
                                        files.back ? files.back.name : ''
                                    "
                                    field="Tył"
                                    v-model="files.back"
                                />
                                <p class="error error--file">
                                    {{ errors[0] }}
                                </p>
                            </div>
                        </ValidationProvider>
                    </li>
                    <li class="raport__listItem">
                        <label class="raport__label" for="side">Bok</label
                        ><ValidationProvider
                            name="Bok"
                            rules="required"
                            class="validationProvider"
                            v-slot="{ errors }"
                        >
                            <div
                                class="raport__input"
                                :class="errors[0] ? 'raport__input--error' : ''"
                            >
                                <UploadImg
                                    @change="files.side = $event"
                                    :fileName="
                                        files.side ? files.side.name : ''
                                    "
                                    field="Bok"
                                    v-model="files.side"
                                />
                                <p class="error error--file">
                                    {{ errors[0] }}
                                </p>
                            </div>
                        </ValidationProvider>
                    </li>
                    <template v-if="userRaports.length === 0">
                        <li class="raport__listItem--goal">
                            <ValidationProvider
                                name="Twój cel"
                                rules="required"
                                class="validationProvider"
                                v-slot="{ errors }"
                            >
                                <RadioButtons
                                    label="Twój cel"
                                    v-model="goal"
                                    :items="goalItems"
                                    name="goal"
                                    :errors="errors[0] ? true : false"
                                />
                                <p class="error">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </li>
                        <li class="raport__listItem--goal">
                            <ValidationProvider
                                name="Twója aktywność"
                                rules="required"
                                class="validationProvider"
                                v-slot="{ errors }"
                            >
                                <RadioButtons
                                    label="Twoja aktywność"
                                    v-model="activity"
                                    :items="activityItems"
                                    name="activity"
                                    :errors="errors[0] ? true : false"
                                />
                                <p class="error">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </li>
                        <li class="raport__listItem--goal">
                            <ValidationProvider
                                name="Częstotliwość"
                                rules="required"
                                class="validationProvider"
                                v-slot="{ errors }"
                            >
                                <RadioButtons
                                    label="Częstotliwość"
                                    v-model="quantity"
                                    :items="quantityItems"
                                    name="quantity"
                                    :errors="errors[0] ? true : false"
                                />
                                <p class="error">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </li>
                        <li class="raport__listItem--goal">
                            <ValidationProvider
                                name="Długość"
                                rules="required"
                                class="validationProvider"
                                v-slot="{ errors }"
                            >
                                <RadioButtons
                                    label="Długość"
                                    v-model="workoutTime"
                                    :items="workoutTimeItems"
                                    name="workoutTime"
                                    :errors="errors[0] ? true : false"
                                />
                                <p class="error">
                                    {{ errors[0] }}
                                </p>
                            </ValidationProvider>
                        </li>
                    </template>
                    <template v-if="userRaports.length">
                        <label
                            for="changes"
                            class="raport__label raport__label--additional"
                            >Nie pasuję Ci konkretne ćwiczenie? Chcesz zkrócić
                            lub wydłuyć swoje treningi? Napisz tutaj!</label
                        >
                        <textarea
                            name="changes"
                            id="changes"
                            type="text"
                            v-model="changes"
                        />
                    </template>
                </ul>
                <!-- <p class="error" v-if="errors.length">
                {{ errors }}
            </p> -->
                <Btn
                    type="submit"
                    text="Add your data"
                    :full="true"
                    class="btn"
                />
                <!-- </ValidationProvider> -->
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import { db } from '../main';
import firebase from 'firebase';
import Btn from '@/components/Btn';
import UploadImg from '@/components/UploadImg';
import RadioButtons from '@/components/RadioButtons';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import {
    goalItems,
    activityItems,
    quantityItems,
    workoutTimeItems,
} from '@/components/radioItems.js';

export default {
    name: 'FormRaport',
    props: ['authUid'],
    components: {
        Btn,
        UploadImg,
        RadioButtons,
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            weight: null,
            height: '',
            waist: '',
            // chest: '',
            shoulders: '',
            thigh: '',
            biceps: '',
            files: {
                front: null,
                back: null,
                side: null,
            },
            goal: '',
            activity: '',
            quantity: '',
            workoutTime: '',
            userRaports: [],
            goalItems,
            activityItems,
            quantityItems,
            workoutTimeItems,
            changes: '',
            userData: null,
        };
    },
    methods: {
        async registerUserData() {
            const userRaport = {
                weight: this.weight,
                height: this.height,
                waist: this.waist,
                // chest: this.chest,
                shoulders: this.shoulders,
                thigh: this.thigh,
                biceps: this.biceps,
                goal: this.goal,
                activity: this.activity,
                quantity: this.quantity,
                workoutTime: this.workoutTime,
                date: new Date(),
                frontFileName: this.files.front?.name ?? null,
                backFileName: this.files.back?.name ?? null,
                sideFileName: this.files.side?.name ?? null,
                changes: this.changes,
                needRaport: false,
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
                            `${this.authUid}/raports/${reportResponse.id}/${name}/${file.name}`
                        )
                        .put(file);
                })
            );
            await this.needRaport();
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
        needRaport() {
            return db
                .collection(`users/`)
                .doc(this.authUid)
                .set({
                    ...this.userData,
                    needRaport: false,
                });
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
        db.collection('users/')
            .doc(this.authUid)
            .onSnapshot(doc => {
                this.userData = doc.data();
            });
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
        @media screen and (max-width: 1024px) {
            width: 100%;
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
            top: 88%;
            left: 0;
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
        &--additional {
            display: block;
            margin: 4rem 0 1rem;
            text-align: center;
        }
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
        width: 100%;
        min-height: 100%;
        margin: 0 0 1.6rem;
        border-radius: 0.8rem;
        position: relative;
        z-index: 2;

        @media (min-width: 1024px) {
            margin: 0;
        }
    }
    &__input {
        &--error {
            border: 1px solid red;
        }
    }
    textarea {
        width: 100%;
        height: 8rem;
        border-radius: 0.8rem;
        background-color: #f1f1f1;
        border: 1px solid transparent;
        padding: 0.8rem;
    }
    .error {
        font-size: 1rem;
        font-weight: 300;
        color: red;
        text-align: right;
        &--file {
            position: absolute;
            right: 0;
            padding: 0.5rem 0;
        }
    }
}
.btn {
    display: block;
    margin: 2rem auto;
}
.validationProvider {
    width: 65%;
}
</style>
