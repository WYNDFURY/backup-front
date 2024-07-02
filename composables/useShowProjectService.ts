import ShowProjectService from "~/services/api/backup/projects/ShowProjectService";

export const useShowProjectService = () => {
  const service = reactive(new ShowProjectService());
  return service;
}
