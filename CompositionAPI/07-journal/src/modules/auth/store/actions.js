import authApi from "@/api/authApi";


export const createUser = async ( {commit}, user )=> {
    const {name, email, password} = user;

    try {
        const { data } = await authApi.post(':signUp', {email, password, returnSecureToken: true});
        const { idToken, refreshToken } = data;
        
        await authApi.post(':update', {displayName: name, idToken}); // seteamos el nombre del usuario

        delete user.password; // borra el campo de password en el objeto user
        commit('loginUser', { user, idToken, refreshToken})

        return { ok: true};
    } catch (error) {
        return { ok: false, message: error.response.data.error.message}
    }
}

export const signInUser = async ( {commit}, user )=> {
    const {email, password} = user;

    try {
        const { data } = await authApi.post(':signInWithPassword', {email, password, returnSecureToken: true});
        const { idToken, refreshToken, displayName } = data;

        user.name = displayName;
        
        commit('loginUser', { user, idToken, refreshToken})

        return { ok: true};
    } catch (error) {
        return { ok: false, message: error.response.data.error.message}
    }
}

export const checkAuthentication = async ({ commit }) => {
    const idToken = localStorage.getItem('idToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if( !idToken ) {
        commit('logout');
        return {ok: false, message: 'No hay token en la peticion'}
    }

    try {
        const {data} = await authApi.post(':lookup', {idToken});
        const {displayName, email} = data.users;

        const user = {
            name: displayName,
            email
        }

        commit('loginUser', { user, idToken, refreshToken})

        return { ok: true }
    } catch (error) {
        commit('logout');
        return {ok: false, message: error.response.data.error.message}
    }
}