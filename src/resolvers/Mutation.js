// This file wraps the public API
// and add biz logic and authentication
const {forwardTo} = require('prisma-binding');

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
        const updates = {...args};
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

    async deleteItem(parent, args, context, info) {
        // Create the where statement
        const where = {id: args.id};
        // 1. find the item
        const item = await context.db.query.item({where}, `{ id title }`);
        // 2. check owner and permissions
        // todo
        // 3. Delete the item
        return context.db.mutation.deleteItem({where}, info);

        // The first query has the `{ id title }` because we want to receive that information into our process, instead
        // sending to the frontend.
        // When we use info object, we send the information to the requester, in this case the frontend
    },
};

module.exports = Mutations;
