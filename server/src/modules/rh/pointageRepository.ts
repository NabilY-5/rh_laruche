import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Pointage = {
  id: number;
  employee: string;
  file_url: string;
};

class pointageRepository {
  // The C of CRUD - Create operation

  async create(pointage: Omit<Pointage, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into pointage (employee, file_url) values (?, ?)",
      [pointage.employee, pointage.file_url],
    );

    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from pointage where id = ?",
      [id],
    );

    return rows[0] as Pointage;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from pointage");

    return rows as Pointage[];
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

export default new pointageRepository();
