<template>
<link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
 <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<body style="background-color: #4eabab; background-image: url('https://images.pexels.com/photos/3183132/pexels-photo-3183132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;">
  <router-view/>
</body>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
}
</script>

<style>
#app {
  font-family: "Courier New" !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
