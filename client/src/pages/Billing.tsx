import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CreditCard, CheckCircle, AlertCircle, ArrowUpRight, Zap, Star, Shield } from "lucide-react";

const PLAN_LABELS: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  athlete_pro: { label: "Athlete Pro", icon: <Zap className="w-4 h-4" />, color: "#0066ff" },
  athlete_elite: { label: "Athlete Elite", icon: <Star className="w-4 h-4" />, color: "#00c2ff" },
  nil_vault: { label: "NIL Vault", icon: <Shield className="w-4 h-4" />, color: "#7c3aed" },
};

export default function Billing() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: subscription, isLoading } = trpc.stripe.getSubscription.useQuery(undefined, {
    enabled: !!user,
  });
  const createBillingPortal = trpc.stripe.createBillingPortal.useMutation();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Card className="bg-white/5 border-white/10 p-8 text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-white text-xl font-bold mb-2">Sign In Required</h2>
          <p className="text-blue-200/60 mb-4">Please sign in to manage your billing.</p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => { window.location.href = '/signin'; }}
          >
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  const handleManageBilling = async () => {
    try {
      const result = await createBillingPortal.mutateAsync({
        origin: window.location.origin,
      });
      if (result.url) {
        toast.info("Opening billing portal...");
        window.open(result.url, "_blank");
      }
    } catch (err: any) {
      toast.error(err.message ?? "Could not open billing portal");
    }
  };

  const planInfo = subscription?.plan ? PLAN_LABELS[subscription.plan] : null;
  const isActive = subscription?.status === "active" || subscription?.status === "trialing";

  // Check for success/cancelled query params
  const params = new URLSearchParams(window.location.search);
  const justSubscribed = params.get("success") === "1";
  const justCancelled = params.get("cancelled") === "1";

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">Billing & Subscription</h1>
          <p className="text-blue-200/60">Manage your ATHLYNX membership and credits.</p>
        </div>

        {/* Success / Cancelled banners */}
        {justSubscribed && (
          <div className="mb-6 flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-green-300 font-medium">
              Payment successful! Your subscription is now active.
            </span>
          </div>
        )}
        {justCancelled && (
          <div className="mb-6 flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
            <span className="text-yellow-300 font-medium">
              Checkout was cancelled. No charge was made.
            </span>
          </div>
        )}

        {/* Current Plan Card */}
        <Card className="bg-white/5 border-white/10 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-400" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-16 bg-white/5 animate-pulse rounded-lg" />
            ) : isActive && planInfo ? (
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: planInfo.color + "22", color: planInfo.color }}
                  >
                    {planInfo.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{planInfo.label}</div>
                    <div className="text-blue-200/60 text-sm capitalize">
                      Status:{" "}
                      <span className="text-green-400 font-medium">{subscription?.status}</span>
                      {subscription?.cancelAtPeriodEnd && (
                        <span className="ml-2 text-yellow-400">(Cancels at period end)</span>
                      )}
                    </div>
                    {subscription?.currentPeriodEnd && (
                      <div className="text-blue-200/50 text-xs mt-1">
                        Next billing:{" "}
                        {new Date(subscription.currentPeriodEnd * 1000).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Active
                </Badge>
              </div>
            ) : (
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-white font-bold text-lg">Athlete Free</div>
                  <div className="text-blue-200/60 text-sm">Basic access — upgrade to unlock all features</div>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  onClick={() => navigate("/pricing")}
                >
                  Upgrade Now <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Manage Billing */}
        {isActive && (
          <Card className="bg-white/5 border-white/10 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-white font-bold mb-1">Manage Billing</div>
                  <div className="text-blue-200/60 text-sm">
                    Update payment method, download invoices, or cancel your subscription.
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-blue-500/40 text-blue-300 hover:bg-blue-500/10"
                  disabled={createBillingPortal.isPending}
                  onClick={handleManageBilling}
                >
                  {createBillingPortal.isPending ? "Loading..." : "Open Billing Portal"}
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upgrade CTA */}
        {!isActive && (
          <Card className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-blue-500/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Ready to level up?</h3>
              <p className="text-blue-200/60 mb-6">
                Unlock NIL deals, AI recruiting tools, and the full ATHLYNX suite.
              </p>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8"
                onClick={() => navigate("/pricing")}
              >
                View Plans
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
