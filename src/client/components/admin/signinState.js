import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from 'next/link';

//아이콘
import PersonIcon from '@material-ui/icons/Person';

class SignInToggle extends React.Component {
    state = {
        anchorEl: null,
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    render() {
        const {anchorEl} = this.state;

        return (
            <div>
                <Button
                    aria-owns={anchorEl ? 'simple-menu' : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <PersonIcon/>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/users/myPage">
                            마이 페이지
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link href="/">
                            <a>로그아웃</a>
                        </Link>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
}

export default SignInToggle;