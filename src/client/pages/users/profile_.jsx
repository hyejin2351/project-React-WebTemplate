import React from 'react';
import Link from 'next/link';

export default ({
  me,
  logout,
  unregister,
}) => (
  <React.Fragment>
    <br />            
    <p>Hello {me.id}!</p>
    <br />
    <br />
    <Link href="/"><a>Go to Main</a></Link>
    <br />
    <br />
    <button onClick={logout}>Log out</button>
    <br />
    <br />
    <button onClick={unregister}>Unregister</button>
  </React.Fragment>
)

