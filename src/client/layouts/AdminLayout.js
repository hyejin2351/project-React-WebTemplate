/**
 * Created by jcdev00 on 18. 10. 23.
 */

import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';

import WithRoot from '../lib/withRoot';
import MngAppBar from '../components/admin/mngAppBar';

const log = debug('app:AdminLayout');

class MainLayout extends React.Component {
    /**
     * Render the component.
     */
    render() {
        const { children, apolloClient } = this.props;

        return (
            <div>
                <MngAppBar apolloClient={apolloClient}></MngAppBar>
                {
                    children
                }
            </div>
        );
    }
}
MainLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default WithRoot(MainLayout);
