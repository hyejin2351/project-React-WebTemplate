/* eslint-disable react/prefer-stateless-function */
import React from "react";
import debug from "debug";
import { ApolloConsumer } from "react-apollo";
import withAuth from "../../../lib/withAuth";

import MainLayout from "../../../layouts/MainLayout";
import SimpleSnackbarRender from "./snackbar_.jsx";

const log = debug("app:myPage");

class snackbarView extends React.Component {
  /**
   * Render the component.
   */
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <MainLayout apolloClient={client}>
            <SimpleSnackbarRender me={this.props.me} />
          </MainLayout>
        )}
      </ApolloConsumer>
    );
  }
}

export default withAuth(snackbarView);
