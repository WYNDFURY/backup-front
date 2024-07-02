import { Request, Client } from "@henrotaym/api-client";
import { useResponseParser } from "@henrotaymcorp/api-client-parser-addon";
import { BackupCredential } from "~/api/credentials/backup";
import { projectSchema } from "./ProjectSchema";
import { z } from "zod";
import type { ApiBackupProjectStoreData } from "~/types";

const schema = z.object({
  data: projectSchema, 
})

class StoreProjectEndpoint {
  private client: Client;

  constructor() {
    this.client = new Client(new BackupCredential());
  }

  public async store(data: ApiBackupProjectStoreData) {
    const request = new Request()
      .setVerb("POST")
      .setUrl("projects")
      .addData(data as any);

    return useResponseParser({
      response: await this.client.try(request),
      schema,
    })
  }
}

export default StoreProjectEndpoint;