
import { useStore } from "vuex"
import { computed } from "vue";

const useAuth = () => {

    const store = useStore();
    
    const createUser = async(user) => {
        const resp = await store.dispatch('createUser', user);
        return resp
    }

    const loginUser =  async(user) => {
        const resp = await store.dispatch('signInUser', user);
        return resp
    }

    const checkAuthStatus = async() => {
        const resp = await store.dispatch('checkAuthentication');
        return resp;
    }

    const logout = () => {
        store.commit('auth/logout');
    }

    return {
        createUser,
        loginUser,
        checkAuthStatus,
        logout,

        authStatus: computed(()=> store.getters['currentState']),
        username: computed(()=> store.getters['username'])
    }
}

export default useAuth