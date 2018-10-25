import Router from 'next/router';

export default (context, target, isReplace = true) => {
  console.log('>>>>>>>>>>>>>>>>>>> REDIRECTING: context is ', !!(context));
  if (context) {
    // server
    // 303: "See other"
    context.res.writeHead(303, { Location: target });
    context.res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    if(isReplace)
      Router.replace(target);
    else
      Router.push(target);
  }
};

export function historyBack() {
  Router.back();
};
