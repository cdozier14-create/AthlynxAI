import { Link } from "wouter";

const EFFECTIVE_DATE = "January 1, 2026";
const COMPANY = "Softmor Inc. / Dozier Holdings Group";
const EMAIL = "cdozier14@dozierholdingsgroup.com.mx";
const ADDRESS = "12306 Lake Portal Drive, Houston, TX 77047";

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    body: `ATHLYNX is a product of ${COMPANY} ("Company," "we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the ATHLYNX platform, including all web applications, mobile applications, and related services (collectively, the "Platform"). By accessing or using the Platform, you agree to the collection and use of information in accordance with this policy. If you do not agree, please discontinue use of the Platform immediately.`,
  },
  {
    id: "collection",
    title: "2. Information We Collect",
    body: `We collect the following categories of information when you use the Platform:

Account Information: When you register, we collect your name, email address, password (stored as a bcrypt hash — never in plain text), sport, school, graduation year, and any other information you voluntarily provide.

Profile Data: Athletic statistics, recruiting profiles, NIL deal information, academic information, and other data you add to your profile.

Usage Data: Log files, IP addresses, browser type, device identifiers, pages visited, time spent on pages, referring URLs, and other diagnostic data automatically collected when you use the Platform.

Communications: Messages sent through the ATHLYNX Messenger, feedback submitted, and support requests.

Payment Information: If you subscribe to a paid plan, payment is processed by Stripe, Inc. We store only your Stripe Customer ID and subscription status — we never store full card numbers, CVV codes, or banking credentials.

Health and Wellness Data: If you use ATHLYNX wellness or training features, you may voluntarily provide health-related information. This data is treated with heightened protection consistent with applicable law.`,
  },
  {
    id: "use",
    title: "3. How We Use Your Information",
    body: `We use the information we collect to:

- Provide, operate, and maintain the Platform and its features
- Create and manage your account and subscription
- Process payments and send related notices
- Personalize your experience and deliver relevant content
- Connect you with coaches, recruiters, brands, and other athletes
- Provide AI-powered recruiting, NIL, and career management tools
- Send administrative communications, including security alerts and policy updates
- Send promotional communications (you may opt out at any time)
- Analyze usage patterns to improve the Platform
- Detect, prevent, and address technical issues, fraud, and abuse
- Comply with applicable legal obligations

We do not sell your personal information to third parties. We do not use your data to train third-party AI models without your explicit consent.`,
  },
  {
    id: "hipaa",
    title: "4. Health Data & HIPAA",
    body: `ATHLYNX is not a covered entity under the Health Insurance Portability and Accountability Act (HIPAA) in its general operations. However, we treat all health and wellness data with the highest level of care:

- Health data is stored with encryption at rest and in transit
- Health data is accessible only to you and authorized personnel
- Health data is never sold or shared with third parties without your explicit consent
- Health data is subject to deletion upon your request

If you are a healthcare provider or institution using ATHLYNX for patient-athlete management, please contact us to discuss a Business Associate Agreement (BAA) at ${EMAIL}.`,
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    body: `We use cookies and similar tracking technologies to maintain your login session, remember your preferences, analyze Platform usage, and improve Platform performance.

Essential Cookies: Required for the Platform to function. These cannot be disabled without impairing core functionality.

Analytics Cookies: Help us understand how users interact with the Platform (e.g., page views, session duration). We use aggregated, anonymized data only.

Preference Cookies: Remember your settings and preferences across sessions.

You can control cookies through your browser settings. We do not use third-party advertising cookies or cross-site tracking cookies for behavioral advertising.`,
  },
  {
    id: "sharing",
    title: "6. Data Sharing & Disclosure",
    body: `We may share your information in the following circumstances:

Service Providers: We share data with trusted third-party vendors who assist us in operating the Platform (e.g., Stripe for payments, AWS for cloud infrastructure). These vendors are contractually obligated to protect your data and may not use it for their own purposes.

With Your Consent: We may share information with coaches, recruiters, brands, or other athletes when you explicitly enable such sharing through Platform features (e.g., entering the Transfer Portal, publishing your NIL profile).

Legal Requirements: We may disclose information if required by law, subpoena, court order, or to protect the rights, property, or safety of the Company, our users, or the public.

Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred. We will notify you before your information becomes subject to a different privacy policy.

We do not sell, rent, or trade your personal information to third parties for their marketing purposes.`,
  },
  {
    id: "retention",
    title: "7. Data Retention",
    body: `We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal, regulatory, or legitimate business purposes (such as fraud prevention or tax records).

Aggregated, anonymized data may be retained indefinitely for analytics and Platform improvement purposes.`,
  },
  {
    id: "rights",
    title: "8. Your Rights",
    body: `Depending on your jurisdiction, you may have the following rights regarding your personal information:

Access: Request a copy of the personal information we hold about you.

Correction: Request correction of inaccurate or incomplete information.

Deletion: Request deletion of your personal information ("right to be forgotten").

Portability: Request a machine-readable copy of your data.

Restriction: Request that we restrict processing of your information in certain circumstances.

Objection: Object to processing of your information for direct marketing purposes.

Opt-Out of Sale: We do not sell personal information. If this changes, we will provide an opt-out mechanism.

To exercise any of these rights, contact us at ${EMAIL}. We will respond within 30 days.

California Residents (CCPA): California residents have additional rights under the California Consumer Privacy Act, including the right to know about personal information collected, the right to delete, and the right to opt out of sale. We do not sell personal information.`,
  },
  {
    id: "security",
    title: "9. Data Security",
    body: `We implement industry-standard security measures to protect your information, including:

- TLS/SSL encryption for all data in transit
- AES-256 encryption for sensitive data at rest
- Bcrypt hashing for all passwords (never stored in plain text)
- Role-based access controls limiting data access to authorized personnel
- Regular security audits and vulnerability assessments
- Secure cloud infrastructure (AWS)

No method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security. In the event of a data breach affecting your rights, we will notify you as required by applicable law.`,
  },
  {
    id: "children",
    title: "10. Children's Privacy",
    body: `ATHLYNX is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at ${EMAIL}. If we discover that a child under 13 has provided us with personal information, we will delete it promptly.

For users between 13 and 18 years of age, we encourage parental involvement in reviewing this Privacy Policy and the Terms of Service.`,
  },
  {
    id: "third-party",
    title: "11. Third-Party Links & Integrations",
    body: `The Platform may contain links to third-party websites, services, or integrations (e.g., social media platforms, brand partner portals). This Privacy Policy does not apply to those third-party services. We encourage you to review the privacy policies of any third-party services you access through the Platform. We are not responsible for the privacy practices of third parties.`,
  },
  {
    id: "international",
    title: "12. International Data Transfers",
    body: `ATHLYNX is operated from the United States. If you access the Platform from outside the United States, your information may be transferred to, stored, and processed in the United States, where data protection laws may differ from those in your country. By using the Platform, you consent to such transfer.`,
  },
  {
    id: "changes",
    title: "13. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated effective date and, where appropriate, by sending you an email notification. Your continued use of the Platform after any changes constitutes your acceptance of the updated policy. We encourage you to review this policy periodically.`,
  },
  {
    id: "contact",
    title: "14. Contact Us",
    body: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:

Softmor Inc. / Dozier Holdings Group
${ADDRESS}
Email: ${EMAIL}

We are committed to resolving privacy concerns promptly and transparently.`,
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050c1a] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#050c1a]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/qUknrdlyPrUZJQYo.png"
              alt="ATHLYNX"
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="text-white font-black text-lg tracking-widest">ATHLYNX</span>
          </Link>
          <Link href="/terms-of-service" className="text-[#00c2ff] text-sm hover:underline">
            Terms of Service →
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <div className="mb-2">
          <span className="text-xs text-[#00c2ff] font-semibold uppercase tracking-widest">Legal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Privacy Policy</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/50 mb-4">
          <span>Effective: <strong className="text-white/80">{EFFECTIVE_DATE}</strong></span>
          <span>Last Updated: <strong className="text-white/80">April 15, 2026</strong></span>
          <span>Governing Law: <strong className="text-white/80">State of Mississippi</strong></span>
        </div>
        <div className="p-4 bg-[#0a1628] border border-[#00c2ff]/20 rounded-xl text-sm text-white/70 leading-relaxed">
          This Privacy Policy describes how <strong className="text-white">{COMPANY}</strong> collects, uses, and protects your personal information when you use the ATHLYNX platform. Please read this policy carefully before using our services.
        </div>
      </div>

      {/* Table of Contents */}
      <div className="max-w-5xl mx-auto px-4 mb-10">
        <div className="bg-[#0a1628] border border-white/10 rounded-xl p-6">
          <h2 className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">Table of Contents</h2>
          <div className="grid sm:grid-cols-2 gap-1">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-[#00c2ff] text-sm hover:underline py-0.5">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-20">
        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-xl font-black text-white mb-4 pb-2 border-b border-white/10">
                {section.title}
              </h2>
              <div className="text-white/70 text-sm leading-relaxed space-y-3">
                {section.body.split("\n\n").map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Softmor Inc. / Dozier Holdings Group. All rights reserved.
          </p>
          <p className="text-white/30 text-xs mt-1">{ADDRESS}</p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <Link href="/terms-of-service" className="text-[#00c2ff] hover:underline">Terms of Service</Link>
            <Link href="/" className="text-white/50 hover:text-white transition-colors">← Back to ATHLYNX</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
