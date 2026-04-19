import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const CDN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png";

const CATEGORIES = ["All", "Custom Servers", "GPU Cloud", "Athletic Gear", "NIL Gear", "Training Equipment"];

const PRODUCTS = [
  // ── ICC-USA Custom Servers ──
  {
    id: "icc-spec1",
    category: "Custom Servers",
    badge: "ENTERPRISE",
    badgeColor: "bg-blue-600",
    name: "Custom Server — 2U Silver (256GB)",
    tagline: "Supermicro 2U · Intel Xeon Silver 4514Y · 256GB DDR5",
    specs: ["Supermicro SYS-221H-TNR", "2x Intel Xeon Silver 4514Y (16C/32T)", "256GB DDR5 4800MHz ECC", "8x 2.5\" NVMe/SATA/SAS + 2x M.2", "Micron 5400 PRO 480GB M.2 SSD"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Data Center",
    featured: true,
  },
  {
    id: "icc-spec3",
    category: "Custom Servers",
    badge: "HIGH DENSITY",
    badgeColor: "bg-indigo-600",
    name: "Custom Server — 2U Silver (16GB, 7.6T)",
    tagline: "Supermicro 2U · Intel Xeon Silver 4514Y · 16GB DDR5",
    specs: ["Supermicro SYS-221H-TNR", "2x Intel Xeon Silver 4514Y (16C/32T)", "16GB DDR5 5600MHz ECC", "Micron 5400 PRO 480GB M.2 SSD", "8x 2.5\" NVMe/SATA/SAS"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Data Center",
    featured: false,
  },
  {
    id: "icc-spec4",
    category: "Custom Servers",
    badge: "PLATINUM",
    badgeColor: "bg-purple-600",
    name: "Custom Server — 2U Platinum (32C/64T)",
    tagline: "Supermicro 2U · Intel Xeon Platinum 8562Y+ · 256GB DDR5",
    specs: ["Supermicro SYS-221H-TNR", "2x Intel Xeon Platinum 8562Y+ (32C/64T, 300W)", "256GB DDR5 5600MHz ECC (32GB×8)", "8x 2.5\" NVMe/SATA/SAS + 2x M.2", "Enterprise-grade AI workloads"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "AI Workloads",
    featured: true,
  },
  {
    id: "icc-spec7",
    category: "Custom Servers",
    badge: "STORAGE",
    badgeColor: "bg-cyan-600",
    name: "Custom Server — 2U Silver (64GB DDR5)",
    tagline: "Supermicro 2U · Intel Xeon Silver 4514Y · 64GB DDR5",
    specs: ["Supermicro SYS-221H-TNR", "2x Intel Xeon Silver 4514Y (16C/32T)", "64GB DDR5 5600MHz ECC", "Micron 5400 PRO 480GB M.2 SSD", "8x 2.5\" NVMe/SATA/SAS"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Storage Optimized",
    featured: false,
  },
  {
    id: "icc-spec-60bay",
    category: "Custom Servers",
    badge: "HYPERSCALE",
    badgeColor: "bg-red-600",
    name: "Custom Server — 4U 60-Bay (30T Drives)",
    tagline: "Supermicro 4U 60-Bay · Intel Xeon 6521P · 128GB DDR5",
    specs: ["Supermicro SSG-542B-E1CR60", "Intel Xeon 6521P (24C/48T, 225W, LGA4710)", "128GB DDR5 6400MHz ECC (32GB×4)", "60x 3.5\" SATA/SAS + 2x M.2", "1+1 2000W Redundant PSU"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Hyperscale",
    featured: true,
  },
  // ── RunSun GPU Cloud ──
  {
    id: "runsun-h200",
    category: "GPU Cloud",
    badge: "NVIDIA NCP",
    badgeColor: "bg-green-600",
    name: "RunSun H200 GPU Cluster",
    tagline: "NVIDIA Hopper H200 · 141GB HBM3e · 3.35 TB/s",
    specs: ["NVIDIA H200 Tensor Core GPU", "141GB HBM3e Memory", "3.35 TB/s Memory Bandwidth", "NDR InfiniBand 800 Gbps Fabric", "NVIDIA Reference Architecture"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "AI Training",
    featured: true,
  },
  {
    id: "runsun-b200",
    category: "GPU Cloud",
    badge: "BLACKWELL",
    badgeColor: "bg-emerald-600",
    name: "RunSun B200 GPU Cluster",
    tagline: "NVIDIA Blackwell B200 · 11× H100 Inference Performance",
    specs: ["NVIDIA B200 Tensor Core GPU", "288GB HBM3e Memory · 8 TB/s Bandwidth", "11× Llama 3.1 405B Inference vs H100", "4× Llama 3.1 405B Training vs H100", "NDR InfiniBand 2× vs H100"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Next-Gen AI",
    featured: false,
  },
  {
    id: "runsun-gb200",
    category: "GPU Cloud",
    badge: "SUPERCHIP",
    badgeColor: "bg-teal-600",
    name: "RunSun GB200 NVL72 Rack",
    tagline: "Grace Blackwell Superchip · 72 GPUs · NVLink-C2C 900 GB/s",
    specs: ["NVIDIA GB200 Grace Blackwell Superchip", "72 B200 GPUs per NVL72 rack", "NVLink-C2C 900 GB/s bidirectional", "Unified coherent memory space", "Trillion-parameter LLM support"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "LLM Scale",
    featured: true,
  },
  {
    id: "runsun-b300",
    category: "GPU Cloud",
    badge: "B300",
    badgeColor: "bg-sky-600",
    name: "RunSun B300 GPU Cluster",
    tagline: "NVIDIA Blackwell 300 · 288GB HBM3e · 8 TB/s",
    specs: ["NVIDIA B300 Tensor Core GPU", "288GB HBM3e Memory", "8 TB/s Memory Bandwidth", "NDR InfiniBand Non-Blocking 800 Gbps", "NVIDIA Reference Architecture"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Next-Gen",
    featured: false,
  },
  {
    id: "runsun-storage",
    category: "GPU Cloud",
    badge: "STORAGE",
    badgeColor: "bg-blue-500",
    name: "RunSun AI Data Platform",
    tagline: "500TB NVMe · 150 GB/s Read · S3 API Compatible",
    specs: ["500TB NVMe TLC Storage", "150 GB/s read / 115 GB/s write", "2x AMD Genoa CPUs", "4x OSFP NDR 400 GbE", "Optimized for GB200 & B200"],
    image: `${CDN}/athlynx-infrastructure-icon-nz9q66pp8rVTFoTkqrdfgH.png`,
    tag: "Storage",
    featured: false,
  },
  // ── Athletic Gear ──
  {
    id: "gear-training",
    category: "Athletic Gear",
    badge: "ATHLETE",
    badgeColor: "bg-orange-600",
    name: "Elite Training Bundle",
    tagline: "Pro-grade training equipment for serious athletes",
    specs: ["Resistance bands (5 resistance levels)", "Speed & agility ladder", "Weighted vest (20–40 lbs)", "Recovery foam roller", "ATHLYNX branded gear bag"],
    image: `${CDN}/athlynx-main-icon_7b5e9ca6.png`,
    tag: "Training",
    featured: true,
    priceInCents: 14900,
    priceLabel: "$149",
  },
  {
    id: "gear-nil",
    category: "NIL Gear",
    badge: "NIL READY",
    badgeColor: "bg-yellow-600",
    name: "NIL Athlete Starter Pack",
    tagline: "Launch your personal brand with official ATHLYNX gear",
    specs: ["Custom jersey (name + number)", "Branded athletic shorts", "ATHLYNX × NIL hoodie", "Athlete ID card holder", "Social media kit (digital)"],
    image: `${CDN}/nil_portal_app_icon_n_final_0993a3be.png`,
    tag: "Branding",
    featured: false,
    priceInCents: 19900,
    priceLabel: "$199",
  },
  {
    id: "gear-diamond",
    category: "Training Equipment",
    badge: "BASEBALL",
    badgeColor: "bg-blue-500",
    name: "Diamond Grind Training Kit",
    tagline: "Baseball-specific performance training tools",
    specs: ["Pitching velocity radar (pocket)", "Batting tee (adjustable height)", "Weighted training balls (6-pack)", "Grip strength trainer", "Diamond Grind branded bag"],
    image: `${CDN}/diamond-grind_890f28f2.png`,
    tag: "Baseball",
    featured: false,
    priceInCents: 12900,
    priceLabel: "$129",
  },
  {
    id: "gear-warriors",
    category: "Training Equipment",
    badge: "FOOTBALL",
    badgeColor: "bg-red-600",
    name: "Warriors Playbook Training Pack",
    tagline: "Football-specific strength & film study tools",
    specs: ["Resistance sled harness", "Agility cone set (12-pack)", "Film study tablet stand", "Warriors Playbook branded journal", "Compression sleeve set"],
    image: `${CDN}/warriors-playbook_b10e7359.png`,
    tag: "Football",
    featured: false,
    priceInCents: 11900,
    priceLabel: "$119",
  },
];

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [quoteProduct, setQuoteProduct] = useState<typeof PRODUCTS[0] | null>(null);
  const [quoteForm, setQuoteForm] = useState({ name: "", email: "", org: "", qty: "1", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const notifyOwner = trpc.system.notifyOwner.useMutation();
  const createProductCheckout = trpc.stripe.createProductCheckout.useMutation({
    onSuccess: ({ url }) => {
      if (url) {
        toast({ title: "Redirecting to checkout...", description: "Opening Stripe checkout in a new tab." });
        window.open(url, "_blank");
      }
    },
    onError: (err) => {
      toast({ title: "Checkout failed", description: err.message, variant: "destructive" });
    },
  });
  const handleBuyNow = (product: typeof PRODUCTS[0]) => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to purchase.", variant: "destructive" });
      return;
    }
    if (!(product as any).priceInCents) return;
    createProductCheckout.mutate({
      productName: product.name,
      productDescription: product.tagline,
      priceInCents: (product as any).priceInCents,
      quantity: 1,
      origin: window.location.origin,
    });
  };

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = PRODUCTS.filter(p => p.featured);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await notifyOwner.mutateAsync({
        title: `New Quote Request: ${quoteProduct?.name ?? "Product"}`,
        content: `From: ${quoteForm.name} (${quoteForm.email})\nOrg: ${quoteForm.org}\nQty: ${quoteForm.qty}\nProduct: ${quoteProduct?.name}\nNotes: ${quoteForm.notes}`,
      });
    } catch (_) {
      // notification failure is non-blocking
    }
    setSubmitting(false);
    setQuoteProduct(null);
    setQuoteForm({ name: "", email: "", org: "", qty: "1", notes: "" });
    toast({ title: "Quote Request Submitted!", description: "Our team will contact you within 1 business day." });
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* ── Header ── */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-[#0a0f1e] to-purple-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">← Home</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/60 text-sm">Marketplace</span>
          </div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <Badge className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-3 py-1">ATHLYNX MARKETPLACE</Badge>
            <Badge className="bg-green-600/20 text-green-300 border border-green-500/30 px-3 py-1">ENTERPRISE GRADE</Badge>
            <Badge className="bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1">REQUEST A QUOTE</Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            The Athlete's
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Equipment Store
            </span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mb-8">
            Enterprise custom servers, GPU cloud infrastructure, and elite athletic gear — all in one place. Powered by ICC-USA and RunSun Cloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400"
            />
            <Button
              variant="outline"
              className="border-blue-500/50 text-blue-300 hover:bg-blue-500/10 whitespace-nowrap"
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ── Featured ── */}
        {activeCategory === "All" && !search && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-blue-500/30" />
              <span className="text-blue-400 font-bold tracking-widest text-xs uppercase">Featured Products</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-500/30" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map(product => (
                <ProductCard key={product.id} product={product} onQuote={() => setQuoteProduct(product)} onBuy={() => handleBuyNow(product)} buyLoading={createProductCheckout.isPending} />
              ))}
            </div>
          </div>
        )}

        {/* ── Category Tabs ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Product Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} onQuote={() => setQuoteProduct(product)} onBuy={() => handleBuyNow(product)} buyLoading={createProductCheckout.isPending} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-20 text-white/40">
              <p className="text-2xl mb-2">No products found</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>

        {/* ── Partner Banner ── */}
        <div className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] mb-16">
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-6">Powered By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { name: "ICC-USA", sub: "Custom Server Solutions" },
              { name: "RunSun Cloud", sub: "NVIDIA Cloud Partner" },
              { name: "Nebius AI", sub: "Token Factory · 30+ Models" },
              { name: "Supermicro", sub: "Enterprise Hardware" },
              { name: "Intel Xeon", sub: "Platinum & Silver Series" },
            ].map(p => (
              <div key={p.name} className="text-center">
                <p className="font-bold text-white/80 text-sm">{p.name}</p>
                <p className="text-white/40 text-xs">{p.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center py-12 border border-blue-500/20 rounded-2xl bg-gradient-to-br from-blue-900/20 to-purple-900/10">
          <h2 className="text-3xl font-black mb-3">Need a Custom Configuration?</h2>
          <p className="text-white/60 mb-6 max-w-xl mx-auto">
            Our team works directly with ICC-USA and RunSun to build exactly what your organization needs. Enterprise pricing available.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 text-base font-bold"
              onClick={() => setQuoteProduct(PRODUCTS[0])}
            >
              Request a Quote
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-base" asChild>
              <Link href="/infrastructure">View Infrastructure</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Quote Modal ── */}
      {quoteProduct && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0d1525] border border-white/20 rounded-2xl p-8 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Request a Quote</h3>
                <p className="text-white/50 text-sm">{quoteProduct.name}</p>
              </div>
              <button onClick={() => setQuoteProduct(null)} className="text-white/40 hover:text-white text-2xl leading-none ml-4">×</button>
            </div>
            <form onSubmit={handleQuoteSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Full Name *</label>
                  <Input required value={quoteForm.name} onChange={e => setQuoteForm(f => ({ ...f, name: e.target.value }))} className="bg-white/5 border-white/20 text-white" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Email *</label>
                  <Input required type="email" value={quoteForm.email} onChange={e => setQuoteForm(f => ({ ...f, email: e.target.value }))} className="bg-white/5 border-white/20 text-white" placeholder="you@org.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Organization</label>
                  <Input value={quoteForm.org} onChange={e => setQuoteForm(f => ({ ...f, org: e.target.value }))} className="bg-white/5 border-white/20 text-white" placeholder="Company name" />
                </div>
                <div>
                  <label className="text-white/60 text-xs mb-1 block">Quantity</label>
                  <Input type="number" min="1" value={quoteForm.qty} onChange={e => setQuoteForm(f => ({ ...f, qty: e.target.value }))} className="bg-white/5 border-white/20 text-white" />
                </div>
              </div>
              <div>
                <label className="text-white/60 text-xs mb-1 block">Additional Notes</label>
                <textarea value={quoteForm.notes} onChange={e => setQuoteForm(f => ({ ...f, notes: e.target.value }))} className="w-full bg-white/5 border border-white/20 rounded-md p-3 text-white text-sm resize-none focus:outline-none focus:border-blue-400" rows={3} placeholder="Custom specs, timeline, budget range..." />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={submitting} className="flex-1 bg-blue-600 hover:bg-blue-500 font-bold">
                  {submitting ? "Submitting..." : "Submit Quote Request"}
                </Button>
                <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => setQuoteProduct(null)}>Cancel</Button>
              </div>
              <p className="text-white/30 text-xs text-center">Our team responds within 1 business day. No commitment required.</p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, onQuote, onBuy, buyLoading }: { product: typeof PRODUCTS[0]; onQuote: () => void; onBuy?: () => void; buyLoading?: boolean }) {
  return (
    <div className="group relative bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col">
      <div className="relative h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/20 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-24 h-24 object-contain opacity-90 group-hover:scale-110 transition-transform duration-500"
          onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          <span className={`${product.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>{product.badge}</span>
          <span className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full">{product.tag}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-white text-base mb-1 leading-tight">{product.name}</h3>
        <p className="text-white/50 text-xs mb-4">{product.tagline}</p>
        <ul className="space-y-1 mb-5 flex-1">
          {product.specs.slice(0, 4).map((spec, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-white/60">
              <span className="text-blue-400 mt-0.5 shrink-0">›</span>
              {spec}
            </li>
          ))}
        </ul>
        <div className="flex gap-2 mt-auto">
          {(product as any).priceInCents && onBuy ? (
            <>
              <Button
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white text-sm font-black py-2"
                onClick={onBuy}
                disabled={buyLoading}
              >
                {buyLoading ? "Loading..." : `Buy Now · ${(product as any).priceLabel}`}
              </Button>
              <Button variant="outline" className="border-white/20 text-white/60 hover:bg-white/10 hover:text-white text-sm px-3" onClick={onQuote}>Quote</Button>
            </>
          ) : (
            <>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold py-2" onClick={onQuote}>
                Request Quote
              </Button>
              <Button variant="outline" className="border-white/20 text-white/60 hover:bg-white/10 hover:text-white text-sm px-3" asChild>
                <Link href="/infrastructure">Details</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
