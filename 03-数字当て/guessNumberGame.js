import Random from "./random.js";

export const guessNumberGame = (async (ctx, min, max) => {
    const content_type = await ctx.request.headers.get("content-type");
    if (content_type !== "application/json") {
        ctx.response.status = 400;
        ctx.response.body = "Content-Type header must be application/json";
        return;
    }

    try {
        const body = ctx.request.body();
        const { guess, seed } = await body.value;

        if (seed === undefined) {
            ctx.response.status = 400;
            ctx.response.body = "Request body is missing `seed` property";
            return;
        }
        if (guess === undefined) {
            ctx.response.status = 400;
            ctx.response.body = "Request body is missing `guess` property";
            return;
        }

        const num = parseInt(guess);
        if (isNaN(num)) {
            ctx.response.status = 400;
            ctx.response.body = "Guess number must be an integer";
            return;
        }
        if (num < min || num > max) {
            ctx.response.status = 400;
            ctx.response.body = `Guess number must be between ${min} and ${max}`
            return;
        }

        const random = new Random(seed);
        const answer = random.nextInt(min, max);
        if (num === answer) {
            ctx.response.body = "Correct!";
        } else if (num < answer) {
            ctx.response.body = "Too low";
        } else {
            ctx.response.body = "Too high";
        }
    }
    // ex: json parse error
    catch (e) {
        ctx.response.status = 400;
        ctx.response.body = e.message;
        return;
    }
})