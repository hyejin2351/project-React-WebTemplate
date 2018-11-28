/* eslint-disable react/react-in-jsx-scope */
/**
 * Created by jcdev00 on 18. 10. 24.
 */

export default ({ message }) => (
  <aside>
    {message}
    <style jsx>{`
      aside {
        padding: 1.5em;
        font-size: 14px;
        color: white;
        background-color: red;
      }
    `}</style>
  </aside>
);
