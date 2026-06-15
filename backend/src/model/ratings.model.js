const createRatingsTable = `
  CREATE TABLE IF NOT EXISTS ratings (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating TINYINT UNSIGNED NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY ratings_user_store_unique (user_id, store_id),
    KEY ratings_store_id_index (store_id),
    CONSTRAINT ratings_user_id_fk
      FOREIGN KEY (user_id) REFERENCES users(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT ratings_store_id_fk
      FOREIGN KEY (store_id) REFERENCES stores(id)
      ON DELETE CASCADE
      ON UPDATE CASCADE,
    CONSTRAINT ratings_value_check CHECK (rating BETWEEN 1 AND 5)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
`;

module.exports = {
  tableName: "ratings",
  createTableQuery: createRatingsTable,
};
