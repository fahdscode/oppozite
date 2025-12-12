import { useQuery } from '@tanstack/react-query';
import { fetchShopifyCollections } from '@/lib/shopify';

export function useShopifyCollections(first: number = 20) {
    return useQuery({
        queryKey: ['shopify-collections', first],
        queryFn: () => fetchShopifyCollections(first),
        staleTime: 1000 * 60 * 60, // 1 hour
    });
}
