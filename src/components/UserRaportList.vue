<template>
    <ul class="raport__list" v-if="userData">
        <h2>
            {{ new Date(userData.date.seconds * 1000).toLocaleDateString() }}
        </h2>
        <p class="raport__subtitle">Wymiary</p>
        <li class="raport__listItem">
            <label class="raport__label" for="weight">Waga</label>
            <p>{{ userData.weight }} kg</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="height">Wzrost</label>
            <p>{{ userData.height }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="waist">Talia</label>
            <p>{{ userData.waist }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="chest">Klatka piersiowa</label>
            <p>{{ userData.chest }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="thigh">Udo</label>
            <p>{{ userData.thigh }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="biceps">Biceps</label>
            <p>{{ userData.biceps }} cm</p>
        </li>
        <p class="raport__subtitle">Zdjęcia</p>

        <li class="raport__listItem">
            <label class="raport__label" for="front">Front</label>
            <PreviewImage
                :path="
                    `/${authUid}/${raportUid}/front/${userData.frontFileName}`
                "
                v-if="userData.frontFileName"
            />
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="back">Back</label>
            <p class="raport__input">
                <UploadImg v-if="false" />
                <input
                    class="raport__input"
                    type="file"
                    placeholder="back"
                    @change="file = $event.target.files[0]"
                    id="back"
                />
            </p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="side">Side</label>
            <p class="raport__input">
                <UploadImg v-if="false" />
                <input
                    class="raport__input"
                    type="file"
                    placeholder="side"
                    @change="file = $event.target.files[0]"
                    id="side"
                />
            </p>
        </li>
    </ul>
</template>
<script>
import PreviewImage from '@/components/PreviewImage.vue';
export default {
    props: {
        raportUid: {
            type: String,
            required: true,
        },
        userData: {
            type: Object,
            required: true,
        },
        authUid: {
            type: String,
            required: true,
        },
    },
    components: {
        PreviewImage,
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
