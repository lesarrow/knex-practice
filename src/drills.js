require('dotenv').config();
knex = require('knex');

knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL,
    pool: {
        min: 0,
    }
});

function getItemsThatContain(text) {
    knexInstance.select('*').from('shopping_list').where('name', 'ILIKE', `%${text}%`)
        .then(result => {
            console.log(`Items that contain ${text}:\n`);
            console.log(result);
        });
}

function getItemPage(page) {

    knexInstance.select('*').from('shopping_list').limit(6).offset((page-1) * 6)
        .then(result => {
            console.log(`Items on page ${page}:\n`);
            console.log(result);
        });
}


function getItemsAddedAfter(daysAgo) {
    knexInstance.select('*').from('shopping_list').where('date_added', '>', knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
        .then(result => {
            console.log(`Items added after ${daysAgo} days:\n`);
            console.log(result);
        });
}


function totalCostPerCategory() {
    knexInstance.select('category').sum('price').from('shopping_list').groupBy('category')
        .then(result => {
            console.log("Total Cost Per Category:\n");
            console.log(result);
        })
}

getItemsThatContain('burg');
getItemPage(2);
getItemsAddedAfter(2);
totalCostPerCategory();
