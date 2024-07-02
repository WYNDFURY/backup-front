import { JsonCredential, Request } from "@henrotaym/api-client";

class BackupCredential extends JsonCredential {
  prepare(request: Request<any>): void {
    super.prepare(request);
    request.setBaseUrl("backup.trustup.io/api");
  }
}

export default BackupCredential;
