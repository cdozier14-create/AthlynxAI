import { Link } from "wouter";

const EFFECTIVE_DATE = "January 1, 2026";
const COMPANY = "Softmor Inc. / Dozier Holdings Group";
const EMAIL = "cdozier14@dozierholdingsgroup.com.mx";
const ADDRESS = "12306 Lake Portal Drive, Houston, TX 77047";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: `By accessing or using the ATHLYNX platform ("Platform"), including all web applications, mobile applications, and related services provided by ${COMPANY} ("Company," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use the Platform.

These Terms constitute a legally binding agreement between you and the Company. We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on the Platform with a new effective date. Your continued use of the Platform after any changes constitutes your acceptance of the updated Terms.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility",
    body: `To use the Platform, you must:

- Be at least 13 years of age. Users between 13 and 17 must have parental or guardian consent.
- Be a human individual (not an automated bot or script)
- Have the legal capacity to enter into a binding agreement
- Not be prohibited from using the Platform under applicable law
- Provide accurate, current, and complete registration information

By registering, you represent and warrant that you meet all eligibility requirements. We reserve the right to suspend or terminate accounts that do not meet these requirements.

Student-athletes are responsible for understanding and complying with their institution's and governing body's (NCAA, NAIA, NJCAA, etc.) rules and regulations regarding platform use, NIL activities, and recruiting communications.`,
  },
  {
    id: "accounts",
    title: "3. Account Registration & Security",
    body: `When you create an account, you agree to:

- Provide accurate, current, and complete information
- Maintain and promptly update your account information
- Keep your password confidential and not share it with others
- Notify us immediately of any unauthorized use of your account at ${EMAIL}
- Be responsible for all activities that occur under your account

