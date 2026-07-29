import { delay, HttpResponse } from "msw";

const NETWORK_DELAY = 500;
const RANDOM_ERROR_PROBABILITY = 0.05;
const ENABLE_RANDOM_ERRORS = false;

export const simulateNetwork = async () => {
   await delay(NETWORK_DELAY);

   if (!ENABLE_RANDOM_ERRORS) {
      return;
   }

   if (Math.random() < RANDOM_ERROR_PROBABILITY) {
      throw HttpResponse.json(
         {
            message: "Internal server error",
         },
         {
            status: 500,
         },
      );
   }
};
