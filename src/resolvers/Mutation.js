// This file wraps the public API
// and add biz logic and authentication

const Mutations = {
    async createItem(parent, args, context, info) {
        // Instead of specify all fields
        // we can use this approach
        let payload = {data: {...args}};
        const item = await context.db.mutation.createItem(payload, info);

        return item;
    },

    updateItem(parent, args, context, info) {
        // Spread the data
        let updates = {...args};
        // Remove the ID from updates
        delete updates.id;
        return context.db.mutation.updateItem(
            {
                data: updates,
                where: {
                    id: args.id
                }
            }, info);
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
