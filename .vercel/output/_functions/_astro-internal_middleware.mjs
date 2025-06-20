import { d as defineMiddleware, s as sequence } from './chunks/index_90hLbe4k.mjs';
import { c as createSessionClient } from './chunks/appwrite_CdyEDrVh.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_C_aTNz-H.mjs';
import 'kleur/colors';
import './chunks/astro/server_BoQdInc3.mjs';
import 'clsx';
import 'cookie';

const onRequest$1 = defineMiddleware(async ({ request, locals }, next) => {
  try {
    const { account } = createSessionClient(request);
    locals.user = await account.get();
  } catch {
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
