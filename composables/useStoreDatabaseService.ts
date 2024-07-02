import StoreDatabaseService from "~/services/api/backup/databases/StoreDatabaseService";

export const useStoreDatabaseService = () => {
  const service = reactive(new StoreDatabaseService());
  return service;
}