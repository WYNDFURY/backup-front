import IndexProjectService from "~/services/api/backup/projects/IndexProjectService"

export const useIndexProjectService = () => {
  const service = reactive(new IndexProjectService());
  return service; 
}
