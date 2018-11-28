/* eslint-disable react/prefer-stateless-function */
/**
 * Created by jcdev00 on 18. 10. 23.
 */

import React from "react";
import PropTypes from "prop-types";
import debug from "debug";

import WithRoot from "../lib/withRoot";
import MenuAppBar from "../components/appBar";

const log = debug("app:MainLayout");

class MainLayout extends React.Component {
  /**
   * Render the component.
   */
  render() {
    const { children, apolloClient } = this.props;

    return (
      <div>
        <MenuAppBar apolloClient={apolloClient} />
        {children}
      </div>
    );
  }
}
MainLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default WithRoot(MainLayout);
