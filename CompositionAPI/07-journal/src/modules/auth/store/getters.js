

// export const myGetter = (state)=> {
    // return state.algo
// }



export const currentState = (state)=> {
    return state.status
}

export const username = (state)=> {
    return state.user?.name || ''
}