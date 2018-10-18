// This file is shared across the demos.

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '../../../../node_modules/next/link';

//아이콘
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import PeopleIcon from '@material-ui/icons/People';
import ListAlt from '@material-ui/icons/ListAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';


export const mailFolderListItems = (
    <div>
        <Link href="/board/users/boardList">
            <ListItem button>
                <ListItemIcon>
                    <ListAlt />
                </ListItemIcon>
                <ListItemText primary="게시판"/>
            </ListItem>
        </Link>
    </div>
);