import type { BucketResponseSchema } from "~/api/endpoints/backup/buckets/BucketSchema";

class BucketModel {
  private _attributes: BucketResponseSchema;

  constructor(attributes: BucketResponseSchema) {
    this._attributes = attributes;
  }

  public get attributes() {
    return this._attributes;
  }
}

export default BucketModel;