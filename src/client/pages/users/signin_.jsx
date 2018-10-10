import React from 'react';
import Link from 'next/link';

export default ({
    onSubmit,
    onChange,
    onFacebook,
    onGoogle,
    onKakao,
    errors,
}) => (
    <React.Fragment>
        <form onSubmit={onSubmit}>
            {(errors && errors.message) && <p className="error-message">{errors.message}</p>}
            <input name="email" placeholder="Email" onChange={onChange}/>
            <br />
            <input name="password" placeholder="Password" onChange={onChange} type="password"/>
            <br />
            <button>Sign in</button>
        </form>
        <hr />
        <span>No account?</span> <Link prefetch href="./signup"><a>Create account</a></Link>
        <br />
        <button onClick={onFacebook}>facebook</button>
        <button onClick={onGoogle}>google</button>
        <button onClick={onKakao}>kakao</button>
    </React.Fragment>
);
