import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  deals: defineTable({
    userId: v.id("users"),
    fullName: v.string(),
    emailAddress: v.string(),
    title: v.string(),
    description: v.string(),
    terms: v.string(),
    time: v.number(),
    amountNeeded: v.number(),
    returnRate: v.number(),
    flatRate: v.number(),
    status: v.union(
      v.literal("open"),
      v.literal("closed"),
      v.literal("completed")
    ),
    // terms
  }).index("by_status", ["status"]),
});
