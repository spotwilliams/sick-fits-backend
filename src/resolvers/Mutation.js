const Mutations = {
  async createItem(parent, args, context, info) {
    console.log(args);
    // Instead of specificate all fields
    // we can use this approach
    let payload = { data: { ...args } };
    const item = await context.db.mutation.createItem(payload, info);

    return item;
  },
  createUser(parent, args, context, info) {
    global.users = global.users || [];
    global.users.push(
      (user = {
        id: Math.random(),
        name: args.name
      })
    );
    return user;
  }
};

module.exports = Mutations;
