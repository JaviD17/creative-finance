import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    fullName: v.string(),
    emailAddress: v.string(),
    title: v.string(),
    description: v.string(),
    terms: v.string(),
    time: v.number(),
    amountNeeded: v.number(),
    returnRate: v.number(),
    flatRate: v.number(),
    status: v.union(v.literal("open"), v.literal("closed")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
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

    const newDealId = await ctx.db.insert("deals", {
      userId: user._id,
      fullName: args.fullName,
      emailAddress: args.emailAddress,
      title: args.title,
      description: args.description,
      terms: args.terms,
      time: args.time,
      amountNeeded: args.amountNeeded,
      returnRate: args.returnRate,
      flatRate: args.flatRate,
      status: args.status,
    });

    return newDealId;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("deals").order("desc").collect();
  },
});

export const get = query({
  args: { dealId: v.id("deals") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.dealId);
  },
});
