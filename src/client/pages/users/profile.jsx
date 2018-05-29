import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import renderHTML from 'react-render-html';

import Main from '../../layouts/Main';
import Blank from '../../layouts/Blank';
import timeAgo from '../../helpers/convertNumberToTimeAgo';

const PageView = ({
  me = {},
  currentURL,
  onEmailChange,
  onAboutChange,
 }) => {
  return (
    <Main currentURL = {currentURL} isFooterVisible={false} >
      <tr>
        <td>
          <form className="profileform" method="post" action="/xuser">
            <input type="hidden" name="id" value={me.id} />
            <table style={{ border: '0px' }}>
              <tbody>
                <tr className="athing">
                  <td style={{ verticalAlign: 'top' }}>user:</td>
                  <td>
                    <Link href="/user?id=clintonwoo">
                      <a className="hnuser">
                        <font color="#3c963c">{me.id}</font>
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>email:</td>
                  <td>
                    <input type="text" name="uemail" defaultValue={me.email} onChange={onEmailChange} size="60" />
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>created:</td><td>{timeAgo(me.creationTime || 0)}</td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>about:</td>
                  <td>
                    <textarea defaultValue={renderHTML(me.about || '')} onChange={onAboutChange} cols="60" rows="5" wrap="virtual" name="about" />
                    <font size="-2">
                      <Link prefetch href="/formatdoc">
                        <a tabIndex="-1">
                          <font color="#afafaf">help</font>
                        </a>
                      </Link>
                    </font>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>showdead:</td>
                  <td>
                    <select defaultValue="no" name="showd">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>noprocrast:</td>
                  <td>
                    <select defaultValue="no" name="nopro">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>maxvisit:</td>
                  <td>
                    <input type="text" name="maxv" defaultValue="20" size="16" />
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>minaway:</td>
                  <td>
                    <input type="text" name="mina" defaultValue="180" size="16" />
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>delay:</td>
                  <td>
                    <input type="text" name="delay" defaultValue="0" size="16" />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/changepw">
                      <a><u>change password</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/submitted?id=clintonwoo">
                      <a><u>submissions</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/threads?id=clintonwoo">
                      <a><u>comments</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/hidden">
                      <a><u>hidden</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/upvoted?id=clintonwoo">
                      <a>
                        <u>upvoted submissions</u>
                      </a>
                    </Link>
                    {' / '}
                    <Link prefetch href="/upvoted?id=clintonwoo&amp;comments=t">
                      <a>
                        <u>comments</u>
                      </a>
                    </Link>
                  &nbsp;&nbsp;
                    <span style={{ fontStyle: 'italic' }}>(private)</span>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/favorites?id=clintonwoo">
                      <a>
                        <u>favorite submissions</u>
                      </a>
                    </Link>
                    {' / '}
                    <Link prefetch href="/favorites?id=clintonwoo&amp;comments=t">
                      <a>
                        <u>comments</u>
                      </a>
                    </Link>
                  &nbsp;&nbsp;
                    <span style={{ fontStyle: 'italic' }}>(shared)</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input type="submit" value="update" />
          </form>
          <br />
          <br />
        </td>
      </tr>
    </Main>
  );
};

export default PageView;
