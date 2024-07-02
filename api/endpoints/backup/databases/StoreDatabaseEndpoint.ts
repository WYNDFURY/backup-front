import { Client, Request } from "@henrotaym/api-client";
import { useResponseParser } from "@henrotaymcorp/api-client-parser-addon";
import { z } from "zod";
import { BackupCredential } from "~/api/credentials/backup";
import type { ApiBackupDatabaseStoreData } from "~/types";
import { databaseSchema } from "./DatabaseSchema";

const schema = z.object({
  data: databaseSchema,
})

class StoreDatabaseEndpoint {
  private client: Client;

  constructor(){
    this.client = new Client(new BackupCredential());
  }

  public async store(data: ApiBackupDatabaseStoreData){
    const request = new Request()
      .setVerb("PUT")
      .setUrl("databases")
      .addData(data as any);

      return useResponseParser({
        response: await this.client.try(request),
        schema,
      })
  }
}

export default StoreDatabaseEndpoint;