
const app = Vue.createApp({

    // template: `
    //     <h1>Hola mundo</h1>
    //     <p>{{ 1 + 1 }}</p>
    // `

    data() {
        return {
            message: 'Hola Mundo'
        }
    },
    methods: {
        changeQuote( event ) {
            this.message = 'asdasda'
        }
    }

})

app.mount('#myApp'); // le decis en que div va a tener control, donde se renderiza