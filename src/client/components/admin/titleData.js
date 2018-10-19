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
import ListAltIcon from '@material-ui/icons/ListAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';


export const mailFolderListItems = (
    <div>
        <Link href="/admin">
            <ListItem button>
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="마이 페이지"/>
            </ListItem>
        </Link>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <Link href="/admin/board/boardList">
            <ListItem button>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="게시판 관리"/>
            </ListItem>
        </Link>

        <Link href="/admin/membersList">
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="회원 관리"/>
            </ListItem>
        </Link>
    </div>
);