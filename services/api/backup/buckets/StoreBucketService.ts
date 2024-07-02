import { Loader } from "@henrotaym/helpers";
import { ResponseStatus } from "@henrotaymcorp/api-client-parser-addon";
import { ApiBackupStoreBucketEndpoint } from "~/api/endpoints/backup/buckets";
import BucketModel from "~/models/api/backup/buckets/BucketModel";
import type DatabaseModel from "~/models/api/backup/databases/DatabaseModel";
import type { ApiBackupBucketStoreData } from "~/types";

class StoreBucketService {
  private _model?: BucketModel;
  private _loader;
  private _endpoint;

  constructor(){
    this._loader = new Loader(false);
    this._endpoint = new ApiBackupStoreBucketEndpoint();
    }

    private async fetchBucket(data: ApiBackupBucketStoreData){
      const response = await this._endpoint.store(data);
      return response;
    }

    public async addBucket(form: StoreBucketForm){
      await this._loader.loadTill(async() => {
        const { data, status } = await this.fetchBucket({
          name: form.fields.name.value,
          type: form.fields.type.value,
          provider: form.fields.provider.value,
          endpoint: form.fields.endpoint.value,
          secret_access_key: form.fields.secret_access_key.value,
          access_key_id: form.fields.access_key_id.value,
          project_id: form.fields.project_id.value,
          
        });

        if(status === ResponseStatus.API_ERROR) return;
        if(status === ResponseStatus.ZOD_ERROR) {
          return console.error(data);
        }

        this._model = new BucketModel(data.data);

        useToasteo().success({
          title: "",
          text: "Bucket created successfully!"
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

  export default StoreBucketService;