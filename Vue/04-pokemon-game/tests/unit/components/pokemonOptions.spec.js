import {shallowMount} from '@vue/test-utils';
import PokemonOptions from "@/components/PokemonOptions";
import { pokemons } from "../mocks/pokemons.mock";


describe('PokemonOptions component', ()=>{

    let wrapper; 

    beforeEach(()=>{
        wrapper = shallowMount(PokemonOptions, {
            props: {
                pokemons: pokemons
            }
        })
    })
    test('debe hacer match con el snapshot', () => { 

        expect(wrapper.html()).toMatchSnapshot();
    }) 

    test('debe de mostrar las 4 opciones correctamente', () => { 
        const lis = wrapper.findAll('li');
        expect(lis.length).toBe(4);
        const [li1,li2,li3,li4] = lis;
        expect(li1.text()).toBe('bulbasaur');
        expect(li2.text()).toBe('ivysaur');
        expect(li3.text()).toBe('venusaur');
        expect(li4.text()).toBe('charmander');
    })

    test('debe de emitir "selection" con sus respectivos valores al hacer click', () => { 

        const [li1,li2,li3,li4] = wrapper.findAll('li');
        li1.trigger('click');
        li2.trigger('click');
        li3.trigger('click');
        li4.trigger('click');
        expect(wrapper.emitted('selection').length).toBe(4); // se emitió 4 veces selection
        expect(wrapper.emitted('selection')[0]).toEqual([ 1 ]); 
        expect(wrapper.emitted('selection')[1]).toEqual([ 2 ]); 
        expect(wrapper.emitted('selection')[2]).toEqual([ 3 ]); 
        expect(wrapper.emitted('selection')[3]).toEqual([ 4 ]); 
    })
})