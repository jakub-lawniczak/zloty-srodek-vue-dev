<template>
    <div id="app">
        <Nav />
        <router-view />
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #fff;
    height: calc(100vh - 6rem);
    width: calc(100vw - 6rem);
    margin: 3rem;
    border-radius: 3rem;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
}

#nav a.router-link-exact-active {
    color: #ffba15;
}

input {
    margin-right: 20px;
}
</style>
