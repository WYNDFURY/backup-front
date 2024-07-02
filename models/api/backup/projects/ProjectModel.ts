import type { ProjectResponseSchema } from "~/api/endpoints/backup/projects/ProjectSchema";

class ProjectModel {
  private _attributes: ProjectResponseSchema;

  constructor(attributes: ProjectResponseSchema) {
    this._attributes = attributes;
  }

  public get attributes() {
    return this._attributes;
  }
}

export default ProjectModel;