import useSWR from "swr"


export const useProducts = ( url, config = {}) => {
  // const { data, error } = useSWR(`/api${ url }`, fetcher, { config });
  const { data, error } = useSWR(`/api${ url }`, { config });

  return {
    productos: data || [],
    isLoading: !error && !data,
    isError: error
  }
}