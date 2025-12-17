import { serve } from "inngest/vercel";
import { inngest, functions } from "../src/lib/inngest.js";

export const inngestHandler = serve({
  client: inngest,
  functions,
});
