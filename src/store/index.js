import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        token: false,
        title: '',
        isLoading: false
    },
    mutations: {
        [types.LOGIN]: (state, data) => {
            state.token = true;
            state.user = data;
            
        },
        [types.LOGOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        },
        [types.TITLE]: (state, data) => {
            state.title = data;
        }
    }
})

// export default new Vuex.Store({
//   state,
//   actions,
//   getters,
//   modules: {
//     cart,
//     products
//   },
//   strict: debug
// })
