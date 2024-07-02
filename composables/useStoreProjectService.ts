import StoreProjectService from "~/services/api/backup/projects/StoreProjectService";

export const useStoreProjectService = () => {
  const service = reactive(new StoreProjectService());
  return service;
}
