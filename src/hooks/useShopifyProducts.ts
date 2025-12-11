import { useQuery } from '@tanstack/react-query';
import { fetchShopifyProducts, fetchShopifyProductByHandle, fetchShopifyCollectionProducts, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first: number = 20, query?: string) {
  return useQuery({
    queryKey: ['shopify-products', first, query],
    queryFn: () => fetchShopifyProducts(first, query),
    staleTime: 1000 * 60 * 5, // 5 minutes
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
  return useQuery({
    queryKey: ['shopify-collection-products', handle, first],
    queryFn: () => handle ? fetchShopifyCollectionProducts(handle, first) : null,
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}
