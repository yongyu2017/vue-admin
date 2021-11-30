const mutations = {
    SET_USER_INFO (state, v) {
		state.userInfo = v
	},
    SET_TOKEN (state, v) {
		state.token = v
	},
    UPDATE_DOCUMENT_CLIENT_HEIGHT (state, v) {
        state.documentClientHeight = v
    },
    UPDATE_MENU_LIST (state, v) {
        state.menuList = v
    },
    UPDATE_MENU_ACTIVE_NAME (state, v) {
        state.menuActiveName = v
    },
    RESET_STORE (state) {
        state.token= '';
        state.userInfo= {};
    },
    UPDATE_MAIN_TABS (state, v) {
        state.mainTabs = v
    },
    UPDATE_MAIN_TABS_ACTIVE_NAME (state, v) {
        state.mainTabsActiveName = v
    },
}

export default mutations
