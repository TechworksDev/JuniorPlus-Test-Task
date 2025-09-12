exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    email: { type: "varchar(100)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    avatar: { type: "varchar(255)", notNull: false },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  })
}

exports.down = (pgm) => {
  pgm.dropTable("users")
}