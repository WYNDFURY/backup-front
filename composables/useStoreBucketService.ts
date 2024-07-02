import StoreBucketService from "~/services/api/backup/buckets/StoreBucketService";

export const useStoreBucketService = () => {
  const service = reactive(new StoreBucketService());
  return service;
}