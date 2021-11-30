import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    getters: getters,
	state: state,
	mutations: mutations,
    actions: actions,
    plugins: [createPersistedState()]
})
