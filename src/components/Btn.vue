<template>
    <button class="btn" :class="full ? 'btn--full' : ''">
        {{ text }}
    </button>
</template>
<script>
export default {
    name: 'Btn',
    props: {
        text: {
            type: String,
            require,
        },
        full: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="scss">
.btn {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    font-weight: 600;
    color: #ffba15;
    border: 1px solid #ffba15;
    border-radius: 1.5rem;
    padding: 0.5rem 1rem;
    letter-spacing: 0.05rem;
    // box-sizing: content-box;
    transition: all 0.3s;
    &:hover {
        background-color: #ffba15;
        color: #fff;
    }
}
</style>
