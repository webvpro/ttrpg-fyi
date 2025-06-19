import { c as createComponent, d as renderComponent, f as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DpDTV1Jg.mjs';
import 'kleur/colors';
import '../chunks/index_DfOMS8cV.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_DmktoB76.mjs';
import { $ as $$Layout } from '../chunks/Layout_3Ip0gijX.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About", "description": "About me and my work" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col xl:flex-row justify-center items-center xl:gap-20 gap-6 mt-10 md:mt-20 mb-20 md:mb-32 font-outfit"> <div class="md:mt-0 mt-6"> ${renderComponent($$result2, "Image", $$Image, { "src": "/images/tttrp_gen_profile.png", "alt": "TTRPG.fyi profile image", "height": 400, "width": 400, "class": "rounded-xl" })} </div> <div class="max-w-lg"> <h1 class="text-3xl md:text-4xl lg:text-5xl font-black brightness-150">
I'm Antonio, a digital marketer and the founder of a marketing agency.
</h1> <div class="space-y-7 mt-6"> <p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
          necessitatibus deserunt suscipit ad voluptas beatae ratione. At dicta,
          repudiandae, mollitia placeat fuga nihil doloribus vel voluptas error
          quae consequuntur repellendus.
</p> <p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
          necessitatibus deserunt suscipit ad voluptas beatae ratione. At dicta,
          repudiandae, mollitia placeat fuga nihil doloribus vel voluptas error
          quae consequuntur repellendus.
</p> <p>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
          necessitatibus deserunt suscipit ad voluptas beatae ratione. At dicta,
          repudiandae, mollitia placeat fuga nihil doloribus vel voluptas error
          quae consequuntur repellendus.
</p> </div> </div> <div class="mt-6 xl:mt-0 flex xl:flex-col gap-4"> <a class="btn btn-circle" href="https://www.x.com" aria-label="twitter"> <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6"><path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z" fill="currentColor"></path></svg> </a> <a class="btn btn-circle" href="https://www.linkedin.com" aria-label="linkedin"> <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6"><path fill="currentColor" d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"></path></svg> </a> <a class="btn btn-circle" href="https://www.youtube.com" aria-label="youtube"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 461.001 461.001" class="h-6 w-6"> <path fill="currentColor" d="M365.257,67.393H95.744C42.866,67.393,0,110.259,0,163.137v134.728 c0,52.878,42.866,95.744,95.744,95.744h269.513c52.878,0,95.744-42.866,95.744-95.744V163.137 C461.001,110.259,418.135,67.393,365.257,67.393z M300.506,237.056l-126.06,60.123c-3.359,1.602-7.239-0.847-7.239-4.568V168.607 c0-3.774,3.982-6.22,7.348-4.514l126.06,63.881C304.363,229.873,304.298,235.248,300.506,237.056z"></path> </svg> </a> <a class="btn btn-circle" href="https://www.instagram.com" aria-label="instagram"> <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6"><path fill="currentColor" d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"></path><path fill="currentColor" d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"></path></svg> </a> </div> </div> ` })}`;
}, "C:/Users/15034/Projects/ttrpg-blog/src/pages/about.astro", void 0);

const $$file = "C:/Users/15034/Projects/ttrpg-blog/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
