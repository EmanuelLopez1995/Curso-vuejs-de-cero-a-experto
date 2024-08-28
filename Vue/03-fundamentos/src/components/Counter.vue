<template>
    <div>
        <h2>{{ customTitle }}</h2>
        <p>{{ counter }} <sup>2</sup> = {{ squareCounter }}</p>
        <p data-testid="counter">{{ counter }}</p>

        <div class="buttons-container">
            <button @click="increase">+1</button>
            <button @click="decrease">-1</button>
        </div>   
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 100,
            // required: true
            validatior( value ) { // lo que recibe es el valor que semanda en start
                return value >= 0 // si es value mayor o igual a 0 se deja pasar 
            }
        }
    },
    name: 'Counter',
    data() {
        return {
            counter: this.start
        }
    },
    computed: {
        squareCounter() {
            return this.counter * this.counter;
        },
        customTitle() {
            return this.title || 'Counter';
        }
    },
    methods: {
        increase() {
            this.counter++;
        },
        decrease() {
            this.counter--;
        }
    }

}
</script>

<style>
    button{
        background-color: #64bb87;
        border-radius:  5px;
        border: 1px solid white;
        color: white;
        cursor: pointer;
        margin: 0 5px;
        padding: 5px 15px;
        transition: 0.3s ease-in-out;
    }

    button:hover {
        background-color: #5aa67b;
    }
</style>