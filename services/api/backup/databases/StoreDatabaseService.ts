import { Loader } from "@henrotaym/helpers";
import DatabaseModel from "~/models/api/backup/databases/DatabaseModel";
import { ApiBackupStoreDatabaseEndpoint } from "~/api/endpoints/backup/databases";
import type { ApiBackupDatabaseStoreData } from "~/types";
import { ResponseStatus } from "@henrotaymcorp/api-client-parser-addon";
import type { StoreDatabaseForm } from "~/composables/forms/useDatabaseStoreForm";

class StoreDatabaseService {
  private _model?: DatabaseModel;
  private _loader;
  private _endpoint;

  constructor(){
    this._loader = new Loader(false);
    this._endpoint = new ApiBackupStoreDatabaseEndpoint();
    }

    private async fetchDatabase(data: ApiBackupDatabaseStoreData){
      const response = await this._endpoint.store(data);
      return response;
    }

    public async addDatabase(form: StoreDatabaseForm){
      await this._loader.loadTill(async() => {
        const { data, status } = await this.fetchDatabase({
          db_name: form.fields.db_name.value,
          host: form.fields.host.value,
          port: form.fields.port.value,
          username: form.fields.username.value,
          password: form.fields.password.value,
          type: form.fields.type.value,
          project_id: form.fields.project_id.value,
        });

        if(status === ResponseStatus.API_ERROR) {
          useToasteo().error({
            title: "",
            text: "An error occured while creating the database"
          }) 
          return;
        };
        if(status === ResponseStatus.ZOD_ERROR) {
          return console.error(data);
        }

        this._model = new DatabaseModel(data.data);

        useToasteo().success({
          title: "",
          text: "Database created successfully!"
        })

      return this._model;
      }
    )}

    public isEmpty(): this is {
      model: DatabaseModel;
    } {
      return !this.model;
    }

    public isReady(): this is {
      model: DatabaseModel;
      loader: { isLoading: false}
    } {
      return this._model !== undefined && !this._loader.isLoading;
    }

    public get model(){
      return this._model;
    }

    public get loader(){
      return this._loader;
    }

  }

  export default StoreDatabaseService;