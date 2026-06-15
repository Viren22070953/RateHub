const createStoresTable = `
  CREATE TABLE IF NOT EXISTS stores (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(400) NOT NULL,
    owner_id INT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY stores_email_unique (email),
    KEY stores_name_index (name),
    KEY stores_owner_id_index (owner_id),
    CONSTRAINT stores_owner_id_fk
      FOREIGN KEY (owner_id) REFERENCES users(id)
      ON DELETE SET NULL
      ON UPDATE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

module.exports = {
  tableName: "stores",
  createTableQuery: createStoresTable,
};
