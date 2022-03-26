import {config, createSchema} from "@keystone-next/keystone/schema";
import 'dotenv/config';
import {User} from "./schemas/User";

const databaseURL = process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // signed in
    secret: process.env.COOKIE_SECRET,
}

export default config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true,
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        // TODO: add data seeding here
    },
    lists: createSchema({
        // schema items go in here
        User
    }),
    ui: {
        // TODO: change this for roles
        isAccessAllowed: () => true
    },
    // TODO: add session values here
});