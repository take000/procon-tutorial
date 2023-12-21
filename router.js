import { Router, send } from "https://deno.land/x/oak@v6.5.0/mod.ts";

import { handlePing, handleHello } from "./02-API練習/server.js";
import { handleGuessNumberEasy, handleGuessNumberHard } from "./03-数字当て/server.js";

export const router = new Router();

export const apiSpecification = async (ctx) => {
    await send(ctx, "", {
        root: `${Deno.cwd()}/API仕様`,
        index: `${ctx.request.url.pathname}.html`
    });
}

router.get("/02", apiSpecification);
router.get("/02/ping", handlePing);
router.post("/02/hello", handleHello);

router.get("/03", apiSpecification);
router.post("/03/guessNumberEasy/", handleGuessNumberEasy);
router.post("/03/guessNumberHard/", handleGuessNumberHard);