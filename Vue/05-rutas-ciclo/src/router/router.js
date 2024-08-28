import { createRouter, createWebHashHistory } from "vue-router";
import isAutheticatedGuard from "./auth-guard";


const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/*webpackChunkName: "PokemonLayout"*/ '../modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: 'home',  // OJO ACA NO HAY QUE PONER SLASH INICIAL, sino toma el raiz
                name: 'pokemon-home',
                component: () => import(/*webpackChunkName: "ListPage"*/ '../modules/pokemon/pages/ListPage') 
            }, 
            { 
                path: 'about', 
                name: 'pokemon-about',
                component: () => import(/*webpackChunkName: "AboutPage"*/ '../modules/pokemon/pages/AboutPage') 
            }, 
            { 
                path: 'pokemonid/:id', 
                name: 'pokemon-id',
                props: ( route ) =>{
                    const { id } = route.params
                    return isNaN(Number(id)) ? { id: 1 } : {id: Number(id)}
                },
                component: () => import(/*webpackChunkName: "PokemonPage"*/ '../modules/pokemon/pages/PokemonPage')  
            }, 
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAutheticatedGuard ],
        component: () => import(/*webpackChunkName: "DragonBallLayout"*/ '../modules/dbz/layouts/DragonBallLayout'),
        children: [
            {
                path: 'characters',
                name: 'dbz-characters',
                component: () => import(/*webpackChunkName: "Characters"*/ '../modules/dbz/pages/Characters') 
            },
            {
                path: 'about',
                name: 'dbz-about',
                component: () => import(/*webpackChunkName: "About"*/ '../modules/dbz/pages/About') 
            },
            {
                path: '',
                redirect: { name: 'dbz-about' }
            }
        ]
    },
    { // esto significa cualquier url que no haga match con las anteriores
        path: '/:pathMatch(.*)*', 
        component: () => import(/*webpackChunkName: "NoPageFound"*/ '../modules/shared/pages/NoPageFound')
        // redirect: '/home'
    } 
]

const router = createRouter({ // aca se corto lo que esta en internet al importar createRouter arriba
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

export default router;