You may not create an account on behalf of another person without their explicit consent. You may not use another person's account without authorization. We reserve the right to refuse registration or cancel accounts at our discretion.`,
  },
  {
    id: "trial",
    title: "4. Free Trial & Subscription",
    body: `Free Trial: New users receive a 7-day free trial with access to all Platform features. No credit card is required to start the trial. At the end of the trial period, continued access to premium features requires a paid subscription.

Subscription Plans: We offer multiple subscription tiers. Current pricing is available at athlynx.io/pricing. Prices are subject to change with 30 days' notice.

Billing: Subscriptions are billed on a recurring basis (monthly or annually, depending on your plan) through Stripe, Inc. By subscribing, you authorize us to charge your payment method on a recurring basis.

Cancellation: You may cancel your subscription at any time through your account settings or by contacting us. Cancellation takes effect at the end of the current billing period. We do not provide refunds for partial billing periods, except where required by law.

Refunds: All sales are final unless otherwise required by applicable law. If you believe you were charged in error, contact us at ${EMAIL} within 30 days of the charge.`,
  },
  {
    id: "conduct",
    title: "5. Acceptable Use",
    body: `You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:

- Use the Platform in any way that violates applicable law or regulation
- Impersonate any person or entity, or falsely represent your affiliation with any person or entity
- Upload, post, or transmit any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable
- Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Platform
- Use the Platform to send unsolicited communications (spam)
- Attempt to gain unauthorized access to any portion of the Platform or any other systems or networks
- Use any automated means (bots, scrapers, crawlers) to access the Platform without our express written consent
- Collect or harvest any personally identifiable information from the Platform without authorization
- Interfere with or disrupt the integrity or performance of the Platform
- Upload or transmit viruses, malware, or any other malicious code

We reserve the right to terminate your access to the Platform for violations of this section.`,
  },
  {
    id: "nil",
    title: "6. NIL (Name, Image & Likeness) Disclaimer",
    body: `IMPORTANT: ATHLYNX provides tools and information related to Name, Image, and Likeness (NIL) activities for educational and informational purposes only. The following disclaimers apply:

NCAA / Governing Body Compliance: NIL rules and regulations vary by governing body (NCAA, NAIA, NJCAA, state law, etc.) and are subject to frequent change. ATHLYNX does not guarantee that any NIL activity facilitated through the Platform complies with your institution's or governing body's current rules. You are solely responsible for ensuring your NIL activities comply with all applicable rules.

Not Legal Advice: Nothing on the Platform constitutes legal, financial, tax, or professional advice. Information provided is for general informational purposes only. Consult a qualified attorney, financial advisor, or agent before entering into any NIL agreement.

No Guarantee of Deals: ATHLYNX does not guarantee that use of the Platform will result in NIL deals, brand partnerships, recruiting offers, or any other specific outcome.

Third-Party Brands and Agents: ATHLYNX is not responsible for the conduct, representations, or obligations of any brand, agent, coach, recruiter, or other third party you interact with through the Platform.

Tax Obligations: NIL compensation may be taxable income. You are responsible for understanding and fulfilling your tax obligations. Consult a tax professional.`,
  },
  {
    id: "content",
    title: "7. User Content",
    body: `You retain ownership of content you post on the Platform ("User Content"). By posting User Content, you grant the Company a non-exclusive, worldwide, royalty-free, sublicensable license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content in connection with operating and promoting the Platform.

You represent and warrant that: (a) you own or have the necessary rights to post the User Content; (b) the User Content does not infringe any third-party intellectual property rights; (c) the User Content complies with these Terms and all applicable laws.

We reserve the right to remove any User Content that violates these Terms or that we determine, in our sole discretion, is harmful, offensive, or otherwise objectionable.`,
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    body: `The Platform and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of ${COMPANY} and its licensors. The Platform is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.

ATHLYNX, the ATHLYNX logo, Dozier Holdings Group, Softmor Inc., and related marks are trademarks of ${COMPANY}. All rights reserved.`,
  },
  {
    id: "privacy",
    title: "9. Privacy",
    body: `Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Platform, you consent to the collection and use of your information as described in the Privacy Policy.`,
  },
  {
    id: "disclaimers",
    title: "10. Disclaimers & Limitation of Liability",
    body: `THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.

THE COMPANY DOES NOT WARRANT THAT: (A) THE PLATFORM WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE PLATFORM IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; (D) THE RESULTS OF USING THE PLATFORM WILL MEET YOUR REQUIREMENTS.

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE COMPANY, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF (OR INABILITY TO ACCESS OR USE) THE PLATFORM.

IN NO EVENT SHALL THE COMPANY'S TOTAL LIABILITY TO YOU EXCEED THE AMOUNT YOU PAID TO THE COMPANY IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.`,
  },
  {
    id: "indemnification",
    title: "11. Indemnification",
    body: `You agree to defend, indemnify, and hold harmless ${COMPANY} and its officers, directors, employees, contractors, agents, licensors, service providers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Platform, including, but not limited to, your User Content, any use of the Platform's content, services, and products other than as expressly authorized in these Terms.`,
  },
  {
    id: "governing-law",
    title: "12. Governing Law & Dispute Resolution",
    body: `These Terms shall be governed by and construed in accordance with the laws of the State of Mississippi, without regard to its conflict of law provisions.

Any dispute arising from or relating to these Terms or the Platform shall first be subject to good-faith negotiation between the parties. If the dispute cannot be resolved through negotiation within 30 days, it shall be submitted to binding arbitration in Hinds County, Mississippi, under the rules of the American Arbitration Association.

You waive any right to participate in a class action lawsuit or class-wide arbitration. You may only bring claims against the Company in your individual capacity.

Notwithstanding the foregoing, either party may seek injunctive or other equitable relief in any court of competent jurisdiction to prevent irreparable harm.`,
  },
  {
    id: "termination",
    title: "13. Termination",
    body: `We may terminate or suspend your account and access to the Platform immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms.

Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your account, you may do so through your account settings or by contacting us at ${EMAIL}.

All provisions of these Terms which by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.`,
  },
  {
    id: "miscellaneous",
    title: "14. Miscellaneous",
    body: `Entire Agreement: These Terms, together with the Privacy Policy, constitute the entire agreement between you and the Company regarding the Platform and supersede all prior agreements.

Severability: If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions will continue in full force and effect.

Waiver: Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.

Assignment: You may not assign these Terms or any rights hereunder without our prior written consent. We may assign these Terms without restriction.

Force Majeure: We will not be liable for any failure or delay in performance due to causes beyond our reasonable control.`,
  },
  {
    id: "contact",
    title: "15. Contact Us",
    body: `If you have questions about these Terms, please contact us:

${COMPANY}
${ADDRESS}
Email: ${EMAIL}

For legal notices, please send written correspondence to the address above, Attention: Legal Department.`,
  },
];

export default function TermsOfService() {
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
          <Link href="/privacy-policy" className="text-[#00c2ff] text-sm hover:underline">
            Privacy Policy →
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        <div className="mb-2">
          <span className="text-xs text-[#00c2ff] font-semibold uppercase tracking-widest">Legal</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-4">Terms of Service</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/50 mb-4">
          <span>Effective: <strong className="text-white/80">{EFFECTIVE_DATE}</strong></span>
          <span>Last Updated: <strong className="text-white/80">April 15, 2026</strong></span>
          <span>Governing Law: <strong className="text-white/80">State of Mississippi</strong></span>
        </div>
        <div className="p-4 bg-[#0a1628] border border-[#00c2ff]/20 rounded-xl text-sm text-white/70 leading-relaxed">
          Please read these Terms of Service carefully before using the ATHLYNX platform. By accessing or using the Platform, you agree to be bound by these Terms. If you do not agree, do not use the Platform.
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
            <Link href="/privacy-policy" className="text-[#00c2ff] hover:underline">Privacy Policy</Link>
            <Link href="/" className="text-white/50 hover:text-white transition-colors">← Back to ATHLYNX</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
