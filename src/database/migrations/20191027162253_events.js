import { addTableTimestamps } from '../addTableTimestamps';

const EVENTS_TABLE = 'events';
const RSVPS_TABLE = 'rsvps';
const ACCOUNTS_TABLE = 'accounts';

async function createEventsTable(knex) {
  await knex.schema.createTable(EVENTS_TABLE, table => {
    table
      .string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('tittle').notNullable();

    table.text('description').notNullable();

    table.string('location').notNullable();

    table.date('date').nullable();

    table.time('time').nullable();

    table.string('image_url').nullable();

    table.date('rsvp_end_date').nullable();

    table
      .string('created_by')
      .references('id')
      .inTable(ACCOUNTS_TABLE)
      .notNullable();

    table.boolean('published').defaultTo(false);
  });

  await addTableTimestamps(knex, EVENTS_TABLE);
}

async function createRsvpsTable(knex) {
  await knex.schema.createTable(RSVPS_TABLE, table => {
    table
      .string('account_id')
      .references('id')
      .inTable(ACCOUNTS_TABLE)
      .notNullable();

    table
      .string('event_id')
      .references('id')
      .inTable(EVENTS_TABLE)
      .notNullable();

    table.boolean('attended').defaultTo(false);

    table.boolean('cancelled').defaultTo(false);

    table.unique(['account_id', 'event_id']);
  });

  await addTableTimestamps(knex, RSVPS_TABLE);
}

export async function up(knex) {
  await createEventsTable(knex);
  await createRsvpsTable(knex);
}

export async function down(knex) {
  await knex.schema.dropTable(RSVPS_TABLE);
  await knex.schema.dropTable(EVENTS_TABLE);
}
