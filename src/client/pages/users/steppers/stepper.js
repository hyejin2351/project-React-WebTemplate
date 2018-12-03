/* eslint-disable react/prefer-stateless-function */
import React from "react";
import debug from "debug";
import { ApolloConsumer } from "react-apollo";
import withAuth from "../../../lib/withAuth";

import MainLayout from "../../../layouts/MainLayout";
import StepperRender from "./stepper_.jsx";

const log = debug("app:myPage");

class stepperView extends React.Component {
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <MainLayout apolloClient={client}>
            <StepperRender me={this.props.me} />
          </MainLayout>
        )}
      </ApolloConsumer>
    );
  }
}

export default withAuth(stepperView);
