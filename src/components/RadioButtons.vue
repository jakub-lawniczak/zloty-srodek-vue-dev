<template>
    <div>
        <p class="raport__subtitle">
            {{ label }}
        </p>
        <div class="raport__listItem--goal">
            <ul
                class="raport__sublist"
                :class="errors ? 'raport__sublist--error' : ''"
            >
                <li
                    class="raport__listItem raport__listItem--radio"
                    v-for="item in items"
                    :key="item.value"
                >
                    <label class="raport__label raport__label--radio"
                        >{{ item.text }}
                        <input
                            class="raport__inputRadio"
                            type="radio"
                            :name="name"
                            :checked="value === item.value"
                            :value="item.value"
                            @change="$emit('input', $event.target.value)"
                    /></label>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RadionButtons',
    props: {
        label: { type: String, requred: true },
        value: { type: String, required: false },
        items: { type: Array, required: true },
        name: { type: String, required: true },
        errors: { type: Boolean, defalut: false },
    },
};
</script>
<style lang="scss" scoped>
.raport {
    &__sublist {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 0.5rem;
        @media screen and (max-width: 1024px) {
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        &--error {
            border: 1px solid red;
            border-radius: 0.8rem;
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
    &__label {
        font-size: 1.6rem;
        // width: 40%;
        // text-align: left;
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
        color: #e67e22;
        width: 1.15em;
        height: 1.15em;
        border: 0.15em solid #e67e22;
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
        box-shadow: inset 1em 1em #e67e22;
        /* Windows High Contrast Mode */
        background-color: #e67e22;
    }

    input[type='radio']:checked::before {
        transform: scale(1);
    }
}
</style>
