import { guessNumberGame } from "./guessNumberGame.js";

export const handleGuessNumberEasy = async (ctx) => {
    await guessNumberGame(ctx, 0, 9);
}

export const handleGuessNumberHard = async (ctx) => {
    await guessNumberGame(ctx, 0, 999);
}