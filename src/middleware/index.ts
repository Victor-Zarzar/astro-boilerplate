import { defineMiddleware } from "astro:middleware";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware((url, next) => {
  // console.log('middleware, url:', url.pathname);
  return next();
});
