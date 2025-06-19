import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BqIpkR-w.mjs';
import { manifest } from './manifest_C8cg0Q_s.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/account.astro.mjs');
const _page3 = () => import('./pages/blog/_slug_.astro.mjs');
const _page4 = () => import('./pages/blog/_---page_.astro.mjs');
const _page5 = () => import('./pages/login.astro.mjs');
const _page6 = () => import('./pages/oauth.astro.mjs');
const _page7 = () => import('./pages/signup.astro.mjs');
const _page8 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/account.astro", _page2],
    ["src/pages/blog/[slug].astro", _page3],
    ["src/pages/blog/[...page].astro", _page4],
    ["src/pages/login.astro", _page5],
    ["src/pages/oauth.ts", _page6],
    ["src/pages/signup.astro", _page7],
    ["src/pages/index.astro", _page8]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "390ac791-b974-4772-a9a3-cf8bfef28f71",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
