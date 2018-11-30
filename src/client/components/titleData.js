/* eslint-disable import/prefer-default-export */
/* eslint-disable indent */
// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

//아이콘
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { set } from 'mongoose';

export const mailFolderListItems = (
    <div>
        <Link href="/users/board/boardList">
            <ListItem button>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="게시판" />
            </ListItem>
        </Link>
        <Divider />
        <Link href="/users/lists/list">
            <ListItem button>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Lists" />
            </ListItem>
        </Link>
        <Link href="/users/drawers/drawer">
            <ListItem button>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Drawer" />
            </ListItem>
        </Link>
        <Link href="/users/snackbars/snackbar">
            <ListItem button>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Snackbar" />
            </ListItem>
        </Link>
  </div>
);
