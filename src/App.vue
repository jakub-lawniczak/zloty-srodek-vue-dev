<template>
    <div id="app">
        <Nav />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import '@/assets/scss/reset.scss';
import '@/assets/scss/variables.scss';
import '@/assets/scss/globals.scss';
import Nav from '@/components/Nav';

export default {
    components: {
        Nav,
    },
};
</script>
<style lang="scss">
#app {
    min-height: 100vh;
    background-color: #ffba15;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
}
.container {
    background-color: #fff;
    width: 85%;
    min-height: calc(100vh - 12rem);
    margin: 0 auto;
    padding: 2rem 3rem 3rem;
    margin-top: 3rem;
    border-radius: 3rem;
    @media screen and (max-width: 1024px) {
        padding: 2rem 0.75rem 1rem;
    }
}

// input {
//     margin-right: 20px;
// }
</style>
