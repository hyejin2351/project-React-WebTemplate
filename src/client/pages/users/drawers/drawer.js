/* eslint-disable import/first */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import debug from "debug";
import { ApolloConsumer } from "react-apollo";
import withAuth from "../../../lib/withAuth";

import MainLayout from "../../../layouts/MainLayout";
import DrawewrViewRender from "./drawer_.jsx";

const log = debug("app:myPage");

class drawerView extends React.Component {
  /**
   * Render the component.
   */
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <MainLayout apolloClient={client}>
            <DrawewrViewRender me={this.props.me} />
          </MainLayout>
        )}
      </ApolloConsumer>
    );
  }
}

export default withAuth(drawerView);
