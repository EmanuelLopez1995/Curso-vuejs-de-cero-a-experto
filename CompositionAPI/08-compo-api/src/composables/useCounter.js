import  { ref } from 'vue';

const useCounter = (initValue = 5) => {
    const counter = ref(initValue);

    return {
        counter,
        
        increase: () => counter.value++,
        decrease: () => counter.value--
    }
}


export default useCounter