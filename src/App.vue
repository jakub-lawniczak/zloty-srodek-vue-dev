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
    background-color: #ededed;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
    padding-bottom: 2rem;
}
.container {
    background-color: #fff;
    width: 85%;
    min-height: calc(100vh - 12rem);
    margin: 0 auto;
    padding: 4rem 6rem 4rem;
    margin-top: 3rem;
    border-radius: 3rem;
    -webkit-box-shadow: 3px 3px 16px 0px rgba(18, 18, 18, 1);
    -moz-box-shadow: 3px 3px 16px 0px rgba(18, 18, 18, 1);
    box-shadow: 3px 3px 16px 0px rgba(18, 18, 18, 1);
    @media screen and (max-width: 1024px) {
        padding: 2rem 1.75rem 1rem;
    }
}
</style>
