<template>
  <h1 v-if="!pokemon && !errorMessage">Buscando...</h1>
  <h1 v-else-if="errorMessage"> {{ errorMessage }}</h1>

  <template v-else>
        <h3>{{ pokemon.name }}</h3>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
        <br>
        <router-link :to="{name: 'pokemon-search'}">Regresar</router-link>
  </template>
</template>

<script>

import { watch } from "vue";
import { useRoute , onBeforeRouteLeave} from "vue-router";
import usePokemon from "../composables/usePokemon";

export default {
    setup() {
        const route = useRoute();
        const { pokemon, isLoading, errorMessage, searchPokemon} = usePokemon(route.params.id);

        watch(
            () => route.params.id,  // se va a ejecutar el watch cuando este cambie
            ( value, prevValue) => { // se puede poner el valor actual y el anterior
                searchPokemon(route.params.id);
            }
        )

        onBeforeRouteLeave(() => {
            const answer = window.confirm('Esta seguro que desea salir?');

            if(!answer){
                return false; // false bloquea la salida
            }
        })
        return {
            pokemon,
            isLoading,
            errorMessage
        }
    }
}
</script>

<style>

</style>