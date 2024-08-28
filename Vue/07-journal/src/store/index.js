
import { createStore } from "vuex";
import journal from "../modules/daybook/store/journal/index.js";

const store = createStore({
    modules: {
        journal
    }
})


export default store