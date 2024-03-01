import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPhotoStatistics, fetchPhotos } from "./fetchData";

//generate the data
export const useCachedData = (word: string, enable: boolean) => {
  const { data, status, fetchNextPage } = useInfiniteQuery({
    queryKey: [word],
    queryFn: ({ pageParam }) => fetchPhotos({ pageParam, word }),
    enabled: enable,
    retry: 1,
    initialPageParam: 1,
    staleTime: Infinity,
    getNextPageParam: (_lastPage, allPages) => {
      // Return null to prevent fetching next page when word is not provided
      return word ? allPages.length + 1 : null;
    },
  });

  return { data, status, fetchNextPage };
};

//get the statistics for clicked image
export const usePhotoStatistics = (id: string, enable: boolean) => {
  const { data: photoStatistics } = useQuery({
    queryKey: [id],
    queryFn: () => fetchPhotoStatistics(id),
    enabled: enable,
    retry: 1,
    staleTime: Infinity,
  });

  return { photoStatistics };
};
