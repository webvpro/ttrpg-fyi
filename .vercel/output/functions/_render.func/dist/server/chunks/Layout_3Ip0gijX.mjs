import { c as createComponent, a as createAstro, b as addAttribute, r as renderHead, d as renderComponent, e as renderSlot, f as renderTemplate } from './astro/server_DpDTV1Jg.mjs';
import 'kleur/colors';
import { $ as $$Navbar, a as $$Footer } from './Navbar_jHOi0y6E.mjs';
/* empty css                         */

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <div class="px-5 xl:px-10 max-w-[100rem] mx-auto"> ${renderSlot($$result, $$slots["default"])} </div> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
