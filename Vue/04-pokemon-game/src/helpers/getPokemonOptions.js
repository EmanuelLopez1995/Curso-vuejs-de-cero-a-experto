import pokemonApi from '../api/pokemonApi.js';


export const getPokemons = ()=>{
    const pokemonsArr = Array.from( Array(650) ); // Esto crea un arreglo con 650 posiciones vacias
    return pokemonsArr.map( ( arg , index) => index + 1); //establecemos el arreglo para que vaya desde el 1 hasta el 650 
}

const getPokemonOptions = async ()=>{
    const mixedPokemons = getPokemons().sort( ()=> Math.random() - 0.5 ) // mezcla el arreglo
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4)); // corta el array para mandar solo los primeros 4
    return pokemons;
}

export const getPokemonNames = async ( [a,b,c,d] = [] )=>{ // aca desestructuramos para obtener los numeros del arreglo
    //vamos a obtener el nombre del pokemon

    const promiseArr = [ // aca solo se definen las peticiones, no se están llamando
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`)
    ]

    const [p1,p2,p3,p4] = await Promise.all(promiseArr); //se llaman y Desestructuramos cada una de las peticiones 

    return [
        { name: p1.data.name, id: p1.data.id},
        { name: p2.data.name, id: p2.data.id},
        { name: p3.data.name, id: p3.data.id},
        { name: p4.data.name, id: p4.data.id},
    ]
}

export default getPokemonOptions