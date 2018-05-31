import React from 'react';
import Link from 'next/link';

export default ({
  onSubmit,
  errorMessage,
  refEmail,
  refPassword
}) => (
<React.Fragment>
  {/*<SignBox />*/}

  <form onSubmit={onSubmit} >
    {errorMessage && <p>{errorMessage}</p>}
    <input name="email" placeholder="Email" ref={refEmail} />
    <br />
    <input name="password" placeholder="Password" ref={refPassword} type="password" />
    <br />
    <button>Sign in</button>
  </form>

  <hr />
  <span>Already have an accoun?????????</span> <Link prefetch href="./create-account"><a>Create account</a></Link>
</React.Fragment>
);
