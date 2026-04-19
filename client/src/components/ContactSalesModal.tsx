import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ContactSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  inquiryType?: string;
}

export function ContactSalesModal({ isOpen, onClose, productName, inquiryType: defaultType }: ContactSalesModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    inquiryType: defaultType || "other",
    productInterest: productName || "",
    quantity: "",
    budget: "",
    timeline: "",
    message: "",
  });

  // Static mock — store router not yet implemented
  const submitInquiry = {
    mutate: (_input: unknown) => {
      toast("Inquiry Submitted!", { description: "Our sales team will respond within 24 hours." });
      onClose();
    },
    isPending: false,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      company: formData.company || undefined,
      jobTitle: formData.jobTitle || undefined,
      inquiryType: formData.inquiryType as any,
      productInterest: formData.productInterest || undefined,
      quantity: formData.quantity ? parseInt(formData.quantity) : undefined,
      budget: formData.budget || undefined,
      timeline: formData.timeline || undefined,
      message: formData.message || undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a2e] border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Contact Sales</h2>
          <p className="text-gray-400">
            Get a custom quote for enterprise solutions. Our team will respond within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Name *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your full name"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email *</label>
              <Input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Phone</label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Company</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your company name"
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Job Title</label>
            <Input
              value={formData.jobTitle}
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              placeholder="e.g., IT Director, CTO, Procurement Manager"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          {/* Inquiry Details */}
          <div className="border-t border-white/10 pt-4 mt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Inquiry Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Inquiry Type *</label>
                <Select
                  value={formData.inquiryType}
                  onValueChange={(value) => setFormData({ ...formData, inquiryType: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="enterprise_hardware">Enterprise Hardware</SelectItem>
                    <SelectItem value="data_center">Data Center Solutions</SelectItem>
                    <SelectItem value="software_license">Software Licensing</SelectItem>
                    <SelectItem value="fuel_bots">AI Companions / Fuel Bots</SelectItem>
                    <SelectItem value="support_contract">Support & Maintenance</SelectItem>
                    <SelectItem value="custom_solution">Custom Solution</SelectItem>
                    <SelectItem value="partnership">Partnership Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Product Interest</label>
                <Input
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                  placeholder="e.g., Supermicro 4U Storage Server"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Quantity</label>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g., 10"
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
              
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Budget Range</label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => setFormData({ ...formData, budget: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under_10k">Under $10,000</SelectItem>
                    <SelectItem value="10k_50k">$10,000 - $50,000</SelectItem>
                    <SelectItem value="50k_100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k_500k">$100,000 - $500,000</SelectItem>
                    <SelectItem value="500k_1m">$500,000 - $1M</SelectItem>
                    <SelectItem value="1m_5m">$1M - $5M</SelectItem>
                    <SelectItem value="5m_plus">$5M+</SelectItem>
                    <SelectItem value="not_sure">Not Sure / TBD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 mb-1 block">Timeline</label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                    <SelectItem value="1_month">Within 1 month</SelectItem>
                    <SelectItem value="1_3_months">1-3 months</SelectItem>
                    <SelectItem value="3_6_months">3-6 months</SelectItem>
                    <SelectItem value="6_12_months">6-12 months</SelectItem>
                    <SelectItem value="planning">Just planning / researching</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Message</label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us about your project, requirements, or any questions..."
              rows={4}
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitInquiry.isPending}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:opacity-90"
            >
              {submitInquiry.isPending ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </div>
        </form>

        {/* Trust Badges */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
            <span>🔒 Secure & Confidential</span>
            <span>⚡ 24hr Response Time</span>
            <span>🏆 NVIDIA Elite Partner</span>
            <span>🇺🇸 USA-Based Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
