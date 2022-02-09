<template>
    <div id="app">
        <div class="container">
            <Nav />
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
<style lang="scss" scoped>
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
    margin: 3rem auto;
    border-radius: 3rem;
}

// input {
//     margin-right: 20px;
// }
</style>
