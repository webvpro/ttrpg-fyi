import 'kleur/colors';
import { k as decodeKey } from './chunks/astro/server_BV1jJfoF.mjs';
import 'clsx';
import 'cookie';
import './chunks/astro-designed-error-pages_CK1D8HK3.mjs';
import 'es-module-lexer';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_BXIUCfvQ.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/15034/Projects/ttrpg-blog/","cacheDir":"file:///C:/Users/15034/Projects/ttrpg-blog/node_modules/.astro/","outDir":"file:///C:/Users/15034/Projects/ttrpg-blog/dist/","srcDir":"file:///C:/Users/15034/Projects/ttrpg-blog/src/","publicDir":"file:///C:/Users/15034/Projects/ttrpg-blog/public/","buildClientDir":"file:///C:/Users/15034/Projects/ttrpg-blog/dist/client/","buildServerDir":"file:///C:/Users/15034/Projects/ttrpg-blog/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DHA8xSEb.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DHA8xSEb.css"}],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/oauth","isIndex":false,"type":"endpoint","pattern":"^\\/oauth\\/?$","segments":[[{"content":"oauth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/oauth.ts","pathname":"/oauth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DHA8xSEb.css"}],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.DHA8xSEb.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/15034/Projects/ttrpg-blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/15034/Projects/ttrpg-blog/src/pages/about.astro",{"propagation":"none","containsHead":true}],["C:/Users/15034/Projects/ttrpg-blog/src/pages/blog/[...page].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/15034/Projects/ttrpg-blog/src/pages/blog/[slug].astro",{"propagation":"in-tree","containsHead":true}],["C:/Users/15034/Projects/ttrpg-blog/src/pages/login.astro",{"propagation":"none","containsHead":true}],["C:/Users/15034/Projects/ttrpg-blog/src/pages/signup.astro",{"propagation":"none","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["C:/Users/15034/Projects/ttrpg-blog/src/components/RecentBlogs.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/15034/Projects/ttrpg-blog/src/components/TopArticles.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/blog/[slug]@_@astro":"pages/blog/_slug_.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/oauth@_@ts":"pages/oauth.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/blog/[...page]@_@astro":"pages/blog/_---page_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","C:/Users/15034/Projects/ttrpg-blog/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_90kwZ_Xs.mjs","C:\\Users\\15034\\Projects\\ttrpg-blog\\.astro\\content-modules.mjs":"chunks/content-modules_CBv8qCJT.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_P9Bpsswu.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Growing Your New YouTube Channel with Effective SEO Strategies.mdx?astroPropagatedAssets":"chunks/Growing Your New YouTube Channel with Effective SEO Strategies_CwAVyZ9_.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Leveraging Google Ads for Increased Business Sales.mdx?astroPropagatedAssets":"chunks/Leveraging Google Ads for Increased Business Sales_BxqcagKT.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Leveraging Social Media Marketing for Business Growth.mdx?astroPropagatedAssets":"chunks/Leveraging Social Media Marketing for Business Growth__3JLz4Pw.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Maximizing Business Growth Through.mdx?astroPropagatedAssets":"chunks/Maximizing Business Growth Through_B69NvmQq.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Boosting Sales with Effective Search Engine Optimization (SEO).mdx?astroPropagatedAssets":"chunks/Boosting Sales with Effective Search Engine Optimization (SEO)_-jjRbXa-.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Strategies to Boost Sales Through Your Website.mdx?astroPropagatedAssets":"chunks/Strategies to Boost Sales Through Your Website_DGuR5zMf.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Utilizing YouTube for Business Growth.mdx?astroPropagatedAssets":"chunks/Utilizing YouTube for Business Growth_D_u3lHAx.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Using SEO Strategies for Business Growth.mdx?astroPropagatedAssets":"chunks/Using SEO Strategies for Business Growth_BGphztnR.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Growing Your New YouTube Channel with Effective SEO Strategies.mdx":"chunks/Growing Your New YouTube Channel with Effective SEO Strategies_CrW-fywH.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Leveraging Google Ads for Increased Business Sales.mdx":"chunks/Leveraging Google Ads for Increased Business Sales_miGy0th_.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Leveraging Social Media Marketing for Business Growth.mdx":"chunks/Leveraging Social Media Marketing for Business Growth_C3JFOaH0.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Maximizing Business Growth Through.mdx":"chunks/Maximizing Business Growth Through_CQ_1NIfZ.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Boosting Sales with Effective Search Engine Optimization (SEO).mdx":"chunks/Boosting Sales with Effective Search Engine Optimization (SEO)_Bn14Ycng.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Strategies to Boost Sales Through Your Website.mdx":"chunks/Strategies to Boost Sales Through Your Website_CbU_4qvA.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Utilizing YouTube for Business Growth.mdx":"chunks/Utilizing YouTube for Business Growth_D3TgdeQs.mjs","C:/Users/15034/Projects/ttrpg-blog/src/content/posts/Using SEO Strategies for Business Growth.mdx":"chunks/Using SEO Strategies for Business Growth_CMGQtJIS.mjs","\u0000@astrojs-manifest":"manifest_BC1P5Fut.mjs","C:\\Users\\15034\\Projects\\ttrpg-blog\\.astro\\content-assets.mjs":"chunks/content-assets_CU9q017z.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/outfit-latin-wght-normal.BKjeiFaL.woff2","/_astro/outfit-latin-ext-wght-normal.BKoAQiX9.woff2","/_astro/post-3.Dx5ppN7u.jpg","/_astro/post-6.BlZygGSH.jpg","/_astro/post-4.DdABWgJm.jpg","/_astro/post-1.B80GEPwL.jpg","/_astro/post-5.BqxV5jdu.jpg","/_astro/post-8.Cq-Nkyn3.jpg","/_astro/post-7.DcaYCs2r.jpg","/_astro/post-2.Bb0lURIa.jpg","/_astro/index.DHA8xSEb.css","/favicon.svg","/images/about.jpeg","/images/antonio.png","/images/bg.png","/images/rpg_pub_chars_banner.png","/images/ttrp_banner_2.png","/images/tttrp_gen_profile.png"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"FzBhMJZFiCUEWyKIkl9NtKogTwvu+m1A56ttrn/Kc+k="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
