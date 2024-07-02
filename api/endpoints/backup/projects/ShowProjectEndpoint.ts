import { Request, Client } from "@henrotaym/api-client";
import { useResponseParser } from "@henrotaymcorp/api-client-parser-addon";
import { z } from "zod";
import { projectSchema } from "./ProjectSchema";
import { BackupCredential } from "~/api/credentials/backup";

const schema = z.object({
  data: projectSchema, 
})

class ShowProjectEndpoint {
  private client: Client;

  constructor() {
    this.client = new Client(new BackupCredential());
  }

  public async show(id: number) {
    const request = new Request().setVerb("GET").setUrl(`projects/${id}`);

    return useResponseParser({
      response: await this.client.try(request),
      schema,
    })
  }

}

export default ShowProjectEndpoint;