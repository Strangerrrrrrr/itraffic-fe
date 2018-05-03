export default function ({ store, redirect, route, error }) {
  if (store.state.access_token=='') {
    store.commit('SET_TEMP_INFO', '请先登录！')
    return redirect('/')
  }
}