import getRandomInt from '../../helpers/getRandomInt'

export const incrementRandomInt = async ({commit}) => {

    commit('setLoading', true);
    const randomInt = await getRandomInt(); // imaginemos que esto es una llamada a una API
    //solo podes llamar mutaciones no modificar el state directo
    commit('incrementBy', randomInt);
    commit('setLoading', false);
}