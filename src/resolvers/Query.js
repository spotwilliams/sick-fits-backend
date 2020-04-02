const { forwardTo } = require("prisma-binding");

const Query = {
  users(parent, args, context, info) {
    global.users = global.users || [];
    return global.users;
  },

  async items(parent, args, context, info) {
    const items = await context.db.query.items();
    return items;
  },

  item: forwardTo("db"),
  itemsConnection: forwardTo("db")
};
module.exports = Query;
