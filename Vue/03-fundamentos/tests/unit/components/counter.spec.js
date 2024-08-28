import { shallowMount, mount } from '@vue/test-utils'
import Counter from '@/components/Counter.vue';

describe('Counter.vue', () => { 

  let wrapper;

  beforeEach(()=>{
    wrapper = shallowMount( Counter );
  })
    
    // test('debe de hacer match con el snapshot', () => { 
        
    //     const wrapper = shallowMount( Counter );

    //     expect( wrapper.html() ).toMatchSnapshot()
    // })

     test('h2 debe de tener el valor por defecto "Counter"', () => { 
        expect( wrapper.find('h2').exists() ).toBeTruthy();
        const h2 = wrapper.find('h2');
        expect( h2.text() ).toBe('Counter');
      })

    test('El valor por defecto debe ser 100 en el parrafo 2', () => { 
        const value = wrapper.find('[data-testid="counter"]').text();

        expect( value ).toBe("100");
     })

     test('debe incrementar y decrementar el contador', async () => { 
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button'); // desestructura el array
        await increaseBtn.trigger('click'); 
        await increaseBtn.trigger('click'); 
        await increaseBtn.trigger('click'); 
        await decreaseBtn.trigger('click');
        await decreaseBtn.trigger('click');
        const value = wrapper.find('[data-testid="counter"]').text(); 
        expect(value).toBe("101");
      })

      test('Debe de establecer el valor por defecto', () => {  
        const {start} = wrapper.props();
        const value = wrapper.find('[data-testid="counter"]').text(); 
        expect(Number(value)).toBe(start)
       })

       test('debe de mostrar la prop title', () => { 
        const title = 'Hola Mundo!!'
        const wrapper = shallowMount(Counter, {
          props: {
            title: title
          }
        });
        expect( wrapper.find('h2').text()).toBe(title)
      })  

    
})