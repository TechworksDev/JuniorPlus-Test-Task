exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: { type: 'serial', primaryKey: true },
    owner_id: { type: 'integer', notNull: true, references: '"users"', onDelete: 'CASCADE' },
    title: { type: 'varchar(255)', notNull: true },
    text: { type: 'text', notNull: true },
    created_at: { type: 'timestamp', notNull: true, default: pgm.func('NOW()') },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('notes')
}