
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table) {
    table.uuid('user_id').primary().notNullable();
    table.string('user_nome').notNullable();
    table.string('user_email').notNullable();
    table.string('user_telefone').notNullable();
    table.string('user_nascimento').notNullable();
    table.string('user_cep').notNullable();
    table.string('user_numero').notNullable();
    table.string('user_bairro').notNullable();
    table.string('user_cidade').notNullable();
    table.string('user_estado').notNullable();  
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
