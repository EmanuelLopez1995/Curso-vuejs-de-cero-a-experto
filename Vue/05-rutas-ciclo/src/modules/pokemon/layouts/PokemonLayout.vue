<template>
  <div>
    <div class="pokemon-layout">
        <h1>Pokemon Layout</h1>
        <!-- este router view lo que hace es decir que este layout puede tener rutas hijas -->
        <router-view></router-view> 
    </div>
  </div>
</template>


<style scoped>
    .pokemon-layout {
        background-color: deeppink;
    }
</style>