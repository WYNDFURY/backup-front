import { Request, Client } from "@henrotaym/api-client";
import { useResponseParser } from "@henrotaymcorp/api-client-parser-addon";
import { z } from "zod";
import { projectSchema } from "./ProjectSchema";
import { BackupCredential } from "~/api/credentials/backup";

const schema = z.object({
  data: projectSchema.array(),
});

class IndexProjectEndpoint {
  private client: Client;

  constructor() {
    this.client = new Client(new BackupCredential());
  }

  public async index() {
    const request = new Request().setVerb("GET").setUrl("projects");

    return useResponseParser({
      response: await this.client.try(request),
      schema,
    });
  }
}

export default IndexProjectEndpoint;
