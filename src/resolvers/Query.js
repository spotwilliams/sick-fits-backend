const Query = {
  users(parent, args, context, info) {
    global.users = global.users || [];
    return global.users;
  },

  async items(parent, args, context, info) {
    const items = await context.db.query.items();

    return items;
  }
};
module.exports = Query;


/*
If there is the case that you dont need to perform biz validation, and just use this resolver
as a proxy, you can use the forwardTo prisma helper.
1) import ==> const { forwardTo } = require('prisma-binding');
2) const Query = {
  items: forwardTo('db')
}
* */