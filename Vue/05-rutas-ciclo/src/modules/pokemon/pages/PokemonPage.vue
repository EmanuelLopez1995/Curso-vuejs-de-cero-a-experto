<template>
    <div>
        <h1>Pokemon: #<span>{{ id }}</span></h1>
        <div v-if="pokemon">
            <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
        </div>
    </div>
</template>

<script>

export default {

    props: {
        id: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            // id: null
            pokemon: null
        }
    },
    created() {
        this.getPokemon();
    },

    methods: {
        async getPokemon() {
            try {
                const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`).then( r => r.json());
                this.pokemon = pokemon;
            } catch (error) { // esto se hace por si se manda un pokemon que no existe
                this.$router.push('/'); // con esto redirigimos al home
                console.log('no hay nada que hacer aqui');
            }
        }
    },
    watch: {
        id() {
            this.getPokemon();
        }
    }
}

</script>
