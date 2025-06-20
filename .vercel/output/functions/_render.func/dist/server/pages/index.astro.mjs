import { c as createComponent, m as maybeRenderHead, d as renderComponent, f as renderTemplate, a as createAstro, b as addAttribute, r as renderHead, e as renderSlot } from '../chunks/astro/server_BoQdInc3.mjs';
import 'kleur/colors';
import '../chunks/index_DfOMS8cV.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_C6rWLV7L.mjs';
import { g as getCollection } from '../chunks/_astro_content_DTSq3Fbj.mjs';
import { $ as $$BlogCard } from '../chunks/BlogCard_C0cZixkV.mjs';
import { $ as $$Navbar, a as $$Footer } from '../chunks/Navbar_BWb5uyr8.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Hero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="hero p-0" style="background-image: url(/images/bg.png);"> <div class="w-full p-0 gap-0 flex flex-col justify-center items-center"> <div class="text-center pt-10"> <div class="badge badge-outline badge-lg font-outfit">Hello!</div> <h1 class="text-4xl md:text-5xl xl:text-7xl font-outfit font-semibold brightness-150">
This is <span class="text-primary">TTRPG.fyi,</span> <br>
Table Top RPG Resources for You!
</h1> </div> <img src="/images/ttrp_banner_2.png" alt="Antonio" class="max-w-lg md:max-w-4xl mt-4 absolute"> ${renderComponent($$result, "Image", $$Image, { "class": "invisible", "src": "/images/bg.png", "alt": "bg", "height": 600, "width": 900 })} <div class="w-full bg-base-200 py-20 flex flex-col font-outfit justify-center items-center z-40"> <h1 class="text-xl font-light">follow us on</h1> <div class="flex justify-center lg:justify-start space-x-4 mt-4"> <a class="btn btn-circle btn-md" href="https://www.x.com" aria-label="twitter"> <svg viewBox="0 0 24 24" aria-hidden="true" class="h-8 w-8"><path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" fill="currentColor"></path></svg> </a> <a class="btn btn-circle btn-md" href="https://www.linkedin.com" aria-label="linkedin"> <svg viewBox="0 0 24 24" aria-hidden="true" class="h-8 w-8"><path fill="currentColor" d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path></svg> </a> <a class="btn btn-circle btn-md" href="https://www.youtube.com" aria-label="youtube"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" class="h-8 w-8"> <path fill="currentColor" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"></path> </svg> </a> <a class="btn btn-circle btn-md" href="https://www.instagram.com" aria-label="instagram"> <svg viewBox="0 0 24 24" aria-hidden="true" class="h-8 w-8"><path fill="currentColor" d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"></path><path fill="currentColor" d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"></path></svg> </a> </div> </div> </div> </div>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/Hero.astro", void 0);

const $$TopArticles = createComponent(async ($$result, $$props, $$slots) => {
  const topArticles = (await getCollection("posts")).filter(
    (post) => post.data.topArticle === true
  );
  const maxCardsToShow = 4;
  return renderTemplate`${maybeRenderHead()}<div> <div class="mb-10"> <h1 class="text-4xl md:text-5xl font-outfit font-semibold brightness-150">
Top Articles
</h1> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-10"> ${renderComponent($$result, "BlogCard", $$BlogCard, { "posts": topArticles, "maxCardsToShow": maxCardsToShow })} </div> </div>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/TopArticles.astro", void 0);

const $$RecentBlogs = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("posts");
  const maxCardsToShow = 6;
  const displayedPosts = allPosts.slice(0, maxCardsToShow);
  return renderTemplate`${maybeRenderHead()}<div class=""> <div class="py-10 max-w-lg"> <h1 class="text-4xl md:text-5xl font-outfit font-semibold brightness-150">
Recent Articles
</h1> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-10"> ${renderComponent($$result, "BlogCard", $$BlogCard, { "posts": displayedPosts, "maxCardsToShow": maxCardsToShow })} </div> </div>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/RecentBlogs.astro", void 0);

const $$NewsletterCard = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center py-14"> <div class="card image-full"> ${renderComponent($$result, "Image", $$Image, { "src": "https://images.unsplash.com/photo-1637825891028-564f672aa42c?q=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "height": 500, "width": 1900, "alt": "newsletter", "format": "webp", "class": "object-cover h-56 md:h-72 lg:h-96 rounded-2xl" })} <div class="card-body flex justify-center font-outfit"> <div class="flex md:justify-center md:items-center flex-col"> <div class="card-title font-bold text-2xl md:text-3xl"> <h1>Stay up to date</h1> </div> <p class="opacity-90 mt-2 text-sm md:text-lg">
Get notified when I publish something new.
</p> </div> <div class="md:mt-8 mt-5 flex items-center md:justify-center"> <input type="text" placeholder="Email address" class="input input-bordered w-full max-w-sm text-base-content"> <button class="btn ml-3">Join</button> </div> </div> </div> </div>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/NewsletterCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$FeaturedPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$FeaturedPost;
  const { featuredPost } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="py-20"> <div class="card lg:card-side p-7 ring-1 ring-neutral/20 bg-base-300/40 rounded-3xl font-outfit"> ${renderComponent($$result, "Image", $$Image, { "src": featuredPost.data.image, "alt": featuredPost.data.title, "format": "webp", "loading": "lazy", "class": "w-full lg:max-w-sm xl:max-w-2xl h-96 rounded-xl object-cover" })} <div class="card-body px-0 lg:ml-10"> <div class="badge badge-outline">Featured Post</div> <h1 class="card-title text-2xl md:text-4xl font-black text-base-content py-4"> ${featuredPost.data.title} </h1> <p class="text-base-content font-light opacity-70 text-sm md:text-lg"> ${featuredPost.data.description} </p> <div class="mt-4"> <a${addAttribute(`/blog/${featuredPost.slug}`, "href")}> <button class="btn rounded-full btn-sm md:btn-md bg-primary/10 text-primary hover:bg-primary/15">
Read Article
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"></path> </svg> </button> </a> </div> </div> </div> </div>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/components/FeaturedPost.astro", void 0);

const $$Astro = createAstro();
const $$HomeLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HomeLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderComponent($$result, "Navbar", $$Navbar, {})} <div class="max-w-[100rem] mx-auto"> ${renderSlot($$result, $$slots["default"])} </div> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/layouts/HomeLayout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const posts = await getCollection("posts");
  const featuredPost = posts.find((post) => post.data.featuredPost === true);
  return renderTemplate`${renderComponent($$result, "HomeLayout", $$HomeLayout, { "title": "Home", "description": "Welcome to my blog" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full"> ${renderComponent($$result2, "Hero", $$Hero, {})} <div class="px-5 xl:px-10"> ${renderComponent($$result2, "LatestBlogs", $$RecentBlogs, {})} ${renderComponent($$result2, "FeaturedPost", $$FeaturedPost, { "featuredPost": featuredPost })} ${renderComponent($$result2, "TopArticles", $$TopArticles, {})} ${renderComponent($$result2, "NewsletterCard", $$NewsletterCard, {})} </div> </div> ` })}`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/pages/index.astro", void 0);

const $$file = "C:/Users/15034/Projects/ttrpg-blog/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
