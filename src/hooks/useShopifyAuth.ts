import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { customerAccessTokenCreate, customerCreate, getCustomer } from "@/lib/shopify";
import { toast } from "sonner";

const ACCESS_TOKEN_KEY = "shopify_customer_access_token";
const EXPIRES_AT_KEY = "shopify_customer_expires_at";

export function useShopifyAuth() {
    const queryClient = useQueryClient();
    const [accessToken, setAccessToken] = useState<string | null>(
        localStorage.getItem(ACCESS_TOKEN_KEY)
    );

    useEffect(() => {
        // Check if token is expired
        const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
        if (expiresAt && new Date(expiresAt) < new Date()) {
            logout();
        }
    }, []);

    const { data: customer, isLoading: isLoadingCustomer } = useQuery({
        queryKey: ["customer", accessToken],
        queryFn: () => getCustomer(accessToken!),
        enabled: !!accessToken,
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            return customerAccessTokenCreate(email, password);
        },
        onSuccess: (data) => {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            localStorage.setItem(EXPIRES_AT_KEY, data.expiresAt);
            setAccessToken(data.accessToken);
            queryClient.invalidateQueries({ queryKey: ["customer"] });
            toast.success("Welcome back!");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to login");
        },
    });

    const registerMutation = useMutation({
        mutationFn: async ({ firstName, lastName, email, password }: { firstName: string; lastName: string; email: string; password: string }) => {
            return customerCreate(firstName, lastName, email, password);
        },
        onSuccess: () => {
            toast.success("Account created! Please sign in.");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to create account");
        },
    });

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(EXPIRES_AT_KEY);
        setAccessToken(null);
        queryClient.setQueryData(["customer"], null);
        toast.success("Logged out successfully");
    };

    return {
        customer,
        isLoadingCustomer,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        logout,
        isAuthenticated: !!accessToken,
    };
}
