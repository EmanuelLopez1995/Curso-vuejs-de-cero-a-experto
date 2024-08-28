<template>
  <div>
    <h1 v-if="!pokemon">Espere por favor...</h1> 
      <div v-else>
        <h1>¿Quien es este pokemon?</h1>
        <!-- img -->
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <!-- options -->
        <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer"/>

        <template v-if="showAnswer">
          <h2 class="fade-in">{{ message }}</h2>
          <button @click="newGame">Nuevo Juego</button>
        </template>
    </div>
  </div>
</template>

<script>
import PokemonPicture from "./../components/PokemonPicture.vue";
import PokemonOptions from "./../components/PokemonOptions.vue";

import getPokemonOptions from '../helpers/getPokemonOptions';



export default {
    name: "Pokemon Page",
    components: {
        PokemonPicture,
        PokemonOptions,
    },
    data() {
      return {
        pokemonArr: [],
        pokemon: null,
        showPokemon: false,
        showAnswer: false,
        message: ''
      }
    },
    methods: {
      async mixPokemonArray() {
        this.pokemonArr = await getPokemonOptions();

        const rndInt = Math.floor( Math.random() * 4); // para agarrar uno de los pokemon de forma aleatoria
        this.pokemon = this.pokemonArr[ rndInt ];
      },
      checkAnswer(selectedId) {
        this.showPokemon = true;
        this.showAnswer = true;
        if(selectedId === this.pokemon.id){
          this.message = `Correcto, ${this.pokemon.name}`;
        }else{
          this.message = `Oops, era ${this.pokemon.name}`;
        }
      },
      async newGame() {
        this.pokemon = null;
        this.showPokemon = false;
        this.showAnswer = false;
        this.pokemonArr = [];
        await this.mixPokemonArray();
      }
    },
    mounted() {
      this.mixPokemonArray();
    }

}
</script>
