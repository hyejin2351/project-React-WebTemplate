import React from 'react';
import Link from 'next/link';

export default ({
  onSubmit,
  onChange,
  errors,
}) => (
<React.Fragment>
  <form onSubmit={onSubmit} >
    {errors.message && <p className="error-message">{errors.message}</p>}
    <input name="email" placeholder="Email" onChange={onChange} />
    <br />
    <input name="password" placeholder="Password" onChange={onChange} type="password" />
    <br />
    <button>Sign in</button>
  </form>
  <hr />
  <span>Already have an accoun?</span> <Link prefetch href="./create-account"><a>Create account</a></Link>
</React.Fragment>
);
