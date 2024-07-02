import { Loader } from "@henrotaym/helpers";
import { ResponseStatus } from "@henrotaymcorp/api-client-parser-addon";
import { ApiBackupShowProjectEndpoint } from "~/api/endpoints/backup/projects";
import BucketModel from "~/models/api/backup/buckets/BucketModel";
import DatabaseModel from "~/models/api/backup/databases/DatabaseModel";
import ProjectModel from "~/models/api/backup/projects/ProjectModel";

class ShowProjectService {
  private _model?: ProjectModel;
  private _loader;
  private _endpoint;
  private _databases?: DatabaseModel[]; 
  private _buckets?: BucketModel[];

  constructor(){
    this._loader = new Loader(false);
    this._endpoint = new ApiBackupShowProjectEndpoint();
    }

    private async fetchProject(id: number){
      const response = await this._endpoint.show(id);
      return response;
    }

    public async getProject(id: number){
      await this._loader.loadTill(async() => {
        const { data, status } = await this.fetchProject(id);
        if(status === ResponseStatus.API_ERROR) return;
        if(status === ResponseStatus.ZOD_ERROR) {
          return console.error(data);
        }

        this._model = new ProjectModel(data.data);

        this._databases = this._model.attributes.databases.map((database) => {
          return new DatabaseModel(database);
        });

        this._buckets = this._model.attributes.buckets.map((bucket) => {
          return new BucketModel(bucket);
        });

      return this._model;
      }
    )}

    public isEmpty(): this is {
      model: ProjectModel;
    } {
      // return this._model === undefined;
      return !this.model;
    }

    public isReady(): this is {
      model: ProjectModel;
      loader: { isLoading : false };
    } {
      return this._model !== undefined && !this._loader.isLoading;
    }

    public get databases(){
      return this._databases;
    }

    public get buckets(){
      return this._buckets;
    }

    public get model(){
      return this._model;
    }

    public get loader(){
      return this._loader;
    }
}

export default ShowProjectService;