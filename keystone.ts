import {config, createSchema} from "@keystone-next/keystone/schema";
import 'dotenv/config';
import {User} from "./schemas/User";
import {Product} from "./schemas/Product";
import {ProductImage} from "./schemas/ProductImage";
import {createAuth} from "@keystone-next/auth";
import {statelessSessions, withItemData} from "@keystone-next/keystone/session";
import {insertSeedData} from "./seed-data";

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // signed in
    secret: process.env.COOKIE_SECRET,
}

const {withAuth} = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password']
        // TODO: add roles
    }
});

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        async onConnect(keystone){
            if (process.argv.includes('--seed-data')) {
                await insertSeedData(keystone);
            }
        }
    },
    lists: createSchema({
        // schema items go in here
        User,
        Product,
        ProductImage,
    }),
    ui: {
        // show the UI only for people who pass this test
        isAccessAllowed: ({session}) => {
            return !!session?.data;
        }
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: `id name email`
    }),
    graphql:  { playground: true, apolloConfig: { introspection: true } }
}));