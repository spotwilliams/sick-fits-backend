const Mutations = {
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
