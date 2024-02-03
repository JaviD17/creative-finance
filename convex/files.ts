import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  args: {
    // ...
  },
  handler: async (ctx, args) => {
    // use `args` and/or `ctx.auth` to authorize the user
    // ...
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error(
        "Called generateUploadUrl without authentication present"
      );
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("Unauthenticated call to mutation");
    }

    // Return an upload URL
    return await ctx.storage.generateUploadUrl();
  },
});
