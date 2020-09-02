// This file wraps the public API
// and add biz logic and authentication
const { forwardTo } = require("prisma-binding");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createItem(parent, args, context, info) {
    // Instead of specify all fields
    // we can use this approach
    let payload = { data: { ...args } };
    const item = await context.db.mutation.createItem(payload, info);

    return item;
  },

  updateItem(parent, args, context, info) {
    // Spread the data
    const updates = { ...args };
    // Remove the ID from updates
    delete updates.id;
    return context.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteItem(parent, args, context, info) {
    // Create the where statement
    const where = { id: args.id };
    // 1. find the item
    const item = await context.db.query.item({ where }, `{ id title }`);
    // 2. check owner and permissions
    // todo
    // 3. Delete the item
    return context.db.mutation.deleteItem({ where }, info);

    // The first query has the `{ id title }` because we want to receive that information into our process, instead
    // sending to the frontend.
    // When we use info object, we send the information to the requester, in this case the frontend
  },

  async signUp(parent, args, context, info) {
    // lowercase their email
    const email = args.email.toLowerCase();
    const password = await bcrypt.hash(args.password, 10);

    const user = await context.db.mutation.createUser(
      {
        data: {
          name: args.name,
          email: email,
          password: password,
          permissions: { set: ["USER"] },
        },
      },
      info
    );

    // after creation, login the user with the proper credentials
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the cookie to the browser
    context.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // one year
    });

    return user;
  },
};

module.exports = Mutations;
