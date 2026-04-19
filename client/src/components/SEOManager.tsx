import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * SEOManager: Automatically sets page title, meta description, and meta keywords
 * for every route change. Drop this once in App.tsx and all 110+ pages get SEO.
 */

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
}

const SEO_MAP: Record<string, SEOConfig> = {
  "/": {
    title: "ATHLYNX – The Athlete's Playbook | NIL Deals, Transfer Portal, Recruiting",
    description: "The all-in-one athlete platform for NIL deals, transfer portal intelligence, college recruiting, AI training, financial advisors, sports agents, and lawyers. From youth to retirement. Every sport. Every athlete. Better than Hudl, On3, 247Sports, and Perfect Game.",
    keywords: "ATHLYNX, athlete platform, NIL deals, transfer portal, college recruiting, AI training, sports agent, sports lawyer, financial advisor athletes, Hudl alternative, On3 alternative",
  },
  "/nil-marketplace": {
    title: "NIL Marketplace – Find & Sign NIL Deals | ATHLYNX",
    description: "Browse and sign NIL deals on the ATHLYNX marketplace. Connect with brands, NIL collectives, and sponsors. Calculate your NIL valuation. The best NIL deal platform for college and high school athletes.",
    keywords: "NIL marketplace, NIL deals, NIL collective, athlete sponsorship, brand deals, NIL platform, college athlete NIL",
  },
  "/nil-calculator": {
    title: "NIL Calculator – Calculate Your NIL Value | ATHLYNX",
    description: "Calculate your Name Image Likeness value with the ATHLYNX NIL Calculator. Based on social media following, sport, performance, and market size.",
    keywords: "NIL calculator, NIL valuation, athlete NIL value, name image likeness calculator, NIL worth",
  },
  "/nil-portal": {
    title: "NIL Portal – Manage Your NIL Deals & Contracts | ATHLYNX",
    description: "Manage all your NIL deals, contracts, and brand partnerships in one place. Track earnings, review offers, and connect with NIL collectives.",
    keywords: "NIL portal, NIL contract management, NIL earnings tracker, athlete NIL dashboard",
  },
  "/nil-vault": {
    title: "NIL Vault – Secure Your NIL Assets | ATHLYNX",
    description: "Store and protect your NIL contracts, brand deals, and financial documents in the ATHLYNX NIL Vault.",
    keywords: "NIL vault, NIL contract storage, athlete document vault",
  },
  "/transfer-portal": {
    title: "Transfer Portal – NCAA Transfer Portal Intelligence | ATHLYNX",
    description: "Real-time NCAA transfer portal tracking, school matching, and coach connections. Navigate transfer windows for football, basketball, baseball, and every sport.",
    keywords: "NCAA transfer portal, transfer portal tracker, college transfer, transfer portal dates, transfer portal window, football transfer portal, basketball transfer portal",
  },
  "/transfer-intelligence": {
    title: "Transfer Intelligence – AI Transfer Portal Analytics | ATHLYNX",
    description: "AI-powered transfer portal analytics. School matching algorithms, coach connection tools, and transfer window calendars for every NCAA sport.",
    keywords: "transfer portal intelligence, transfer analytics, AI transfer portal, school matching",
  },
  "/transfer-portal-fos": {
    title: "Transfer Portal FOS – Freedom of Sport | ATHLYNX",
    description: "Navigate the transfer portal with ATHLYNX Freedom of Sport system. Track entries, find schools, connect with coaches.",
    keywords: "transfer portal FOS, freedom of sport, transfer system",
  },
  "/signing-day": {
    title: "Signing Day – Commitments & Letters of Intent | ATHLYNX",
    description: "Track National Signing Day commitments, letters of intent, and scholarship offers across all sports.",
    keywords: "signing day, national signing day, letter of intent, NLI, scholarship commitment",
  },
  "/athlete-dashboard": {
    title: "Athlete Dashboard – Recruiting Command Center | ATHLYNX",
    description: "Your all-in-one athlete dashboard. Track recruiting activity, NIL deals, transfer portal status, training progress, and communications.",
    keywords: "athlete dashboard, recruiting dashboard, athlete command center, recruiting tracker",
  },
  "/athlete-playbook": {
    title: "The Athlete Playbook – Boost Recruiting & Media Profile | ATHLYNX",
    description: "The Athlete Playbook shows how ATHLYNX boosts your recruiting presence and media profile. Connect with athletes globally.",
    keywords: "athlete playbook, recruiting playbook, athlete media profile, recruiting presence",
  },
  "/athlete-website-builder": {
    title: "Athlete Website Builder – Recruiting Website | ATHLYNX",
    description: "Build your professional athlete website in minutes. Showcase highlights, stats, academics, and contact info.",
    keywords: "athlete website builder, recruiting website, athlete portfolio, sports website builder",
  },
  "/ai-training-bot": {
    title: "AI Training Bot – AI Athletic Training | ATHLYNX",
    description: "Train smarter with ATHLYNX AI Training Bot. Personalized workout plans, technique analysis, injury prevention, and performance optimization.",
    keywords: "AI training bot, AI athletic training, AI workout, AI sports training, athlete AI assistant",
  },
  "/ai-recruiter": {
    title: "AI Recruiter – AI College Recruiting Assistant | ATHLYNX",
    description: "Let AI find your perfect college match. ATHLYNX AI Recruiter analyzes your stats, academics, and preferences to connect you with the right schools.",
    keywords: "AI recruiter, AI recruiting assistant, AI college matching, AI scout, automated recruiting",
  },
  "/ai-content": {
    title: "AI Content Creator – Highlight Reels & Content | ATHLYNX",
    description: "Create professional highlight reels, recruiting videos, and social media content with ATHLYNX AI Content Creator.",
    keywords: "AI content creator, highlight reel creator, recruiting video, athlete content",
  },
  "/ai-sales": {
    title: "AI Sales – Athlete Brand Monetization | ATHLYNX",
    description: "AI-powered brand monetization and sales tools for athletes. Maximize your NIL value and brand partnerships.",
    keywords: "AI sales athletes, athlete brand monetization, NIL sales, athlete marketing",
  },
  "/wizards": {
    title: "Wizards – Professional Services for Athletes | ATHLYNX",
    description: "AI-powered professional services: sports agents, financial advisors, lawyers, scouts, career counselors, scholarship finders, and life coaches.",
    keywords: "athlete wizards, sports agent, financial advisor athletes, sports lawyer, AI scout",
  },
  "/wizards/agent": {
    title: "Agent Wizard – Find a Sports Agent | ATHLYNX",
    description: "Connect with verified sports agents. NIL deal negotiation, professional contract review, and career management.",
    keywords: "sports agent, athlete agent, NIL agent, find sports agent, athlete representation",
  },
  "/wizards/financial": {
    title: "Financial Wizard – Financial Advisors for Athletes | ATHLYNX",
    description: "Connect with financial advisors specializing in athlete wealth management. NIL earnings, investment planning, and retirement.",
    keywords: "financial advisor athletes, athlete wealth management, NIL financial planning",
  },
  "/wizards/lawyer": {
    title: "Lawyer Wizard – Sports Lawyers | ATHLYNX",
    description: "Access sports lawyers for NIL contract review, transfer portal legal guidance, and professional contract negotiation.",
    keywords: "sports lawyer, athlete lawyer, NIL contract lawyer, sports attorney",
  },
  "/wizards/scout": {
    title: "Scout Wizard – AI Athletic Scouting | ATHLYNX",
    description: "AI-powered scouting reports, performance analysis, and talent evaluation. Get discovered by coaches and scouts.",
    keywords: "AI scout, athletic scouting, talent evaluation, scouting report",
  },
  "/wizards/career": {
    title: "Career Wizard – Athlete Career Management | ATHLYNX",
    description: "Plan your athletic career from youth to retirement. Career path mapping and post-career transition planning.",
    keywords: "athlete career management, career planning athletes, post-career transition",
  },
  "/wizards/scholarship": {
    title: "Scholarship Wizard – Find Athletic Scholarships | ATHLYNX",
    description: "Find athletic scholarships across NCAA DI, DII, DIII, NAIA, and JUCO. AI-powered scholarship matching.",
    keywords: "athletic scholarship, scholarship finder, college scholarship, NCAA scholarship",
  },
  "/wizards/transfer": {
    title: "Transfer Wizard – Navigate the Transfer Portal | ATHLYNX",
    description: "AI-guided transfer portal navigation. School matching, eligibility verification, and transfer window tracking.",
    keywords: "transfer wizard, transfer portal guide, NCAA transfer help",
  },
  "/wizards/life": {
    title: "Life Wizard – Athlete Life Coach | ATHLYNX",
    description: "AI-powered life coaching for athletes. Mental health support, work-life balance, and personal development.",
    keywords: "athlete life coach, athlete mental health, athlete wellness, sports psychology",
  },
  "/football": {
    title: "Football Recruiting & NIL | ATHLYNX",
    description: "Football recruiting, NIL deals, transfer portal tracking, and AI training. From Pop Warner to the NFL.",
    keywords: "football recruiting, football NIL deals, football transfer portal, college football recruiting, football scholarship",
  },
  "/basketball": {
    title: "Basketball Recruiting & NIL | ATHLYNX",
    description: "Basketball recruiting, NIL deals, transfer portal tracking, and AI training. From AAU to the NBA.",
    keywords: "basketball recruiting, basketball NIL deals, basketball transfer portal, AAU basketball",
  },
  "/baseball": {
    title: "Baseball Recruiting & NIL | ATHLYNX",
    description: "Baseball recruiting, NIL deals, transfer portal tracking, and AI training. From travel ball to the MLB.",
    keywords: "baseball recruiting, baseball NIL deals, baseball transfer portal, Perfect Game alternative",
  },
  "/soccer": {
    title: "Soccer Recruiting & NIL | ATHLYNX",
    description: "Soccer recruiting, NIL deals, transfer portal tracking, and AI training. From club soccer to MLS.",
    keywords: "soccer recruiting, soccer NIL deals, soccer transfer portal, college soccer recruiting",
  },
  "/track": {
    title: "Track & Field Recruiting & NIL | ATHLYNX",
    description: "Track and field recruiting, NIL deals, transfer portal tracking. From high school track to Olympic trials.",
    keywords: "track recruiting, track and field NIL, track transfer portal, cross country recruiting",
  },
  "/swimming": {
    title: "Swimming Recruiting & NIL | ATHLYNX",
    description: "Swimming recruiting, NIL deals, transfer portal tracking. From club swimming to Olympic trials.",
    keywords: "swimming recruiting, swimming NIL deals, swimming transfer portal",
  },
  "/volleyball": {
    title: "Volleyball Recruiting & NIL | ATHLYNX",
    description: "Volleyball recruiting, NIL deals, transfer portal tracking. From club to college volleyball.",
    keywords: "volleyball recruiting, volleyball NIL deals, volleyball transfer portal",
  },
  "/wrestling": {
    title: "Wrestling Recruiting & NIL | ATHLYNX",
    description: "Wrestling recruiting, NIL deals, transfer portal tracking. From youth wrestling to NCAA championships.",
    keywords: "wrestling recruiting, wrestling NIL deals, wrestling transfer portal",
  },
  "/golf": {
    title: "Golf Recruiting & NIL | ATHLYNX",
    description: "Golf recruiting, NIL deals, and AI training. From junior golf to the PGA Tour.",
    keywords: "golf recruiting, golf NIL deals, college golf recruiting, junior golf",
  },
  "/tennis": {
    title: "Tennis Recruiting & NIL | ATHLYNX",
    description: "Tennis recruiting, NIL deals, and AI training. From junior tennis to the ATP/WTA.",
    keywords: "tennis recruiting, tennis NIL deals, college tennis recruiting",
  },
  "/hockey": {
    title: "Hockey Recruiting & NIL | ATHLYNX",
    description: "Hockey recruiting, NIL deals, transfer portal tracking. From youth hockey to the NHL.",
    keywords: "hockey recruiting, hockey NIL deals, hockey transfer portal",
  },
  "/pricing": {
    title: "Pricing – 7-Day Free Trial | ATHLYNX",
    description: "Start your 7-day free trial. Access NIL marketplace, transfer portal, AI training, recruiting tools, and professional services.",
    keywords: "ATHLYNX pricing, athlete platform pricing, free trial athlete platform",
  },
  "/feed": {
    title: "Athlete Feed – News & Community | ATHLYNX",
    description: "Your personalized athlete feed. Recruiting news, NIL deals, transfer portal updates, and community discussions.",
    keywords: "athlete feed, athlete social network, recruiting news, NIL news",
  },
  "/messenger": {
    title: "Athlete Messenger – Secure Communications | ATHLYNX",
    description: "Secure messaging for athletes, coaches, agents, and recruiters. NCAA-compliant recruiting communications.",
    keywords: "athlete messenger, recruiting messaging, coach contact",
  },
  "/founders": {
    title: "Founders – ATHLYNX Leadership Team",
    description: "Meet the founders behind ATHLYNX. Founded by Chad A. Dozier and Glenn Tse in Houston, TX since November 2024.",
    keywords: "ATHLYNX founders, Chad Dozier, Glenn Tse, Dozier Holdings Group",
  },
  "/dhg": {
    title: "Dozier Holdings Group – Parent Company of ATHLYNX",
    description: "Dozier Holdings Group is the parent company of ATHLYNX and Softmor Inc. Founded in Houston, TX.",
    keywords: "Dozier Holdings Group, DHG, ATHLYNX parent company",
  },
  "/softmor": {
    title: "Softmor Inc – Technology Division | ATHLYNX",
    description: "Softmor Inc is the technology division powering ATHLYNX. AI, robotics, and athlete technology innovation.",
    keywords: "Softmor Inc, ATHLYNX technology, sports technology",
  },
  "/health": {
    title: "Athlete Health – Medical & Wellness | ATHLYNX",
    description: "HIPAA-compliant athlete health management. Medical records, injury tracking, and wellness monitoring.",
    keywords: "athlete health, sports medicine, athlete medical records, HIPAA athlete",
  },
  "/privacy-policy": {
    title: "Privacy Policy | ATHLYNX",
    description: "ATHLYNX Privacy Policy. HIPAA-compliant data protection for athlete health records and personal information.",
  },
  "/terms-of-service": {
    title: "Terms of Service | ATHLYNX",
    description: "ATHLYNX Terms of Service. Platform usage terms, trial period, NIL disclaimer, and governing law.",
  },
  "/marketplace": {
    title: "Athlete Marketplace – Gear, Services & NIL | ATHLYNX",
    description: "Shop athlete gear, training equipment, NIL merchandise, and professional services.",
    keywords: "athlete marketplace, sports gear, NIL merch",
  },
  "/veterans": {
    title: "Veterans & Military Athletes | ATHLYNX",
    description: "ATHLYNX supports military veterans and active-duty athletes with special programs and career transition.",
    keywords: "veteran athletes, military athletes, warrior athletes",
  },
  "/community-feedback": {
    title: "Community Feedback | ATHLYNX",
    description: "Share your feedback and help shape the future of ATHLYNX.",
  },
  "/robot-companions": {
    title: "Robot Companions – AI Robots for Athletes | ATHLYNX",
    description: "AI-powered robot companions for training, recovery, and performance optimization.",
    keywords: "robot companions, AI robots athletes, training robots",
  },
  "/robotics": {
    title: "Robotics Division – Sports Robotics | ATHLYNX",
    description: "ATHLYNX Robotics Division. AI-powered robots for athletic training and performance analysis.",
    keywords: "sports robotics, AI robots, athlete robotics",
  },
  "/school": {
    title: "School Finder – Find Your Perfect College | ATHLYNX",
    description: "Find the perfect college for your athletic and academic goals. Search by sport, division, location.",
    keywords: "college finder, school finder athletes, NCAA schools",
  },
  "/comms-hub": {
    title: "Communications Hub | ATHLYNX",
    description: "Central communications hub for athletes. Messages from coaches, agents, brands, and teammates.",
    keywords: "athlete communications, recruiting messages",
  },
  "/social-hub": {
    title: "Social Hub – Athlete Social Network | ATHLYNX",
    description: "The athlete social network. Connect with athletes worldwide, share highlights, build your brand.",
    keywords: "athlete social network, athlete social media, sports social network",
  },
  "/media-showcase": {
    title: "Media Showcase – Highlights & Videos | ATHLYNX",
    description: "Showcase your best highlights and recruiting videos. Get discovered by coaches, scouts, and brands.",
    keywords: "highlight reel, recruiting video, athlete media, sports highlights",
  },
  "/careers": {
    title: "Careers at ATHLYNX – Join the Team",
    description: "Join the ATHLYNX team. Building the future of athlete technology.",
    keywords: "ATHLYNX careers, sports tech jobs",
  },
  "/contact": {
    title: "Contact ATHLYNX",
    description: "Contact the ATHLYNX team. Questions about NIL, recruiting, or the platform? We're here to help.",
  },
  "/download": {
    title: "Download ATHLYNX Mobile App",
    description: "Download the ATHLYNX mobile app. NIL deals, recruiting, AI training — all on your phone.",
    keywords: "download ATHLYNX, ATHLYNX app, athlete app",
  },
  "/mobile-app": {
    title: "ATHLYNX Mobile App – Your Playbook On The Go",
    description: "The ATHLYNX mobile app puts your entire athletic career in your pocket.",
    keywords: "ATHLYNX mobile app, athlete mobile app",
  },
  "/signup": {
    title: "Sign Up – 7-Day Free Trial | ATHLYNX",
    description: "Create your ATHLYNX account. 7-day free trial with full access to NIL marketplace, transfer portal, AI training, and recruiting tools.",
    keywords: "ATHLYNX signup, create account, free trial, athlete registration",
  },
  "/signin": {
    title: "Sign In | ATHLYNX",
    description: "Sign in to your ATHLYNX account. Access your athlete dashboard, NIL deals, recruiting tools, and more.",
    keywords: "ATHLYNX login, sign in, athlete login",
  },
  "/forgot-password": {
    title: "Forgot Password | ATHLYNX",
    description: "Reset your ATHLYNX password. Enter your email to receive a verification code.",
  },
  "/playbook": {
    title: "The Playbook – Athlete Strategy Guide | ATHLYNX",
    description: "Your complete athlete strategy guide. Recruiting playbooks, NIL strategies, training plans, and career roadmaps.",
    keywords: "athlete playbook, recruiting strategy, NIL strategy, training plan",
  },
  "/training": {
    title: "Training – AI-Powered Athletic Training | ATHLYNX",
    description: "AI-powered training programs for every sport. Personalized workouts, technique analysis, and performance tracking.",
    keywords: "athlete training, AI training, sports training, workout plans",
  },
  "/contracts": {
    title: "Contracts – NIL & Athletic Contracts | ATHLYNX",
    description: "Manage your NIL contracts, scholarship agreements, and athletic contracts in one secure place.",
    keywords: "NIL contracts, athlete contracts, scholarship agreement",
  },
  "/gridiron-nexus": {
    title: "Gridiron Nexus – Football Hub | ATHLYNX",
    description: "The football hub on ATHLYNX. Recruiting, NIL deals, transfer portal, training, and community for football athletes.",
    keywords: "gridiron nexus, football hub, football recruiting, football NIL",
  },
  "/court-kings": {
    title: "Court Kings – Basketball Hub | ATHLYNX",
    description: "The basketball hub on ATHLYNX. Recruiting, NIL deals, transfer portal, training, and community for basketball athletes.",
    keywords: "court kings, basketball hub, basketball recruiting, basketball NIL",
  },
  "/diamond-grind": {
    title: "Diamond Grind – Baseball Hub | ATHLYNX",
    description: "The baseball hub on ATHLYNX. Recruiting, NIL deals, transfer portal, training, and community for baseball athletes.",
    keywords: "diamond grind, baseball hub, baseball recruiting, baseball NIL",
  },
  "/pitch-pulse": {
    title: "Pitch Pulse – Soccer Hub | ATHLYNX",
    description: "The soccer hub on ATHLYNX. Recruiting, NIL deals, transfer portal, training, and community for soccer athletes.",
    keywords: "pitch pulse, soccer hub, soccer recruiting, soccer NIL",
  },
  "/track-elite": {
    title: "Track Elite – Track & Field Hub | ATHLYNX",
    description: "The track and field hub on ATHLYNX. Recruiting, NIL deals, training, and community for track athletes.",
    keywords: "track elite, track hub, track recruiting, track NIL",
  },
  "/swim-surge": {
    title: "Swim Surge – Swimming Hub | ATHLYNX",
    description: "The swimming hub on ATHLYNX. Recruiting, NIL deals, training, and community for swimmers.",
    keywords: "swim surge, swimming hub, swimming recruiting, swimming NIL",
  },
  "/net-setters": {
    title: "Net Setters – Volleyball Hub | ATHLYNX",
    description: "The volleyball hub on ATHLYNX. Recruiting, NIL deals, training, and community for volleyball athletes.",
    keywords: "net setters, volleyball hub, volleyball recruiting, volleyball NIL",
  },
  "/mat-warriors": {
    title: "Mat Warriors – Wrestling Hub | ATHLYNX",
    description: "The wrestling hub on ATHLYNX. Recruiting, NIL deals, training, and community for wrestlers.",
    keywords: "mat warriors, wrestling hub, wrestling recruiting, wrestling NIL",
  },
  "/fairway-elite": {
    title: "Fairway Elite – Golf Hub | ATHLYNX",
    description: "The golf hub on ATHLYNX. Recruiting, NIL deals, training, and community for golfers.",
    keywords: "fairway elite, golf hub, golf recruiting, golf NIL",
  },
  "/racket-kings": {
    title: "Racket Kings – Tennis Hub | ATHLYNX",
    description: "The tennis hub on ATHLYNX. Recruiting, NIL deals, training, and community for tennis players.",
    keywords: "racket kings, tennis hub, tennis recruiting, tennis NIL",
  },
  "/ice-breakers": {
    title: "Ice Breakers – Hockey Hub | ATHLYNX",
    description: "The hockey hub on ATHLYNX. Recruiting, NIL deals, training, and community for hockey players.",
    keywords: "ice breakers, hockey hub, hockey recruiting, hockey NIL",
  },
  "/reel-masters": {
    title: "Reel Masters – Fishing Hub | ATHLYNX",
    description: "The fishing hub on ATHLYNX. Community and content for fishing enthusiasts and outdoor athletes.",
    keywords: "reel masters, fishing hub, fishing community",
  },
  "/wellness": {
    title: "Athlete Wellness – Mental & Physical Health | ATHLYNX",
    description: "Complete athlete wellness platform. Mental health, nutrition, recovery, and performance optimization.",
    keywords: "athlete wellness, mental health athletes, athlete recovery, sports nutrition",
  },
  "/medical": {
    title: "Medical – HIPAA-Compliant Health Records | ATHLYNX",
    description: "HIPAA-compliant medical records management for athletes. Injury tracking, treatment history, and health analytics.",
    keywords: "athlete medical records, HIPAA compliant, sports medicine, injury tracking",
  },
  "/mindset": {
    title: "Mindset – Sports Psychology & Mental Training | ATHLYNX",
    description: "Sports psychology and mental training for athletes. Build mental toughness, focus, and resilience.",
    keywords: "sports psychology, mental training, athlete mindset, mental toughness",
  },
  "/gym": {
    title: "Gym – Training Facility Finder | ATHLYNX",
    description: "Find training facilities, gyms, and performance centers near you. Connect with trainers and coaches.",
    keywords: "athlete gym, training facility, performance center, sports training",
  },
  "/studio": {
    title: "Studio – Content Creation for Athletes | ATHLYNX",
    description: "Create professional content for recruiting, NIL branding, and social media. Video editing, graphics, and more.",
    keywords: "athlete studio, content creation, recruiting video, athlete branding",
  },
  "/investor-hub": {
    title: "Investor Hub | ATHLYNX",
    description: "Investment opportunities with ATHLYNX and Dozier Holdings Group. The future of athlete technology.",
    keywords: "ATHLYNX investors, sports tech investment, Dozier Holdings Group",
  },
  "/partners": {
    title: "Partners | ATHLYNX",
    description: "ATHLYNX partnership opportunities. Join the ecosystem powering the future of athlete technology.",
    keywords: "ATHLYNX partners, sports partnerships, athlete platform partners",
  },
  "/faith": {
    title: "Faith – Spiritual Wellness for Athletes | ATHLYNX",
    description: "Faith and spiritual wellness resources for athletes. Community, devotionals, and support.",
    keywords: "athlete faith, spiritual wellness, athlete devotional",
  },
  "/podcast": {
    title: "The Athlete's Playbook Podcast – NIL, Transfer Portal, Recruiting | ATHLYNX",
    description: "The definitive podcast for athletes navigating NIL deals, the transfer portal, recruiting, and building their brand. Hosted by Chad A. Dozier, Founder & CEO of ATHLYNX.",
    keywords: "athlete podcast, NIL podcast, transfer portal podcast, sports recruiting podcast, college athlete podcast, ATHLYNX podcast, Chad Dozier podcast, athlete success podcast",
  },
  "/music": {
    title: "Music – Athlete Playlists & Culture | ATHLYNX",
    description: "Music and culture hub for athletes. Curated playlists, artist connections, and music industry opportunities.",
    keywords: "athlete music, sports playlists, athlete culture",
  },
  "/hunting": {
    title: "Hunting – Outdoor Sports Hub | ATHLYNX",
    description: "Hunting and outdoor sports community for athletes. Gear, guides, and community.",
    keywords: "hunting athletes, outdoor sports, hunting community",
  },
  "/fishing": {
    title: "Fishing – Outdoor Sports Hub | ATHLYNX",
    description: "Fishing and outdoor sports community for athletes. Gear, guides, and community.",
    keywords: "fishing athletes, outdoor sports, fishing community",
  },
  "/bitcoin-mining": {
    title: "Bitcoin Mining – Digital Asset Division | ATHLYNX",
    description: "ATHLYNX digital asset and bitcoin mining division. Powering the future of athlete financial technology.",
    keywords: "bitcoin mining, athlete crypto, digital assets",
  },
  "/infrastructure": {
    title: "Infrastructure – Data Centers & Technology | ATHLYNX",
    description: "ATHLYNX infrastructure division. Data centers, geothermal energy, and next-generation technology.",
    keywords: "data centers, infrastructure, geothermal energy, technology",
  },
  "/military-division": {
    title: "Military Division – Warrior Athletes | ATHLYNX",
    description: "ATHLYNX Military Division. Supporting warrior athletes, veterans, and active-duty service members.",
    keywords: "military athletes, warrior athletes, veteran support",
  },
  "/operation-warrior-pipeline": {
    title: "Operation Warrior Pipeline | ATHLYNX",
    description: "Operation Warrior Pipeline. Transitioning military service members into athletic and professional careers.",
    keywords: "warrior pipeline, military transition, veteran athletes",
  },
  "/capabilities": {
    title: "Platform Capabilities | ATHLYNX",
    description: "Explore the full capabilities of the ATHLYNX platform. NIL, recruiting, AI, professional services, and more.",
    keywords: "ATHLYNX capabilities, platform features, athlete tools",
  },
  "/team": {
    title: "Our Team | ATHLYNX",
    description: "Meet the ATHLYNX team building the future of athlete technology.",
    keywords: "ATHLYNX team, leadership team",
  },
  "/hipaa": {
    title: "HIPAA Compliance | ATHLYNX",
    description: "ATHLYNX HIPAA compliance information. How we protect athlete health data.",
    keywords: "HIPAA compliance, athlete health data, data protection",
  },
  "/legal-compliance": {
    title: "Legal Compliance | ATHLYNX",
    description: "ATHLYNX legal compliance information. State-specific laws, NCAA compliance, and regulatory adherence.",
    keywords: "legal compliance, NCAA compliance, athlete legal",
  },
  "/legal-hub": {
    title: "Legal Hub | ATHLYNX",
    description: "ATHLYNX Legal Hub. Access legal resources, compliance information, and regulatory guidance.",
    keywords: "legal hub, athlete legal resources",
  },
  "/white-label": {
    title: "White Label – Custom Athlete Platforms | ATHLYNX",
    description: "White label ATHLYNX technology for schools, conferences, and organizations. Custom-branded athlete platforms.",
    keywords: "white label, custom platform, school athlete platform",
  },
  "/early-access": {
    title: "Early Access – Join the VIP Waitlist | ATHLYNX",
    description: "Join the ATHLYNX VIP early access waitlist. Be first to experience the future of athlete technology.",
    keywords: "early access, VIP waitlist, ATHLYNX beta",
  },
  "/app-store": {
    title: "App Store – Athlete Apps & Integrations | ATHLYNX",
    description: "Browse athlete apps and integrations on the ATHLYNX App Store.",
    keywords: "athlete apps, sports apps, ATHLYNX integrations",
  },
  "/shop": {
    title: "Shop – Athlete Gear & Merchandise | ATHLYNX",
    description: "Shop ATHLYNX gear, athlete merchandise, and training equipment.",
    keywords: "athlete shop, sports merchandise, ATHLYNX gear",
  },
  "/store": {
    title: "Store – ATHLYNX Merchandise | ATHLYNX",
    description: "Official ATHLYNX store. Gear, apparel, and merchandise for athletes.",
    keywords: "ATHLYNX store, athlete merchandise",
  },
  "/billing": {
    title: "Billing – Manage Your Subscription | ATHLYNX",
    description: "Manage your ATHLYNX subscription, billing, and payment information.",
  },
  "/notifications": {
    title: "Notifications | ATHLYNX",
    description: "Your ATHLYNX notifications. Recruiting updates, NIL offers, messages, and platform alerts.",
  },
  "/fuel-bots": {
    title: "Fuel Bots – AI Nutrition & Energy | ATHLYNX",
    description: "AI-powered nutrition and energy optimization for athletes. Personalized meal plans and supplement guidance.",
    keywords: "athlete nutrition, AI nutrition, fuel bots, sports nutrition",
  },
  "/team-bots": {
    title: "Team Bots – AI Team Management | ATHLYNX",
    description: "AI-powered team management and communication tools. Coordinate with teammates, coaches, and staff.",
    keywords: "team bots, AI team management, sports team tools",
  },
  "/wizard-hub": {
    title: "Wizard Hub – All AI Assistants | ATHLYNX",
    description: "Access all ATHLYNX AI wizards and assistants from one hub. Agents, financial advisors, lawyers, scouts, and more.",
    keywords: "wizard hub, AI assistants, athlete AI tools",
  },
  "/serenity-memorial": {
    title: "Serenity Memorial | ATHLYNX",
    description: "Serenity Memorial. Honoring athletes and their legacies.",
  },
  "/warriors-playbook": {
    title: "Warriors Playbook – Military Athlete Guide | ATHLYNX",
    description: "The Warriors Playbook for military athletes. Training, career transition, and community support.",
    keywords: "warriors playbook, military athlete guide, veteran training",
  },
};

export function SEOManager() {
  const [location] = useLocation();

  useEffect(() => {
    // Normalize path: remove trailing slash, handle dynamic segments
    const path = location.replace(/\/$/, "") || "/";
    const basePath = path.replace(/\/[^/]+$/, "") || path; // For dynamic routes like /profile/:id

    const config = SEO_MAP[path] || SEO_MAP[basePath];

    if (config) {
      document.title = config.title;

      // Meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", config.description);

      // Meta keywords
      if (config.keywords) {
        const metaKw = document.querySelector('meta[name="keywords"]');
        if (metaKw) metaKw.setAttribute("content", config.keywords);
      }

      // Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", config.title);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", config.description);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute("content", `https://athlynx.com${path}`);

      // Twitter
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute("content", config.title);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", config.description);

      // Canonical
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", `https://athlynx.com${path}`);
      }
    } else {
      // Fallback: generate title from path
      const pageName = path
        .replace(/^\//, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      document.title = `${pageName || "ATHLYNX"} | ATHLYNX – The Athlete's Playbook`;
    }
  }, [location]);

  return null; // This component renders nothing, just manages document head
}

export default SEOManager;
