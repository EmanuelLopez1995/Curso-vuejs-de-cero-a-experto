

// export const myGetter = (state)=> {
    // return state.algo
// }

export const getEntriesByTerm = (state) => (term = '') => {

    if(term.length === 0){
        return state.entries
    }
    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLowerCase()))
    
}


export const getEntriesById = (state)=> (id = '') => {

    const entry = state.entries.find(item => item.id === id)

    if(!entry) return

    return {...entry} 
}