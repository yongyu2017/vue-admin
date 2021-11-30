export default {
	setUserInfo: ({ commit }, { userInfo }) => commit('SET_USER_INFO', userInfo),
	setToken: ({ commit }, { token }) => commit('SET_TOKEN', token),
    updateDocumentClientHeight: ({ commit }, { height }) => commit('UPDATE_DOCUMENT_CLIENT_HEIGHT', height),
    updateMenuList: ({ commit }, { menuList }) => commit('UPDATE_MENU_LIST', menuList),
    updateMenuActiveName: ({ commit }, { menuActiveName }) => commit('UPDATE_MENU_ACTIVE_NAME', menuActiveName),
    updateMainTabs: ({ commit }, { mainTabs }) => commit('UPDATE_MENU_ACTIVE_NAME', mainTabs),
    updateMainTabsActiveName: ({ commit }, { mainTabsActiveName }) => commit('UPDATE_MENU_ACTIVE_NAME', mainTabsActiveName),
}
