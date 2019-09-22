const ShoppingListService = {

    getItem(knex, name) {
        return knex.select('*').from('shopping_list').where({name});
    },

    addItem(knex, item) {
        return knex.insert(item).into('shopping_list');
    },

    updateItem(knex, name, update) {
        return knex('shopping_list').where({name}).update(update);
    },

    deleteItem(knex, name) {
        return knex('shopping_list').where({name}).delete();
    }
}

module.exports = ShoppingListService;