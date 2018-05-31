import Router from 'next/router';

export default (context, target) => {
  console.log('>>>>>>>>>>>>>>>>>>> REDIRECTING: context is ', !!(context));
  if (context) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
