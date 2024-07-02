import { JsonCredential, Request } from "@henrotaym/api-client";

class BackupCredential extends JsonCredential {
  prepare(request: Request<any>): void {
    super.prepare(request);
    request
      .setBaseUrl("http://localhost:48119/api");
  }
}

export default BackupCredential;  