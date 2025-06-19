import { c as createComponent, m as maybeRenderHead, f as renderTemplate, a as createAstro, d as renderComponent, b as addAttribute } from './astro/server_BV1jJfoF.mjs';
import 'kleur/colors';
import 'clsx';

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="footer md:px-10 px-5 py-4 border-t border-base-300 flex flex-col lg:flex-row justify-between items-center font-outfit"> <p>Copyright © 2024 - All rights reserved</p> <div class="flex items-center"> <svg class="h-6 w-6" width="32" height="32" viewBox="0 0 415 415" xmlns="http://www.w3.org/2000/svg"> <rect x="82.5" y="290" width="250" height="125" rx="62.5" fill="#1AD1A5"></rect> <circle cx="207.5" cy="135" r="130" fill="black" fill-opacity=".3"></circle> <circle cx="207.5" cy="135" r="125" fill="white"></circle> <circle cx="207.5" cy="135" r="56" fill="#FF9903"></circle> </svg> <h2>Made with Daisy UI</h2> </div> <nav class="md:place-self-center md:justify-self-end"> <div class="grid grid-flow-col gap-4"> <ul class="menu menu-horizontal px-1 gap-5 md:text-lg font-semibold"> <li><a href="/">Home</a></li> <li> <a href="/blog">Articles</a> </li> <li><a href="/about">About</a></li> </ul> </div> </nav> </footer>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", `<button id="themeToggle" class="btn btn-circle btn-ghost swap swap-rotate"> <svg class="w-6 h-6 fill-current swap-off" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"></path> </svg> <svg class="w-6 h-6 fill-current swap-on" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"></path> </svg> </button> <script>
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  if (theme === 'light') {
    document.documentElement.setAttribute("data-theme", 'light');
    document.getElementById("themeToggle").classList.remove('swap-active');
  } else {
    document.documentElement.setAttribute("data-theme", 'dark');
    document.getElementById("themeToggle").classList.add('swap-active');
  }

  window.localStorage.setItem('theme', theme);

  const handleToggleClick = () => {
    const element = document.documentElement;
    const isDark = element.dataset.theme === "dark";
    localStorage.setItem("theme", isDark ? "light" : "dark");
    element.setAttribute('data-theme', isDark ? "light" : "dark");
    if (isDark) {
      document.getElementById("themeToggle").classList.remove("swap-active");
    } else {
      document.getElementById("themeToggle").classList.add("swap-active");
    }
  }

  document.getElementById("themeToggle").addEventListener("click", handleToggleClick);
<\/script>`])), maybeRenderHead());
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/ThemeToggle.astro", void 0);

const $$Astro = createAstro();
const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Navbar;
  const { user } = Astro2.locals;
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Articles", href: "/blog" },
    { name: "About", href: "/about" }
  ];
  const pathname = new URL(Astro2.request.url).pathname;
  return renderTemplate`${maybeRenderHead()}<header class="sticky top-0 z-50"> <nav class="navbar bg-base-100/90 shadow-sm font-outfit backdrop-blur-lg justify-center items-center py-2 md:px-10 px-5"> <div class="navbar-start"> <div class="dropdown"> <button aria-label="button" tabindex="0" role="button" class="btn btn-ghost lg:hidden"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path> </svg> </button> <ul class="menu dropdown-content menu-md z-[1] mt-3 w-52 gap-2 rounded-box bg-base-100 p-2 shadow"> ${navigation.map((item) => renderTemplate`<li> <a${addAttribute(item.href, "href")}>${item.name}</a> </li>`)} </ul> </div> ${user ? renderTemplate`<a class="btn btn-ghost text-xl" href="/dashboard"> Account</a>` : renderTemplate`<a class="btn btn-ghost text-xl" href="/login"> Login</a>
        <a class="btn btn-ghost text-xl" href="/signup"> Sign Up</a>`} <a class="btn btn-ghost text-xl" href="/"> Blog</a> </div> <div class="navbar-center hidden lg:flex"> ${navigation.map((item) => renderTemplate`<nav class="menu menu-horizontal"> <a${addAttribute(item.href, "href")}${addAttribute(`hover:text-primary hover:bg-primary/10 transition flex py-2 px-4 rounded-md ${pathname === item.href ? "text-primary bg-primary/10" : ""}`, "class")}> ${item.name} </a> </nav>`)} </div> <div class="navbar-end"> ${renderComponent($$result, "ThemeToggle", $$ThemeToggle, {})} </div> </nav> </header>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/Navbar.astro", void 0);

export { $$Navbar as $, $$Footer as a };
