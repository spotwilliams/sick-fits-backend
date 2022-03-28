import {list} from "@keystone-next/keystone/schema";
import {cloudinaryImage} from "@keystone-next/cloudinary";
import {relationship, text} from "@keystone-next/fields";

export const cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
    folder: process.env.CLOUDINARY_FOLDER
};

export const ProductImage = list({
    fields: {
        image: cloudinaryImage({
            cloudinary,
            label: 'Source',
        }),
        altText: text(),
        product: relationship({
            ref: 'Product.photos'
        })
    },
   ui: {
        listView: {
            initialColumns: ['image', 'altText', 'product']
        }
   }
});