
import { shallowMount, mount } from '@vue/test-utils';
import Indecision from '@/components/Indecision.vue';

describe('Indecision component', ()=>{

    let wrapper; 
    let clgSpy;

    global.fetch = jest.fn( () => Promise.resolve({
        //definimos la resolucion de la respuesta
        json: ()=> Promise.resolve({
            'answer': 'yes',
            'forced' : false,
            'image': 'https://yesno.wtf/assets/yes/2.gif'
        })
    }));

    beforeEach(()=>{
        wrapper = shallowMount(Indecision);

        clgSpy = jest.spyOn( console, 'log' )

        jest.clearAllMocks();
    })

    test('debe matchear con el snapshot', () => { 
        expect( wrapper.html() ).toMatchSnapshot();
    })

    test('Escribir en el input no debe disparar nada',  async () => { 

        wrapper.vm.hasOwnProperty = () => Object.hasOwnProperty;
        const getAnswerSpy = jest.spyOn( wrapper.vm , 'getAnswer' );
        const input = wrapper.find('input');
        await input.setValue('Hola Mundo');
        expect(clgSpy).toHaveBeenCalled();
        expect(getAnswerSpy).not.toHaveBeenCalled();
    })

    test('escribir el ? debe de disparar el getAnswer', async () => { 
        wrapper.vm.hasOwnProperty = () => Object.hasOwnProperty;
        const getAnswerSpy2 = jest.spyOn( wrapper.vm, 'getAnswer' );
        const input = wrapper.find('input');
        await input.setValue('Hola Mundo?');
        expect(getAnswerSpy2).toHaveBeenCalled();
    })

    test('pruebas en getAnswer', async () => { 
        await wrapper.vm.getAnswer(); // llamamos la funcion
        const img = wrapper.find('img')
        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif');
        expect(wrapper.vm.answer).toBe('Si!');
    })

    test('pruebas en getAnswer - Fallo en el API', async () => { 

        fetch.mockImplementationOnce( ()=> Promise.reject('API is down')) // el mensaje puede ser cualquiera

        await wrapper.vm.getAnswer(); 

        const img = wrapper.find('img')
        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API');
    })
    
    


})