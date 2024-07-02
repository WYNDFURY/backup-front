import { Loader } from "@henrotaym/helpers";
import { ResponseStatus } from "@henrotaymcorp/api-client-parser-addon";
import { ApiBackupIndexProjectEndpoint } from "~/api/endpoints/backup/projects";
import ProjectModel from "~/models/api/backup/projects/ProjectModel";


class IndexProjectService {
    private _models?: ProjectModel[];
    private _loader;
    private _endpoint;

    constructor(){
      this._loader = new Loader(false);
      this._endpoint = new ApiBackupIndexProjectEndpoint();
      }

      private async fetchProjects(){
        const response = await this._endpoint.index();
        return response;
      }

      public async getProjects(){
        await this._loader.loadTill(async() => {
          const { data, status } = await this.fetchProjects();
          if(status === ResponseStatus.API_ERROR) return;
          if(status === ResponseStatus.ZOD_ERROR) {
            return console.error(data);
          }

          this._models = data.data.map((project) => {
            return new ProjectModel(project);
          })
        })

        return this._models;
      }

      public isEmpty(): this is {
        models: ProjectModel[];
      } {
        return this._models?.length === 0;
      }

      public isReady(): this is {
        models: ProjectModel[];
        loader: { isLoading : false };
      } {
        return this._models !== undefined && !this._loader.isLoading;
      }

      public get models(){
        return this._models;
      }
}

export default IndexProjectService;