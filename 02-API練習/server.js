export const handlePing = (ctx) => {
    ctx.response.body = "pong";
}

export const handleHello = async (ctx) => {
    const content_type = await ctx.request.headers.get("content-type");

    if (content_type !== "application/json") {
        ctx.response.status = 400;
        ctx.response.body = "Content-Type header must be application/json";
        return;
    }

    try {
        const body = ctx.request.body();
        const { name } = await body.value;

        if (name === undefined) {
            ctx.response.status = 400;
            ctx.response.body = "Request body is missing `name` property";
            return;
        }
        ctx.response.body = "Hello," + name;
    }
    // ex: json parse error
    catch (e) {
        ctx.response.status = 400;
        ctx.response.body = e.message;
        return;
    }
}