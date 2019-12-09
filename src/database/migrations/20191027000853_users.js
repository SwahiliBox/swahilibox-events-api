import { addTableTimestamps } from '../addTableTimestamps';

const ACCOUNTS_TABLE = 'accounts';
const PROFILES_TABLE = 'profiles';
const PROJECTS_TABLE = 'projects';
const EXPERIENCE_TABLE = 'experience';
const SKILLS_TABLE = 'skills';
const PROFILE_SKILLS_TABLE = 'profile_skills';

async function createUuidExtension(knex) {
  await knex.raw('create extension if not exists "uuid-ossp"');
}

async function createAccountsTable(knex) {
  await knex.schema.createTable(ACCOUNTS_TABLE, table => {
    table
      .string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('email')
      .unique()
      .notNullable();

    table.string('password').notNullable();

    table
      .enu('role', ['admin', 'normal'])
      .defaultTo('normal')
      .notNullable();

    table
      .boolean('active')
      .notNullable()
      .defaultTo(false);

    table.date('deleted_at').defaultTo(knex.fn.now());

    table.string('deletion_reason').nullable();
  });

  await addTableTimestamps(knex, ACCOUNTS_TABLE);
}

async function createProfilesTable(knex) {
  await knex.schema.createTable(PROFILES_TABLE, table => {
    table
      .string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('account_id')
      .references('id')
      .inTable(ACCOUNTS_TABLE)
      .unique()
      .notNullable();

    table.string('first_name').notNullable();

    table.string('last_name').notNullable();

    table.text('bio').nullable();

    table.json('links').nullable();
  });

  await addTableTimestamps(knex, PROFILES_TABLE);
}

async function createProjectsTable(knex) {
  await knex.schema.createTable(PROJECTS_TABLE, table => {
    table
      .string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('profile_id')
      .references('id')
      .inTable(PROFILES_TABLE)
      .notNullable();

    table.string('tittle').notNullable();

    table.text('description').notNullable();

    table.string('repo_link').nullable();

    table.string('project_url').nullable();
  });

  await addTableTimestamps(knex, PROJECTS_TABLE);
}

async function createEperienceTable(knex) {
  await knex.schema.createTable(EXPERIENCE_TABLE, table => {
    table
      .string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('profile_id').notNullable();

    table.string('tittle').notNullable();

    table.text('description').nullable();

    table.string('company').notNullable();

    table.date('start_date').notNullable();

    table.date('end_date').notNullable();
  });

  await addTableTimestamps(knex, EXPERIENCE_TABLE);
}

async function createSkillsTable(knex) {
  await knex.schema.createTable(SKILLS_TABLE, table => {
    table
      .string('id')
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));

    table
      .string('name')
      .unique()
      .notNullable();

    table
      .enu('status', ['approved', 'awaiting_approval', 'disapproved'])
      .defaultTo('awaiting_approval');

    table.specificType('tags', 'varchar ARRAY');
  });

  // index tags for easy querying
  await knex.raw(
    `
    CREATE INDEX tags_index ON ${SKILLS_TABLE} USING GIN(tags); 
    `,
  );

  await addTableTimestamps(knex, SKILLS_TABLE);
}

async function createProfileSkillsTable(knex) {
  await knex.schema.createTable(PROFILE_SKILLS_TABLE, table => {
    table
      .string('skill_id')
      .references('id')
      .inTable(SKILLS_TABLE);

    table
      .string('profile_id')
      .references('id')
      .inTable(PROFILES_TABLE);

    table.unique(['skill_id', 'profile_id']);
  });

  await addTableTimestamps(knex, PROFILE_SKILLS_TABLE);
}

export async function up(knex) {
  await createUuidExtension(knex);

  await createAccountsTable(knex);
  await createProfilesTable(knex);
  await createProjectsTable(knex);
  await createEperienceTable(knex);
  await createSkillsTable(knex);
  await createProfileSkillsTable(knex);
}

export async function down(knex) {
  await knex.schema.dropTable(PROFILE_SKILLS_TABLE);
  await knex.schema.dropTable(SKILLS_TABLE);
  await knex.schema.dropTable(EXPERIENCE_TABLE);
  await knex.schema.dropTable(PROJECTS_TABLE);
  await knex.schema.dropTable(PROFILES_TABLE);
  await knex.schema.dropTable(ACCOUNTS_TABLE);
}
