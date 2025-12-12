import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { exchangeToken, logout } from "@/lib/auth";
import { fetchCustomerOrders } from "@/lib/customer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Orders() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [customerName, setCustomerName] = useState("");

    useEffect(() => {
        const init = async () => {
            const code = searchParams.get("code");

            try {
                // Handle Callback
                if (code) {
                    await exchangeToken(code);
                    // Clean URL
                    navigate("/account/orders", { replace: true });
                    return; // Effect will re-run after navigation, or we can just continue but safer to clean URL first
                }

                // Fetch Data
                const customer = await fetchCustomerOrders();
                setCustomerName(`${customer.firstName} ${customer.lastName}`);
                setOrders(customer.orders.nodes);
                setLoading(false);
            } catch (err: any) {
                console.error(err);
                // If error is due to auth, redirect to login is handled optionally or show error
                // If we have no token and no code, redirecting to login might be loops if not careful
                // But here we just show error
                setError(err.message);
                setLoading(false);
            }
        };

        init();
    }, [searchParams, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <main className="flex-1 container mx-auto px-4 py-8 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-display uppercase">My Orders</h1>
                    <button onClick={logout} className="text-sm underline opacity-70 hover:opacity-100">Sign Out</button>
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive p-4 rounded mb-6">
                        Error: {error}. <button onClick={() => window.location.reload()} className="underline">Retry</button> or <button onClick={logout} className="underline">Login Again</button>
                    </div>
                )}

                {customerName && <p className="mb-6 text-muted-foreground">Welcome back, {customerName}</p>}

                {orders.length === 0 ? (
                    <div className="text-center py-12 border border-border rounded-lg">
                        <p className="text-lg opacity-70">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="border border-border rounded-lg p-6">
                                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 border-b border-border/50 pb-4">
                                    <div>
                                        <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                                        <p className="text-sm text-muted-foreground text-xs">{new Date(order.processedAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono">{order.totalPrice.amount} {order.totalPrice.currencyCode}</p>
                                        <span className="inline-block px-2 py-1 bg-secondary text-[10px] uppercase tracking-wider rounded mt-1">
                                            {order.fulfillmentStatus}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {order.lineItems.nodes.map((item: any, i: number) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            {item.variant?.image && (
                                                <img src={item.variant.image.url} alt={item.variant.image.altText || item.title} className="w-16 h-16 object-cover bg-secondary" />
                                            )}
                                            <div>
                                                <p className="font-medium line-clamp-1">{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
