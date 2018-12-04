import React from "react";
import debug from "debug";
import { ApolloConsumer } from "react-apollo";

import MainLayout from "../layouts/MainLayout";
import IndexView from "./index_.jsx";

const log = debug("app:index");

class IndexPage extends React.Component {
  handleClick(event, client) {
    log("event: ", event.target.id);
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <MainLayout apolloClient={client}>
            <IndexView onHandleClick={e => this.handleClick(e, client)} />
          </MainLayout>
        )}
      </ApolloConsumer>
    );
  }
}

export default IndexPage;
