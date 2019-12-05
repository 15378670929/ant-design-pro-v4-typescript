import { fakeAccountLogin1 } from './service'
import { routerRedux } from 'dva/router';
import { getPageQuery, setAuthority } from './util';

const model = {
  namespace: 'login1',
  state: {
    username: '',
    password: '',
    type: '',
    remember: true
  },

  effects: {
    *login({ payload, callback } : {payload: any, callback: any}, { put, call } : {put: any, call: any}) {
      const resp = yield call(fakeAccountLogin1, payload)
      console.log(resp, payload, '------------------')
      yield put({
        type: 'loginInfo',
        payload: resp,
      })
      callback()
      if (resp.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    }
  },

  reducers: {
    loginInfo( state = [], action: any ) {
      console.log(action)
      setAuthority(action.payload.currentAuthority)
      return {...state, action}
    }
  }
}

export default model