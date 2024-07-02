import type { DatabaseResponseSchema } from "~/api/endpoints/backup/databases/DatabaseSchema";

class DatabaseModel {
  private _attributes: DatabaseResponseSchema;

  constructor(attributes: DatabaseResponseSchema) {
    this._attributes = attributes;
  }

  public get attributes() {
    return this._attributes;
  }
}

export default DatabaseModel;