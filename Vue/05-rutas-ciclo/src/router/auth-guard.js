

const isAutheticatedGuard = (to, from, next)=> {

    //aca se podría conectar con el backend
    return new Promise( ()=>{

        const random = Math.random() * 100;
        if(random > 50){
            console.log('está autenticado');
            next();
        }else {
            console.log('bloqueado por el isAuthenticatedGuard', random);
            next({name: 'pokemon-home'});
        }
    })

}

export default isAutheticatedGuard;