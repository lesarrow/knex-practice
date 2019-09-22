require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
});

let item = {
    name: 'balz',
    price: 10.00,
    category: 'Snack'
};

let modifiedItem = {
    price: 9.00,
    category: 'Main'
}

ShoppingListService.addItem(knexInstance, item)
    .then(result => {
        ShoppingListService.getItem(knexInstance, 'balz')
            .then(result => {
                console.log(result);
            })
    })
    .then(result => {
        console.log("Checkpoint");
        ShoppingListService.updateItem(knexInstance, 'balz', modifiedItem)
            .then(() => {
                ShoppingListService.getItem(knexInstance, 'balz')
                    .then (result => {
                        console.log(result);
                    });
            });
    })
    .then (result => {
        ShoppingListService.deleteItem(knexInstance, 'balz')
            .then(result => {
                knexInstance.destroy();
            });
    });





