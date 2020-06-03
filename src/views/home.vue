<template>
    <div id="nav">
        <router-link to="/proxy">Proxy示例</router-link> <br />
        <router-link to="/regexp">正则表达式示例</router-link>
    </div>
</template>

<style lang="stylus">
#nav
    padding 30px
#nav a
    font-weight bold
    color #2c3e50
#nav a.router-link-exact-active
    color #42b983
</style>
