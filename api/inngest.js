import { serve } from "inngest/vercel";
import { inngest, functions } from "../backend/src/lib/inngest.js";

export default serve({
  client: inngest,
  functions,
});
