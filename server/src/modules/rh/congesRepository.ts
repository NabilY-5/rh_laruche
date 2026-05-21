import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Conge = {
  id: number;
  employee: string;
  file_url: string;
};

class congesRepository {
  // The C of CRUD - Create operation

  async create(conge: Omit<Conge, "id">) {
    // Execute the SQL INSERT query to add a new item to the "item" table
    const [result] = await databaseClient.query<Result>(
      "insert into conges (employee, file_url) values (?, ?)",
      [conge.employee, conge.file_url],
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from conges where id = ?",
      [id],
    );

    return rows[0] as Conge;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from conges");

    return rows as Conge[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  // async update(item: Item) {
  //   ...
  // }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  // async delete(id: number) {
  //   ...
  // }
}

export default new congesRepository();
