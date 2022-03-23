import {list} from "@keystone-next/keystone/schema";
import {select, text, integer, relationship} from "@keystone-next/fields";


export const Product = list({
    fields: {
        name: text({isRequired: true}),
        description: text({
            ui: {
                displayMode: 'textarea'
            }
        }),
        photos: relationship({
            ref: 'ProductImage.product',
            many: true,
            ui: {
                displayMode: 'select',
                // cardFields: ['image', 'altText'],
                // inlineCreate: {fields: ['image', 'altText']},
                // inlineEdit: {fields: ['image', 'altText']},
            }
        }),
        status: select({
            options: [
                {  label: 'Draft', value: 'DRAFT', },
                {  label: 'Available', value: 'AVAILABLE', },
                {  label: 'Unavailable', value: 'UNAVAILABLE', },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: {fieldMode: 'hidden'}
            }
        }),
        price: integer(),
        // photo
    }
});