import {shallowMount, mount} from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import {pokemons} from '../mocks/pokemons.mock';

describe('pokemonPage component', ()=>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallowMount(PokemonPage);
    })

    // test('debe de hacer match con el snapshot', () => { 

    // })

    test('debe de llamar mixPokemonArray al montar', () => { 

        //cuando se hace el wrapper ya se monta la app
        //entonces aca con esto espiamos el method de mixPokemonArray
        const mixPokemonArraySpy = jest.spyOn(PokemonPage.methods, 'mixPokemonArray');
        // hay que volver a hacer el shallowMount para que se monte
        const wrapper = shallowMount(PokemonPage);

        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })

    test('debe de hacer match con el snapshot cuando cuargan los pokemons', () => { 

        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        });
        expect(wrapper.html()).toMatchSnapshot();
     })

     test('debe de mostrar los componentes de PokemonPicture y pokemonOptions', () => { 
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        });

        expect( wrapper.find('pokemon-picture-stub').exists()).toBeTruthy();
        expect( wrapper.find('pokemon-options-stub').exists()).toBeTruthy();

        expect(wrapper.find('pokemon-picture-stub').attributes('pokemonid')).toBe('5');
        expect(wrapper.find('pokemon-options-stub').attributes('pokemons')).toBeTruthy();
    })

    test('pruebas con checkAnswer', async () => { 
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemons,
                    pokemon: pokemons[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        });
        await wrapper.vm.checkAnswer(5);
        expect(wrapper.find('h2').exists()).toBeTruthy();
        expect(wrapper.vm.showPokemon).toBe(true);
        expect(wrapper.find('h2').text()).toBe(`Correcto, ${pokemons[0].name}`);
        await wrapper.vm.checkAnswer(10);
        expect(wrapper.vm.message).toBe(`Oops, era ${pokemons[0].name}`);
    })


})