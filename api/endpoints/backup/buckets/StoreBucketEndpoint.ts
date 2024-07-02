import { Client, Request } from "@henrotaym/api-client";
import { useResponseParser } from "@henrotaymcorp/api-client-parser-addon";
import { z } from "zod";
import { BackupCredential } from "~/api/credentials/backup";
import type { ApiBackupBucketStoreData } from "~/types";
import { bucketSchema } from "./BucketSchema";

const schema = z.object({
  data: bucketSchema,
})

class StoreBucketEndpoint {

private client: Client;

  constructor(){
    this.client = new Client(new BackupCredential());
  }

  public async store(data: ApiBackupBucketStoreData){
    const request = new Request()
      .setVerb("POST")
      .setUrl("buckets")
      .addData(data as any);

      return useResponseParser({
        response: await this.client.try(request),
        schema,
      })
  }
}

export default StoreBucketEndpoint; 