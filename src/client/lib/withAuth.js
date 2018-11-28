import React from "react";
import debug from "debug";

import redirect from "./redirect";
import checkLoggedIn from "./checkLoggedIn";

const log = debug("app:withAuth");

export default Component =>
  class WithAuth extends React.Component {
    static async getInitialProps(context, apolloClient) {
      const { query } = context;
      const { me } = await checkLoggedIn(context);
      let compProps = {};
      if (Component.getInitialProps) {
        compProps = await Component.getInitialProps(context);
      }
      log(me);
      return { me, query };
    }

    componentDidMount() {
      const { me } = this.props;
      if (!me || !me.id) {
        // If not signed in, send them somewhere more useful
        redirect(null, "/users/signin");
      }
    }

    render() {
      if (!this.props.me) return <div>Loading...</div>;

      return <Component {...this.props} me={this.props.me} />;
    }
  };
