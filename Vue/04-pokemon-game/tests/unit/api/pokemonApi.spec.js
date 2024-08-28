import pokemonApi from '@/api/pokemonApi.js'

describe('pokemon Api', ()=>{

    test('axios debe de estar configurado con el api de pokemon', () => { 
        expect(pokemonApi.defaults.baseURL).toBe('https://pokeapi.co/api/v2/pokemon');
     })
})