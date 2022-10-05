import { Meteor } from "meteor/meteor";

export const userFilter = (user?: Meteor.User | null) => user ? { userId: user._id } : {};