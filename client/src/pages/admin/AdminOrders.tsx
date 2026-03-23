import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { DollarSign } from "lucide-react";

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function AdminOrders() {
  const { data: orders, isLoading } = trpc.payment.listOrders.useQuery();

  const totalCompleted = orders?.filter(o => o.status === "completed").reduce((sum, o) => sum + o.amountInCents, 0) ?? 0;
  const totalDonations = orders?.filter(o => o.type === "donation" && o.status === "completed").reduce((sum, o) => sum + o.amountInCents, 0) ?? 0;
  const totalBookSales = orders?.filter(o => o.type === "book" && o.status === "completed").reduce((sum, o) => sum + o.amountInCents, 0) ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-bold">Orders & Donations</h1>
        <p className="text-muted-foreground text-sm mt-1">View all payments received through Paystack.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs font-semibold uppercase">Total Revenue</p>
            <p className="text-2xl font-bold mt-1">{formatPrice(totalCompleted)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs font-semibold uppercase">Donations</p>
            <p className="text-2xl font-bold mt-1">{formatPrice(totalDonations)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-muted-foreground text-xs font-semibold uppercase">Book Sales</p>
            <p className="text-2xl font-bold mt-1">{formatPrice(totalBookSales)}</p>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <Card key={i} className="animate-pulse"><CardContent className="p-6 h-16" /></Card>)}</div>
      ) : orders && orders.length > 0 ? (
        <div className="space-y-2">
          {orders.map((order) => (
            <Card key={order.id} className="border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  order.type === "donation" ? "bg-green-50" : "bg-blue-50"
                }`}>
                  <DollarSign className={`h-5 w-5 ${order.type === "donation" ? "text-green-600" : "text-blue-600"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm truncate">
                      {order.type === "donation" ? "Donation" : "Book Purchase"}
                    </h3>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${
                      order.status === "completed" ? "bg-green-100 text-green-700" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {order.email}
                    {order.customerName && ` · ${order.customerName}`}
                    {" · "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-sm">{formatPrice(order.amountInCents)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <DollarSign className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <h3 className="font-sans text-xl font-semibold mb-2">No Orders Yet</h3>
          <p className="text-muted-foreground mb-6">Orders and donations will appear here once payments are received.</p>
        </div>
      )}
    </div>
  );
}
