import React from 'react';
import debug from 'debug';

import redirect from './redirect';
import checkLoggedIn from './checkLoggedIn';
import Error from 'next/error';

const config = require('../config');

const log = debug('app:withAdmin');

export default Component => class WithAdmin extends React.Component {
  static async getInitialProps(context, apolloClient) {
    let ipAddress;

    if (typeof window === 'undefined') {
      ipAddress = context.req.connection.remoteAddress//assuming the property is always available
    } else {
      // ipAddress = window.__NEXT_DATA__.props.pageProps.ipAddress;
      ipAddress = window.location.hostname;
      log('window: ', window);
      log('window.__NEXT_DATA__: ', window.__NEXT_DATA__);
      log('window.location.hostname: ', window.location.hostname);
    }

    if(ipAddress) {
      if(ipAddress.includes('::1') || ipAddress.includes('localhost')) {
        ipAddress = config.ADMIN_IP;
      } else {
        //ip 주소 형태 ::ffff:127.0.0.1
        if(ipAddress.lastIndexOf(':') >= 0)
          ipAddress = ipAddress.substring(ipAddress.lastIndexOf(':') + 1);

        //VirtualBox OS를 이용해서 개발중일때 local IP가 10.0.2.2이므로 127.0.0.1로 변환
        if(ipAddress.includes('10.0.2.2'))
          ipAddress = config.ADMIN_IP;
      }
    }

    const { me } = await checkLoggedIn(context);
    let compProps = {};
    if (Component.getInitialProps) {
      compProps = await Component.getInitialProps(context);
    }
    return { me, ipAddress };
  }

  constructor(props) {
    super(props);
    this.state = {
      statusCode: 200,
    };
  }

  componentDidMount() {
    const { ipAddress, me } = this.props;

    console.log('--------------------------');

    console.log(ipAddress);
    console.log(me);

    // 서버에 SSH 터널링이 된 경우
    if(config.ADMIN_IP.includes(ipAddress)) {
      if (!me || !me.id) {
        // If not signed in, send them somewhere more useful
        redirect(null, '/admin/signin');
      } else if(!me.roles || !me.roles.includes('admin')) {
        this.setState({
          statusCode: 401,
        });
      }
    } else {
      this.setState({
        statusCode: 401,
      });

      console.log('go error page');
    }
  }

  render() {
    console.log('this.props = ' + JSON.stringify(this.props));
    
    if (this.state.statusCode !== 200) {
      return <Error statusCode={this.state.statusCode} />
    }

    if (!this.props.me) return (<div>Loading...</div>);

    return (
        <Component {...this.props} me={this.props.me} />
    );
  }
};
