<template>
    <ul class="raport__list" v-if="userData">
        <h2 class="raport__date">
            Raport z dnia
            <span class="date">{{
                new Date(userData.date.seconds * 1000).toLocaleDateString()
            }}</span>
        </h2>
        <p class="raport__subtitle">Wymiary</p>
        <li class="raport__listItem">
            <label class="raport__label" for="weight">Waga</label>
            <p class="raport__value">{{ userData.weight }} kg</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="height">Wzrost</label>
            <p class="raport__value">{{ userData.height }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="waist">Talia</label>
            <p class="raport__value">{{ userData.waist }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="chest">Klatka piersiowa</label>
            <p class="raport__value">{{ userData.chest }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="thigh">Udo</label>
            <p class="raport__value">{{ userData.thigh }} cm</p>
        </li>
        <li class="raport__listItem">
            <label class="raport__label" for="biceps">Biceps</label>
            <p class="raport__value">{{ userData.biceps }} cm</p>
        </li>
        <p class="raport__subtitle">Zdjęcia</p>
        <li class="raport__listItem">
            <ul class="raport__sublist">
                <li class="raport__listItem raport__listItem--image">
                    <label class="raport__label" for="front">Front</label>
                    <PreviewImage
                        :path="
                            `/${authUid}/raports/${raportUid}/front/${userData.frontFileName}`
                        "
                        v-if="userData.frontFileName"
                    />
                </li>
                <li class="raport__listItem raport__listItem--image">
                    <label class="raport__label" for="front">Back</label>
                    <PreviewImage
                        :path="
                            `/${authUid}/raports/${raportUid}/back/${userData.backFileName}`
                        "
                        v-if="userData.backFileName"
                    />
                </li>
                <li class="raport__listItem raport__listItem--image">
                    <label class="raport__label" for="front">Side</label>
                    <PreviewImage
                        :path="
                            `/${authUid}/raports/${raportUid}/side/${userData.sideFileName}`
                        "
                        v-if="userData.sideFileName"
                    />
                </li>
            </ul>
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
    &__list {
        margin: 4rem 0;
    }
    &__date {
        font-size: 1.6rem;
        margin-bottom: 1rem;
        .date {
            font-weight: 600;
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
    &__sublist {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        @media screen and (max-width: 1024px) {
            flex-direction: column;
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
    }
    &__label {
        font-size: 1.6rem;
    }
    &__value {
        font-size: 1.6rem;
        font-weight: 700;
    }
}
</style>
