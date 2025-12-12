import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchShopifyProducts, fetchShopifyProductByHandle, fetchShopifyCollectionProducts } from '@/lib/shopify';

export function useShopifyProducts(first: number = 20, query?: string, options?: { enabled?: boolean }) {
  return useInfiniteQuery({
    queryKey: ['shopify-products', first, query],
    queryFn: ({ pageParam }) => fetchShopifyProducts(first, query, pageParam as string),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: options?.enabled,
  });
}

export function useShopifyProduct(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: () => fetchShopifyProductByHandle(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}

export function useShopifyCollectionProducts(handle: string | null, first: number = 20) {
  return useInfiniteQuery({
    queryKey: ['shopify-collection-products', handle, first],
    queryFn: ({ pageParam }) => handle ? fetchShopifyCollectionProducts(handle, first, pageParam as string) : null,
    initialPageParam: undefined,
    enabled: !!handle,
    getNextPageParam: (lastPage) => lastPage && lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined,
    staleTime: 1000 * 60 * 5,
  });
}
