import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, d as renderComponent, f as renderTemplate } from './astro/server_DpDTV1Jg.mjs';
import 'kleur/colors';
import './index_DfOMS8cV.mjs';
import { $ as $$Image } from './_astro_assets_DmktoB76.mjs';

const $$Astro = createAstro();
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { posts, maxCardsToShow } = Astro2.props;
  return renderTemplate`${posts.slice(0, maxCardsToShow).map((post) => renderTemplate`${maybeRenderHead()}<article class="card lg:card-side ring-1 ring-base-content/10 bg-base-300/20 p-7 rounded-3xl"><a class="w-full"${addAttribute(`/blog/${post.slug}`, "href")}>${renderComponent($$result, "Image", $$Image, { "src": post.data.image, "format": "webp", "class": "w-full h-52 rounded-xl object-cover", "alt": post.data.title })}</a><div class="card-body p-0 lg:ml-7 font-outfit"><h2 class="text-xs lg:text-sm text-base-content/70"><span>${post.data.category}</span><span class="text-xl font-bold text-primary">.</span><time class="text-xs lg:text-sm text-base-content/70">${post.data.date}</time></h2><a${addAttribute(`/blog/${post.slug}`, "href")}><h1 class="font-semibold text-lg lg:text-xl">${post.data.title}</h1></a><div><p class="text-sm lg:text-base opacity-70 line-clamp-2 xl:line-clamp-3">${post.data.description}</p></div><a${addAttribute(`/blog/${post.slug}`, "href")} class="mt-auto flex items-center"><h2 class="text-sm font-semibold text-primary">Read article</h2><svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="ml-1 h-4 w-4 stroke-current text-primary"><path d="M6.75 5.75 9.25 8l-2.5 2.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a></div></article>`)}`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/BlogCard.astro", void 0);

export { $$BlogCard as $ };
