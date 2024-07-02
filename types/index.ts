export interface ProjectI {
    id: Number
    name: String,
    databases: Number,
    buckets: Number,
  }

export interface ApiBackupProjectStoreData {
  name: String,
}

export interface ApiBackupDatabaseStoreData {
  db_name: String,
  host: String,
  port: String,
  username: String,
  password: String,
  type: String,
  project_id: Number,
}

export interface ApiBackupBucketStoreData {
  name: String,
  type: String,
  provider: String,
  endpoint: String,
  access_key_id: String,
  secret_access_key: String,
  project_id: Number,
}

export interface ApiBackupConfigurationStoreData {
  configurable_id: Number,
  configurable_type: String,
  frequency: String,
  backup_at: Date,
}

export interface DatabaseI {

}

export interface BucketI {

}