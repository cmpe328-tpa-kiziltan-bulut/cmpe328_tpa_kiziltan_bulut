import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import axios from '../helpers/axios.instance';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Log In',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/signup',
        name: 'Sign Up',
        component: () => import('../views/Signup.vue')
    },
    {
        path: '*',//'/:catchAll(.*)',
        name: 'Not Found',
        component: () => import('../views/404.vue')
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach(async (to, from, next) => {
    let requestBody = new URLSearchParams();
    let TOKEN = localStorage.getItem("z-jwt")
    if (TOKEN) requestBody.append("jwt", TOKEN.toString())

    if (to.name === 'Home') {
        await fetch(process.env.VUE_APP_API_URL + "/auth/check", {
            method: 'post',
            headers: {"Content-Type": "application/x-www-form-urlencoded;charset=utf-8"},
            body: requestBody
        }).then(res => {
            if (res.status === 200)
                next();
            else
                next({name: 'Log In'});
        })
            // eslint-disable-next-line no-unused-vars
            .catch(err => {
                next({name: 'Log In'});
            })
    } else next();
});

export default router
