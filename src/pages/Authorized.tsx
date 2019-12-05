import React, { Component } from 'react';
import Redirect from 'umi/redirect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Authorized from '@/utils/Authorized';
import { ConnectProps, ConnectState, Route, UserModelState } from '@/models/connect';
import PageLoading from '@/components/PageLoading';

interface AuthComponentProps extends ConnectProps {
  user: UserModelState;
}

const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  console.log(routeData, path)
  routeData.forEach(route => {
    if (route.authority) {
      authorities = route.authority;
    }
    // match prefix
    if (pathToRegexp(`${route.path}(.*)`).test(path)) {
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  console.log(authorities)
  return authorities;
};

const AuthComponent: React.FC<AuthComponentProps> = ({
  children,
  route = {
    routes: [],
  },
  location = {
    pathname: '',
  },
  user,
}) => {
  const { currentUser } = user;
  const { routes = [] } = route;
  const isLogin = currentUser && currentUser.name;
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routes) || ''}
      noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
};

interface SecurityLayoutState {
  isReady: boolean;
}

class AuthComponent2 extends Component<AuthComponentProps>{
  constructor(props: any) {
    super(props)
  }

  state: SecurityLayoutState = {
    isReady: false,
  };

  componentWillMount(){
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }
  
  componentDidMount() {
    let delaySet = ()=>this.setState({isReady: true})
    setTimeout(() => {delaySet();console.log(this.props)},1000)
  }


  render() {
    const { currentUser } = this.props.user;
    const { routes = [] } = this.props.route;
    const isLogin = currentUser && currentUser.name;
    const { isReady } = this.state;
    if(isReady){
      return (
        <Authorized
          authority={getRouteAuthority(location.pathname, routes) || ''}
          noMatch={isLogin ? <Redirect to="/exception/403" /> : <Redirect to="/user/login" />}
        >
          {this.props.children}
        </Authorized>
      )
    }else{
      return <PageLoading />
    }
  }
}

export default connect(({ user }: ConnectState) => ({
  user,
}))(AuthComponent2);
