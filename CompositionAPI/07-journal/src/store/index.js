
import { createStore } from "vuex";
import journal from "../modules/daybook/store/journal/index.js";
import auth from "../modules/auth/store/index.js";

const store = createStore({
    modules: {
        journal,
        auth
    }
})


export default store