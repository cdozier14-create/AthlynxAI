# ATHLYNX Platform TODO

## Core Layout & Navigation
- [x] Facebook-style top navbar with ATHLYNX logo, search, profile, notifications, messages icons
- [x] Left sidebar: profile card, app links (NIL Portal, Messenger, Diamond Grind, etc.)
- [x] Right sidebar: trending athletes, suggested connections, upcoming events
- [x] Bottom mobile nav bar (5 icons: Home, NIL, Chat, Transfer, Profile)
- [x] Dark navy/blue theme throughout

## Social Feed (Home)
- [x] Create post box (text, photo, video, highlight reel)
- [x] Stories bar at top (athlete stories)
- [x] Feed posts with like, comment, share, recruit button
- [x] Post types: highlight video, training update, game result, NIL deal announcement
- [x] Infinite scroll feed with sample posts

## Athlete Profile Page
- [x] Cover photo + profile photo
- [x] Stats bar: sport, position, school, height/weight, GPA
- [x] Highlight reel video section
- [x] Recruiting status badge (Available, Committed, Signed)
- [x] NIL value indicator
- [x] Posts/Media/Stats tabs

## Messenger App
- [x] Inbox list with conversations
- [x] Chat window with messages
- [x] Group chats (team rooms)
- [x] Recruiting DMs from coaches
- [x] Read receipts + online status

## NIL Portal App
- [x] Brand deal marketplace
- [x] Active deals dashboard
- [x] NIL value calculator
- [x] Contract signing flow
- [x] Earnings tracker

## Transfer Portal App
- [x] Available athletes board
- [x] School/program search
- [x] Transfer eligibility checker
- [x] Coach contact request

## Diamond Grind App
- [x] Training programs
- [x] Workout tracker
- [x] Performance analytics
- [x] Leaderboard

## Warriors Playbook App
- [x] Playbook library
- [x] Film room
- [x] Play designer
- [x] Team strategy board

## NIL Vault App
- [x] Document storage
- [x] Contract archive
- [x] Earnings history
- [x] Tax documents

## AI Sales App
- [x] Brand pitch generator
- [x] Deal negotiation AI
- [x] Sponsor matching

## AI Recruiter App
- [x] Recruiting profile optimizer
- [x] Coach outreach AI
- [x] School fit analyzer

## AI Content App
- [x] Highlight reel generator
- [x] Social media content creator
- [x] Brand content studio

## Faith App
- [x] Daily devotionals for athletes
- [x] Team chapel / Prayer Wall
- [x] Motivational content

## Founders & DHG Pages
- [x] Founders page shows Chad A. Dozier and Glenn Tse only
- [x] DHG page shows correct founding story (Houston TX, Nov 2024, Hope Lodge)
- [x] Crab logo used for DHG throughout

## Correct Icons (LOCKED IN - DO NOT CHANGE)
- [x] All 10 app icons use CDN URLs from user-provided files
- [x] NIL Portal: portal_2d64f7ab.jpeg
- [x] Messenger: messenger_7c14ce8a.jpeg
- [x] Diamond Grind: diamond-grind_890f28f2.png
- [x] Warriors Playbook: warriors-playbook_b10e7359.png
- [x] Transfer Portal: transfer-portal_509bd0ba.png
- [x] NIL Vault: nil-vault_e80ffa38.png
- [x] AI Sales: ai-sales_09e2681e.png
- [x] Faith: faith_3b8bdefb.png
- [x] AI Recruiter: ai-recruiter_4cfda0f2.png
- [x] AI Content: ai-content_8f3ef4e3.png
- [x] ATHLYNX header: athlynx-main-icon_7b5e9ca6.png
- [x] DHG/crab: crab-logo_e4eb935b.png
- [x] All videos use CDN URLs

## Deployment
- [x] Save checkpoint
- [x] Publish via Manus UI

## Fixes Required
- [x] Change defaultTheme from "dark" to "light" in App.tsx
- [x] Update index.css :root to use blue background (not white)
- [x] Remove .dark class usage — no dark theme anywhere
- [x] Add dozierholdingsgroup.com hyperlink in header and DHG page
- [x] Verify all 17 pages render with blue theme
- [x] Deploy to athlynxapp.vip

## DHG Link & Site
- [x] Fix ATHLYNX DHG link to point to internal /dhg page (dozierholdingsgroup.com is parked)
- [ ] Build full Dozier Holdings Group website on Manus
- [ ] Save checkpoint after DHG link fix

## Stripe Payments & Subscriptions
- [x] Add Stripe feature scaffold (webdev_add_feature)
- [x] Create pricing plans: Athlete Free, Pro $9.99/mo, Elite $29.99/mo, NIL Vault $49.99/mo
- [x] Build Pricing page with Stripe checkout for subscription tiers
- [x] Add Stripe checkout session tRPC procedure (server-side)
- [x] Add Stripe webhook handler for subscription events
- [x] Add subscription status to user profile/dashboard
- [x] Build credits/token purchase flow
- [x] Add billing portal link for managing subscriptions
- [x] Show subscription badge on user profile

## Ecosystem & Domains
- [x] Add "Our Full Ecosystem" section with hyperlinks to all 11 domains
- [x] Add footer links to all related domains

## Database-Backed Features (Real Data)
- [x] Add posts table (userId, content, type, mediaUrl, likes, createdAt)
- [x] Add athlete_profiles table (userId, sport, position, school, height, weight, gpa, recruitingStatus, nilValue)
- [x] Add messages table (senderId, receiverId, conversationId, content, readAt)
- [x] Add conversations table (participants, lastMessage, updatedAt)
- [x] Add nil_deals table (athleteId, brandName, dealValue, status, description, startDate, endDate)
- [x] Add training_logs table (userId, workout, duration, notes, date)
- [x] Push all schema changes to DB

## Real Feed (tRPC + DB)
- [ ] createPost mutation (text, type, mediaUrl)
- [ ] getFeed query (paginated, most recent first)
- [ ] likePost mutation + unlikePost
- [ ] getPost query with like count
- [ ] Feed page reads from DB instead of static data

## Real Athlete Profile (tRPC + DB)
- [ ] getProfile query (by userId or current user)
- [ ] updateProfile mutation (sport, position, school, stats, bio)
- [ ] Profile page reads/writes real data
- [ ] Upload profile photo to S3

## Real Messenger (tRPC + DB)
- [ ] getConversations query
- [ ] getMessages query (by conversationId)
- [ ] sendMessage mutation
- [ ] Messenger page reads/writes real data
- [ ] Real-time feel with polling (5s refetch)

## AI Sales App - Real LLM
- [ ] generateBrandPitch mutation (uses invokeLLM)
- [ ] analyzeDeal mutation (uses invokeLLM)
- [ ] AI Sales page sends real prompts and shows streaming response

## AI Recruiter App - Real LLM
- [ ] optimizeProfile mutation (uses invokeLLM)
- [ ] generateCoachEmail mutation (uses invokeLLM)
- [ ] AI Recruiter page sends real prompts and shows responses

## AI Content App - Real LLM
- [ ] generateCaption mutation (uses invokeLLM)
- [ ] generateBio mutation (uses invokeLLM)
- [ ] AI Content page sends real prompts and shows responses

## DHG Website (Full Build)
- [ ] Fix DHG internal link to /dhg page
- [ ] Full DHG page: founding story (Houston TX, Nov 2024, Hope Lodge), Chad & Glenn
- [ ] DHG subsidiaries grid (ATHLYNX, NIL Portals, Transfer Portal AI, aibotecosys)
- [ ] DHG contact section with cdozier@dozierholdingsgroup.com
- [ ] DHG address: 19039 Cloyanna Ln, Humble TX 77346
- [ ] Lee Marshall added, Todd Neely removed from all personnel

## NIL Portal - Real Features
- [ ] Browse deals with filter (sport, value, status)
- [ ] Submit deal application
- [ ] NIL value calculator (real formula based on followers, sport, school)

## Transfer Portal - Real Features
- [ ] Browse available athletes
- [ ] Filter by sport, position, school
- [ ] Contact coach request form

## Platform Polish
- [ ] Add "Credits" balance display in platform header
- [ ] Add upgrade CTA banner for free users in platform
- [ ] Add onboarding flow for new users (sport, position, school)
- [ ] Ensure all 10 app pages have real interactive elements (not just static)

## BILLION DOLLAR PLATFORM - Full Build
- [x] Build feedRouter (createPost, getFeed, likePost, getComments, addComment)
- [x] Build profileRouter (getProfile, updateProfile, getAthleteStats)
- [x] Build messengerRouter (getConversations, getMessages, sendMessage, startConversation)
- [x] Build nilRouter (getDeals, createDeal, updateDeal, calculateNilValue)
- [x] Build transferRouter (getEntries, enterPortal, browseAthletes)
- [x] Build trainingRouter (logWorkout, getTrainingHistory, getStats)
- [x] Build notificationsRouter (getNotifications, markRead)
- [x] Wire Feed page with real posts from DB
- [x] Wire Profile page with real athlete data
- [x] Wire Messenger with real conversations and messages
- [x] Wire NIL Portal with real deals
- [x] Wire Transfer Portal with real entries
- [x] Wire Training with real logs
- [x] AI Sales: real LLM brand pitch generator
- [x] AI Recruiter: real LLM profile optimizer + coach email generator
- [x] AI Content: real LLM caption/bio/post generator
- [ ] DHG full corporate page (/dhg)
- [ ] Onboarding flow for new users (sport, position, school)
- [ ] Credits display in header
- [ ] Upgrade CTA for free users
- [ ] Platform-wide dark blue polish pass
- [ ] The Athlete Playbook section (recruiting presence + global connect)

## Media Audit (Logos, Videos, Images)
- [ ] Audit all pages for correct CDN URLs on all logos, icons, and videos
- [ ] Verify all 10 app icons display correctly on Home page grid
- [ ] Verify ATHLYNX header logo displays correctly in PlatformLayout
- [ ] Verify DHG crab logo used on DHG/Founders pages
- [ ] Verify all video CDN URLs load correctly (intro, highlight, NIL portal videos)
- [ ] Fix any broken or missing image/video URLs
- [ ] Ensure no images are stored locally in project directory

## DHG Iron Hierarchy (Iron Sharpens Iron)
- [ ] Build full /dhg corporate page with DHG as the iron core
- [ ] Show DHG as parent company with all subsidiaries as divisions beneath it
- [ ] Add "Iron Sharpens Iron" tagline and DHG founding story (Houston TX, Nov 2024, Hope Lodge)
- [ ] Show all subsidiaries in a hierarchy: ATHLYNX, NIL Portals, Transfer Portal AI, aibotecosys, Diamond Grind, Warriors Playbook
- [ ] Update ecosystem section on Home page to show DHG at top with subsidiaries beneath
- [ ] Add DHG banner/link at top of ATHLYNX platform header
- [ ] Ensure crab logo used for DHG throughout
- [ ] Fix DHG link in ecosystem section to point to /dhg internal page

## ATHLYNX Robotics Companion
- [x] Create /robotics page showing robot companion use cases for athletes
- [x] Add robotics leg to DHG portfolio on /dhg page (no partner name - "in development")
- [x] Add Robotics app card to Home page app grid
- [x] Add /robotics route to App.tsx
- [x] Show 10+ athlete use cases: field, stands, training, recovery, recruiting, locker room
- [x] Add AI Robot Companion chat (LYNX) to Robotics page with live LLM
- [x] Wire robotChat LLM mutation in aiRouter with 12 sport scenarios
- [x] Add /notifications route and Notifications page
- [x] Build notificationsRouter (getRecent, markAllRead, markRead, create)
- [x] Fix DHG ecosystem link in Home.tsx to route internally to /dhg

## Sign In Page
- [x] Build /signin page with full ATHLYNX brand styling and Manus OAuth button
- [x] Redirect already-logged-in users from /signin to /feed
- [x] Add /signin route to App.tsx
- [x] Link "Sign In" button in Home page header to /signin
- [ ] Link "Sign In" in PlatformLayout to /signin

## Sign In Page & Auth Flow
- [x] Build /signin page with full ATHLYNX brand styling and Manus OAuth button
- [x] Redirect already-logged-in users from /signin to /feed
- [x] Add /signin route to App.tsx
- [x] Link "Sign In" button in Home page header to /signin
- [x] Show trial countdown banner in PlatformLayout for trial users

## Email & SMS Services
- [x] Port nodemailer email service from V2 (welcome, verification, payment confirmation templates)
- [x] Port AWS SNS SMS service from V2 (sendSMS with verification code)
- [x] Port AWS SES verification email service from V2
- [x] Port verification service (sendVerificationCode, verifyCode) from V2
- [x] Add verificationCodes table to drizzle schema
- [x] Add trialEndsAt and trialUsed fields to users table
- [x] Push DB migration (pnpm db:push)
- [x] Wire welcome email on new user OAuth callback
- [x] Wire SMS verification code on new user signup
- [x] Add verification tRPC router (sendCode, verifyCode procedures)
- [x] Install nodemailer, @aws-sdk/client-ses, @aws-sdk/client-sns packages

## 7-Day Free Trial
- [x] Set trialEndsAt = now + 7 days on first OAuth login
- [x] Show trial expiry banner in platform header
- [ ] Gate premium features after trial ends with upgrade prompt
- [ ] Remove all VIP code logic from platform

## Twilio SMS & WhatsApp Integration
- [x] Install twilio Node.js SDK
- [x] Create server/services/twilio.ts with SMS and WhatsApp sending helpers
- [x] Add Twilio tRPC procedures: sendVerificationSMS, verifyCode, sendWhatsApp
- [x] Wire welcome SMS on new user OAuth callback
- [ ] Add phone verification UI to profile page
- [ ] Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER secrets

## SendGrid Email Integration
- [x] Install @sendgrid/mail Node.js SDK
- [x] Create server/services/email.ts with SendGrid welcome, verification, and notification templates
- [x] Wire welcome email on new user OAuth callback
- [x] Add SENDGRID_API_KEY and SENDGRID_FROM_EMAIL secrets
- [x] Add email verification tRPC procedure

## AWS SES + SNS Integration
- [x] Install @aws-sdk/client-ses and @aws-sdk/client-sns
- [x] Create server/services/aws-ses.ts for transactional email via SES
- [x] Create server/services/aws-sns.ts for SMS via SNS
- [x] Wire SES welcome email on new user OAuth callback
- [x] Wire SNS welcome SMS on new user OAuth callback
- [x] Add AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, SES_FROM_EMAIL secrets

## Video Section Fix
- [x] Fix Home page video grid: bright cards with ATHLYNX logo thumbnails, titles, play buttons — matching V2 design (not dark/hidden)

## Remaining Gaps (to resolve)
- [ ] Add phone verification UI to profile page (enter phone, receive SMS code, verify)
- [ ] Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER secrets
- [ ] Add SES_FROM_EMAIL secret (sender address for AWS SES)
- [ ] Add sendWhatsApp tRPC procedure to messagingRouter
- [ ] Verify email.ts (SendGrid) service exists and has welcome/verification templates

## Marketplace & Ecommerce
- [x] Build /marketplace page with full athletic equipment store
- [x] Add equipment categories: Custom Servers, GPU Cloud, Athletic Gear, NIL Gear, Training Equipment
- [x] Add ICC-USA products section with their full product lineup
- [x] Add RunSun Cloud and RunSun US as featured technology partners
- [x] Add Stripe checkout for equipment purchases (Buy Now buttons for priced items)
- [x] Add marketplace app card to Home page grid and PlatformLayout nav
- [x] Add /marketplace route to App.tsx

## Partner Network
- [ ] Build /partners page with all brand connectors and affiliate networks
- [ ] Feature ICC-USA partnership (products focus, no partner name prominence per strategy)
- [ ] Feature RunSun Cloud and RunSun US technology partnerships
- [ ] Add partner API access section
- [ ] Add partner dashboard section
- [ ] Add /partners route to App.tsx and nav

## Robotics Section Enhancement
- [ ] Add prominent Robotics banner/section to Home page
- [ ] Add Robotics app card to marketplace (LYNX robot companion hardware)
- [ ] Ensure /robotics page is linked from main nav

## Full V2 Page Port (All 78 Pages)
### Batch 1 - Core Missing Pages
- [ ] Port Partners.tsx - partner network with ICC-USA, RunSun, Manus, Nebius, NVIDIA, Twilio, Stripe
- [ ] Port RobotCompanions.tsx - all robot models + sports + enterprise use cases
- [ ] Port NILCalculator.tsx - NIL value calculator tool
- [ ] Port SocialHub.tsx - social media management hub
- [ ] Port CommsHub.tsx - communications hub
- [ ] Port LegalHub.tsx - legal resources hub
- [ ] Port HIPAACompliance.tsx - HIPAA compliance page
- [ ] Port PrivacyPolicy.tsx - privacy policy
- [ ] Port TermsOfService.tsx - terms of service
- [ ] Port EarlyAccess.tsx - early access signup
- [ ] Port PaymentSuccess.tsx - payment success page

### Batch 2 - Advanced Platform Pages
- [ ] Port CRMDashboard.tsx - CRM dashboard
- [ ] Port CRMCommandCenter.tsx - CRM command center
- [ ] Port AthleteWebsiteBuilder.tsx - athlete website builder
- [ ] Port InfrastructureManager.tsx - infrastructure manager
- [ ] Port BlueCollar.tsx - blue collar athletes NIL
- [ ] Port Veterans.tsx - veterans playbook
- [ ] Port FounderStory.tsx - founder story page
- [ ] Port SchoolPage.tsx - school/university page
- [ ] Port Portal.tsx - main portal page

### Batch 3 - Remaining Pages
- [ ] Port WizardHub.tsx - wizard hub
- [ ] Port AthlynxBrowser.tsx - ATHLYNX browser
- [ ] Port Contracts.tsx - contracts management
- [ ] Port CorporateDocuments.tsx - corporate documents
- [ ] Port TransferPortalFOS.tsx - transfer portal FOS
- [ ] Port ManusPartnership.tsx - Manus partnership page
- [ ] Port DHGHome.tsx as /dhg-empire route
- [ ] Port wizards/AgentWizard.tsx and wizards/index.tsx

### New Pages to Build
- [ ] Build /marketplace page - equipment store with all athletic gear + robot products + ICC-USA + RunSun
- [ ] Build /partners page (enhanced from V2 with RunSun Cloud, RunSun US, ICC-USA featured)
- [ ] Enhance /robotics with all sports + enterprise use cases + robot models
- [ ] Register all new routes in App.tsx
- [ ] Add all new nav links to PlatformLayout sidebar
- [ ] Add all new app cards to Home page grid

## Custom Notification System (New)
- [ ] Add notifications table to drizzle/schema.ts (id, userId, title, message, type, read, link, createdAt)
- [ ] Push DB migration with pnpm db:push
- [ ] Add notification query helpers in server/db.ts
- [ ] Add tRPC procedures: getNotifications, markAsRead, markAllRead, createNotification (admin)
- [ ] Build NotificationBell component with dropdown, unread count badge, and mark-as-read
- [ ] Wire NotificationBell into Home page nav and PlatformLayout nav
- [ ] Add admin notification sender panel on /athlete-dashboard
- [ ] Test full notification flow end-to-end

## Nav & Button Fixes (Priority)
- [x] Fix Home page hamburger menu - all links must navigate correctly
- [x] Fix PlatformLayout hamburger/mobile menu - all sidebar links must work
- [ ] Fix UnifiedNav hamburger - all app links must route correctly
- [x] Audit all CTA buttons on Home page (JOIN FREE, SIGN IN, ENTER PLATFORM, PRICING, FOUNDERS)
- [ ] Audit all buttons in PlatformLayout sidebar nav
- [ ] Fix any dead/placeholder nav links (toast "coming soon" or wire to real route)

## Marketplace & E-commerce (Priority Build)
- [ ] Build /marketplace page - full athletic equipment store with product grid
- [ ] Add product categories: Football, Basketball, Baseball, Soccer, Training, Recovery, Apparel, Tech, Robotics
- [ ] Add ICC-USA products section
- [ ] Add RunSun Cloud and RunSun US technology products section
- [ ] Add product detail modal/page with add-to-cart
- [ ] Build shopping cart (local state with quantity, total)
- [ ] Wire Stripe checkout for product purchases (createCheckoutSession tRPC)
- [ ] Add /marketplace route to App.tsx
- [ ] Add Marketplace to PlatformLayout sidebar nav
- [ ] Add Marketplace app card to Home page grid (already exists, wire the route)

## Marketplace & Infrastructure (Current Sprint)
- [x] Rebuild /marketplace with ICC-USA custom server configs, RunSun GPU cloud products, athletic gear, Request-a-Quote flow
- [ ] Build /infrastructure page showing unified AI ecosystem: RunSun + Nebius + ICC-USA + Manus + Claude + Yovole (in discussions)
- [ ] Wire Nebius Token Factory API into AI Recruiter, AI Content, AI Training Bot
- [ ] Add Marketplace and Infrastructure to PlatformLayout sidebar nav

## MASTER BUILD DIRECTIVE — April 15, 2026

### PHASE 1: Auth / Timeout / Critical Fixes
- [ ] Fix root cause of all permissions errors on protected pages (redirect to /signin instead of error)
- [ ] Fix /feed timeout — add loading skeleton + 5s timeout fallback
- [ ] Fix /profile timeout
- [ ] Fix /softmor timeout
- [x] Build /signup page — full registration form (first name, last name, email, password, sport, school, year), 7-day trial logic
- [x] Build /forgot-password page — email input + confirmation message
- [x] Update DB schema: add crm_contacts, crm_pipeline, activity_log, waitlist tables
- [ ] Seed Chad Dozier as admin (cdozier14@dozierholdingsgroup.com.mx, role='admin')
- [x] Build adminRouter with getUsers, getStats, setUserRole procedures (admin-only)
- [x] Build /admin/users page — sortable, searchable user tracker with trial/subscription status
- [x] Add User Tracker link to AdminDashboard quick actions
- [x] Auth0 cleanup: deleted duplicate apps, fixed callback URLs on surviving SPA app
- [ ] Seed team accounts: Glenn Tse, Andy Kustes, Lee Marshall, Jimmy Boyd (role='team')

### PHASE 2: Content / Data Fixes
- [x] Fix DHG page address → 12306 Lake Portal Drive, Houston, TX 77047
- [x] Fix DHG page email → cdozier14@dozierholdingsgroup.com.mx (plain mailto)
- [x] Fix DHG Chad title → Founder, CEO & Chairman
- [x] Fix DHG Glenn Tse title → CFO/COO
- [x] Fix DHG Andrew Kustes title → VP Technology
- [x] Fix Transfer Portal stats → pull from DB (real counts, not hardcoded)
- [x] Remove fake athletes from PlatformLayout sidebar (Marcus Johnson, Destiny Williams, Tyler Brooks)
- [x] Remove fake connections from PlatformLayout sidebar (Coach Rivera, Brand Manager, Agent Davis)
- [x] Fix Founders page Glenn Tse title → CFO/COO
- [x] Add Lee Marshall (VP Sales & Partnerships) to Founders page
- [x] Add Andy Kustes (VP Technology) to Founders page
- [x] Add Jimmy Boyd (VP Real Estate) to Founders page
- [ ] Fix ecosystem count: show all 20 apps on homepage

### PHASE 3: Build/Fix All Broken Pages (standard template: hero + status badge + feature cards + auth gate)
- [ ] Fix /messenger — Chat UI (permissions error)
- [ ] Fix /athlete-dashboard — Stats overview (permissions error)
- [ ] Fix /nil-vault — Contract storage, earnings tracker (permissions error)
- [ ] Fix /ai-recruiter — AI chat for recruiting (permissions error)
- [ ] Fix /faith — Daily devotional, scripture (permissions error)
- [ ] Fix /infrastructure — DHG data center info (permissions error)
- [ ] Fix /community-feedback — Feedback form + ideas board (permissions error)
- [ ] Fix /diamond-grind — Baseball training (permissions error)
- [ ] Fix /gridiron-nexus — Football platform (permissions error)
- [ ] Fix /court-kings — Basketball AAU & NIL (permissions error)
- [ ] Fix /marketplace — Product grid, athlete gear (permissions error)
- [ ] Fix /warriors-playbook — Plays, film & strategy (permissions error)
- [ ] Fix /ai-sales — AI brand deal outreach (permissions error)
- [ ] Fix /ai-content — Content creation (permissions error)
- [ ] Fix /pitch-pulse — Soccer ecosystem (permissions error)
- [ ] Fix /reel-masters — Fishing platform (permissions error)

### PHASE 4: CRM Dashboard (/admin/crm)
- [x] Build /admin/crm — admin-only route guard (role='admin' required)
- [x] CRM: Contact management table with search/filter/sort
- [x] CRM: Add New Contact modal
- [x] CRM: Contact detail view
- [x] CRM: Pipeline Kanban board (6 stages, move between stages)
- [x] CRM: VIP Waitlist view (export CSV)
- [x] CRM: Activity log (timeline view)
- [x] CRM: Dashboard overview (user counts, real-time stats)
- [x] CRM: Team members list (Chad, Glenn, Andy, Lee, Jimmy)

### PHASE 5: Legal Pages + Links + 404
- [x] Build /privacy-policy — full ATHLYNX privacy policy (HIPAA, data use, cookies, user rights, effective Jan 1 2026)
- [x] Build /terms-of-service — full ATHLYNX ToS (eligibility, trial, NIL disclaimer, governing law: Mississippi)
- [x] Fix "JOIN FREE — 7 DAYS" button → /signup
- [x] Fix "Forgot password?" link → /forgot-password
- [x] Fix "Terms of Service" link on /signin → /terms-of-service
- [x] Fix "Privacy Policy" link on /signin → /privacy-policy
- [x] Brand 404 page with ATHLYNX navy/cyan theme + logo + "Go Home" button

### PHASE 6: UI/UX Consistency
- [ ] Apply brand colors: #0A0F1E bg, #00D4FF accent, #1A6BFF secondary, #0F1729 cards
- [ ] Mobile bottom nav on ALL inner pages (Home/NIL/Chat/Transfer/Profile)
- [ ] Left sidebar app drawer shows all 20 apps on authenticated pages
- [ ] Skeleton loaders on all data-fetching pages
- [ ] 5-second timeout fallback toast on all API calls

## Netlify Migration (DEADLINE: Before May 8, 2026)
- [ ] Migrate all ATHLYNX services off Netlify to Manus hosting
- [ ] Verify all domains point to Manus infrastructure
- [ ] Confirm zero Netlify dependencies remain
- [ ] Full QA pass on Manus-hosted platform

## SEO & Brand Domination (Search Visibility)
- [x] Add comprehensive meta tags to index.html (title, description, keywords for NIL, transfer portal, athlete recruiting)
- [x] Add Open Graph tags (og:title, og:description, og:image, og:url) for social sharing
- [x] Add Twitter Card meta tags
- [x] Add JSON-LD structured data (Organization, WebApplication, SportsOrganization)
- [x] Add misspelling coverage meta tags (Athlynx, Athlnyx, Athlynks, Athletix, AthLynx, etc.)
- [x] Build sitemap.xml with all 120+ routes
- [x] Build robots.txt allowing full crawl
- [x] Add canonical URLs
- [x] Add keyword-rich page titles via SEOManager component on 90+ pages
- [x] Add SEO-friendly h1/h2 headings with target keywords on key pages
- [x] Add alt text with keywords on all images

## Softmor Logo Fix
- [x] Upload Softmor logo (blue S swirl) to CDN
- [x] Fix broken Softmor logo on /softmor page — replaced local path with CDN URL

## Softmor Logo Fix
- [x] Upload Softmor logo (blue S swirl) to CDN
- [x] Fix broken Softmor logo on /softmor page — replaced local path with CDN URL
- [x] Add Softmor logo to DHG page where Softmor is referenced
- [x] Add Softmor logo to DHGCorporate page subsidiaries section

## Podcast Feature
- [x] Build /podcast page with episode player, show description, and platform links
- [x] Add podcast to PlatformLayout sidebar nav
- [x] Add /podcast route to App.tsx
- [x] Add podcast SEO to SEOManager

## App Store Readiness
- [ ] Add PWA manifest.json with full app metadata, icons, and theme colors
- [ ] Build /app-store-submission page with Apple App Store and Google Play Store info
- [ ] Add Apple Smart App Banner meta tag to index.html
- [ ] Ensure service worker registration for PWA
- [ ] Add app store badges/links to Home page and Download page

## Scroll-to-Top Fix
- [x] Fix all navigation links to scroll to top of page on route change (Court Kings footer link and all other links)

## Navigation Audit & Fixes
- [ ] Audit Home page top nav hamburger menu (mobile)
- [ ] Audit PlatformLayout left sidebar hamburger/close button
- [ ] Audit PlatformLayout user profile dropdown menu
- [ ] Audit sport sub-pages nav (Court Kings, Diamond Grind, etc.) hamburger menus
- [ ] Audit all Settings buttons across platform
- [ ] Audit all dropdown menus (user menu, sport nav, admin nav)
- [ ] Fix any broken open/close states, missing click handlers, or non-functional items

## OG Image Fix (iMessage/Social Preview)
- [ ] Fix og:image so iMessage, Twitter, Facebook, and LinkedIn show the ATHLYNX preview image when sharing the link

## Full Navigation Audit & Fixes
- [ ] Audit Home page hamburger menu — verify all links work
- [ ] Audit PlatformLayout mobile hamburger — verify all app links work
- [ ] Audit PlatformLayout bottom mobile nav — verify all 5 icons link correctly
- [ ] Audit UnifiedNav floating button — verify all 40+ links work
- [ ] Audit sport sub-page navs (CourtKings, DiamondGrind, GridironNexus, PitchPulse, ReelMasters) — verify Log In / Sign Up buttons
- [ ] Fix any settings buttons that go nowhere — create /settings page or redirect to /profile
- [ ] Audit all footer links across all pages — verify no dead links
- [ ] Generate proper 1200x630 OG banner image for social sharing
- [ ] Update og:image in index.html with new banner URL

## Auth0 Integration
- [ ] Add Auth0 env secrets (VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET)
- [ ] Wire Auth0Provider into main.tsx
- [ ] Create useAuth hook wrapping Auth0
- [ ] Update SignIn page to use Auth0 loginWithRedirect
- [ ] Add /callback route to handle Auth0 redirect
- [ ] Update server context to verify Auth0 JWT tokens
- [ ] Sync Auth0 user to local DB on first login
- [ ] Enable Google social connection in Auth0 dashboard
- [ ] Enable Apple social connection in Auth0 dashboard
- [ ] Update logout to use Auth0 logout

## Auth0 Integration
- [x] Create Auth0 ATHLYNX SPA application in Okta/Auth0 dashboard
- [x] Configure callback URLs for athlynxapp.vip, athlynx.ai, localhost
- [x] Install @auth0/auth0-react SDK
- [x] Add Auth0 env secrets (VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET)
- [x] Wire Auth0Provider into main.tsx
- [x] Create useAuth hook wrapping Auth0 useAuth0
- [x] Rebuild SignIn page with seamless Auth0 one-click login
- [x] Add /callback route and AuthCallback page
- [x] Add syncAuth0User tRPC procedure to sync Auth0 users to DB
- [x] Enable Google social connection for ATHLYNX app
- [x] Enable Apple social connection for ATHLYNX app
- [ ] Set up production Google OAuth credentials (Google Cloud Console) before launch
- [ ] Get Apple Developer account for production Apple Sign In

## PWA & App Store
- [x] manifest.json with app name, icons, shortcuts, categories
- [x] Service worker (sw.js) for offline caching and push notifications
- [x] apple-touch-icon (180x180) for iOS home screen
- [x] icon-192.png and icon-512.png for Android/PWA
- [x] PWAInstallBanner component — Android install prompt + iOS instructions
- [x] Service worker registration in index.html
- [x] /.well-known/assetlinks.json for Google Play TWA
- [x] App Store + Google Play submission package PDF
- [ ] Enroll in Apple Developer Program ($99/yr) — Chad action required
- [ ] Enroll in Google Play Console ($25) — Chad action required
- [ ] Take App Store screenshots from athlynxapp.vip
- [ ] Submit TWA APK to Google Play once SHA-256 fingerprint received
- [ ] Submit to Apple App Store once developer account active

## Domain Setup (In Progress — Apr 16)
- [x] athlynx.ai — nameservers set to ns1/ns2.vercel-dns.com — Valid on Vercel ✅
- [x] www.athlynx.ai — Valid on Vercel ✅
- [ ] athlynx.pro — nameservers updated, DNS propagating (30-60 min)
- [ ] athlynx.net — nameservers updated, DNS propagating (30-60 min)
- [ ] athlynx.io — nameservers updated, DNS propagating (30-60 min)
- [ ] Add athlynx.ai as custom domain in Manus Settings → Domains
- [ ] Add athlynx.pro, .net, .io as custom domains in Manus Settings → Domains
- [ ] Remove old Netlify projects (deadline: May 8)

## Tomorrow's Build Roadmap — Apr 17
- [ ] Build all sport pages: Volleyball, Softball, Soccer, Swimming, Track, Gymnastics, Lacrosse, Tennis, Golf, Wrestling, Hockey, Baseball, Basketball, Football, Cross Country, Rowing, Water Polo, Field Hockey, Cheer, Dance, Marching Band
- [ ] Build NCA Cheer & Cheerleading dedicated hub
- [ ] Build Professional Ecosystem: Lawyers, Agents, Financial Advisors, Trainers, Doctors, Sports Psychologists portal
- [ ] Build Talent Discovery Engine + ATHLYNX 100 leaderboard
- [ ] Build Endorsement Signing Portal (find the next MJ / Bo Jackson)
- [ ] Build Draft & Combine Intelligence Hub (NFL, NBA, MLB, NHL, WNBA, college signing day)
- [ ] Build full Athlete Lifecycle Playbook (youth → pro → retirement)
- [ ] Build Team & Org Licensing Hub (teams link to ATHLYNX, outfit players, pay monthly)
- [ ] Build Merchandise & Retail Market (team apparel, NIL merch, licensed branding)
- [ ] Build B2B tiered subscriptions with AI credits (Team Starter, Pro, Elite)
- [ ] Build Investor Page with Pre-Seed through Series D roadmap
- [ ] Export project to GitHub for version control

## April 17 Fix Sprint

- [x] Fix permissions errors: auth loading state added to Profile, MessengerApp; global redirect in main.tsx
- [x] Fix /profile: auth loading skeleton prevents flash of sign-in prompt
- [x] Fix /messenger: auth loading skeleton prevents flash of sign-in prompt
- [x] Gate premium features after trial ends: trial expired banner in PlatformLayout
- [x] Add Credits balance display in platform header (⚡ credits badge)
- [x] Add upgrade CTA banner for free/trial users in PlatformLayout (trial days remaining)
- [x] Onboarding flow: OnboardingModal already wired in PlatformLayout
- [x] Fix right sidebar CTA: 'View Plans' for logged-in, 'Start Free Trial' for guests
- [x] Fix /dhg-corporate dead link → /dhg in PlatformLayout and InvestorDeck
- [x] Fix broken local image references in BrandingHeader, ProjectManagement, WizardHub
- [x] Fix FounderStory broken family photos → graceful placeholder cards
- [x] Fix Softmor broken video section → graceful placeholder cards
- [x] Fix FuelBots broken video background → gradient fallback
- [x] Fix Portal.tsx broken logo and /api/auth/login link
- [x] Audit all routes in App.tsx — all 80+ routes valid
- [ ] Fix mobile bottom nav on ALL inner pages (PlatformLayout has it; other pages need audit)
- [ ] Fix all hamburger menus (Home, PlatformLayout, sport sub-pages)
- [ ] Fix OG image for social sharing previews
- [ ] Seed Chad Dozier as admin in DB
- [ ] Seed team accounts (Glenn, Andy, Lee, Jimmy)
- [ ] Build all sport pages (volleyball, softball, swimming, track, gymnastics, lacrosse, tennis, wrestling, hockey, cross country, rowing, water polo, field hockey, cheer, dance)
- [ ] Build Talent Discovery Engine + ATHLYNX 100 leaderboard
- [ ] Build Endorsement Signing Portal
- [ ] Build Draft & Combine Intelligence Hub
- [ ] Build Team & Org Licensing Hub
- [ ] Build Investor Page with Pre-Seed through Series D roadmap
- [ ] Export project to GitHub for version control

## Auth0 & Signup Fixes (Apr 17)
- [ ] Add all deployed domains to Auth0 allowed callback/logout/web origins URLs
- [ ] Push verification_codes table migration to DB
- [ ] Test signup end-to-end on athlynxapp-cwaxehsq.manus.space

## Signup Flow Build (Apr 17 — Priority #1)
- [ ] Fix Auth0 callback URLs: add athlynxapp-cwaxehsq.manus.space, athlynxapp.vip, athlynx.ai, athlynx.io, athlynx.net to allowed callback/logout/web origins
- [ ] Stripe trial checkout: after Auth0 login, redirect new users to Stripe checkout (card required, 7-day trial)
- [ ] Welcome email to new user: verification code + login credentials via SES
- [ ] Welcome SMS to new user: verification code via Twilio/SES
- [ ] Admin notification email to cdozier14@dozierholdingsgroup.com.mx on every new signup
- [ ] Push verification_codes table migration to DB
- [ ] User signup tracking: log source, plan, signup timestamp in DB
- [ ] Admin signup tracker page /admin/users (Chad only, role=admin)
- [ ] Save checkpoint after all signup flow work
- [ ] Export to GitHub
- [ ] Publish

## Admin Broadcast & Signup Notifications (Current Sprint)
- [ ] Reset Chad's trial to NULL so 7-day countdown starts on next login
- [ ] On every new signup: send owner alert email to all 5 of Chad's emails
- [ ] On every new signup: create in-app notification for admin users
- [ ] Build /admin/broadcast page — compose message, pick recipients (all/trial/subscribed/sport), send via email + in-app
- [ ] Wire broadcastRouter: sendBroadcast mutation, getBroadcastHistory query
- [ ] Add broadcast_messages table to schema (id, adminId, subject, body, recipientFilter, sentCount, createdAt)
- [ ] Add Broadcast link to AdminDashboard quick actions
- [ ] Save checkpoint after broadcast page is live

## SUPER-PLATFORM EXPANSION — April 17, 2026
### Goal: Beat Hudl, On3, 24/7 Sports, Barstool, Perfect Game, Facebook Messenger in one unified app

### Social Feed (beats Instagram/TikTok for athletes)
- [ ] Real-time post creation with text, photo, video, highlight reel
- [ ] Stories bar (24hr expiring athlete highlights)
- [ ] Reactions (fire, trophy, clap, heart) + comments + share
- [ ] Trending athletes discovery feed
- [ ] Athlete verification badges by sport

### Recruiting Hub (beats Hudl + On3)
- [ ] Recruiting profile: measurables, GPA, highlights, contact info
- [ ] Film/highlight reel upload and embed (S3 storage)
- [ ] Coach search and direct contact portal
- [ ] Scholarship offer tracker (received, pending, accepted, declined)
- [ ] Transfer portal with eligibility status

### NIL Marketplace (beats On3 NIL)
- [ ] Brand deal listings with athlete applications
- [ ] NIL earnings dashboard (lifetime, monthly, by deal)
- [ ] NIL valuation score (followers + stats formula)
- [ ] Contract builder with e-signature flow

### Live Messaging (beats Facebook Messenger)
- [ ] 1:1 DMs between athletes, coaches, agents
- [ ] Group chats (team rooms, recruiting threads)
- [ ] Message read receipts, typing indicators
- [ ] Media/file sharing in chat
- [ ] Real-time polling (5s refetch interval)

### News + Rankings (beats 24/7 Sports + Barstool)
- [ ] Sport-specific news feed (football, basketball, baseball, etc.)
- [ ] National and state athlete rankings by sport/position/class
- [ ] Trending stories and viral athlete moments
- [ ] Podcast/audio content player

### Training + Performance Hub (beats Perfect Game)
- [ ] Workout log with exercise library
- [ ] Performance stats tracker (40 time, vertical, bench, etc.)
- [ ] AI coaching bot with personalized training plans
- [ ] Event/showcase calendar and registration

### Unified App Shell
- [ ] Bottom nav bar (Feed, Recruit, NIL, Messages, Profile)
- [ ] Global notification bell with unread count badge
- [ ] Sport switcher (football, basketball, baseball, etc.)
- [ ] PWA install prompt for mobile

## Completed Apr 17, 2026
- [x] ATHLYNX crab-logo multi-sport video added to Home.tsx hero + video grid (first position)
- [x] DHG AI Compute video (lv_0_20251002125147) added to DHG.tsx video section
- [x] DHG Urban Innovation video (910C761B) added to DHG.tsx video section
- [x] Eagle/AI infrastructure video (grok_video_2026-03-18) added to InfrastructureManager.tsx
- [x] Post-trial hard paywall gate added to PlatformLayout — blocks all content when trial expired, shows upgrade wall with plan cards
- [x] Trial expired banner added to PlatformLayout (red warning bar)
- [x] AWS SES AmazonSESFullAccess policy attached to cdozier14 IAM user — SES fully accessible
- [x] athlynx.ai domain registered with SES (verification token: UBq1IVfG7cbq3RsV6vIO6FS3sRp4nPUt1OMrG6n+GaA=)
- [x] cdozier14@athlynx.ai email identity registered with SES
- [x] Chad confirmed admin role on all 3 accounts (id:1, id:30001, id:120002)
- [ ] Add SES TXT DNS record to athlynx.ai — record: _amazonses.athlynx.ai TXT "UBq1IVfG7cbq3RsV6vIO6FS3sRp4nPUt1OMrG6n+GaA="
- [ ] Request SES production access (currently sandbox: 200 emails/day limit)

## GitHub Consolidation & Account Cleanup (Apr 17 2026)
- [x] Push latest platform code to ATHLYNX-Manus-Deploy (single source of truth)
- [x] Delete stale repos: athlynx-live, athlynx-site-main, and 8 old January repos (9/10 deleted — cdozier14-create-athlynx-corp-launch-2026--14 needs manual delete)
- [x] Keep ATHLYNX-Manus-Deploy (primary) and athlynx.ai (archive backup)
- [x] Fix OAuth callback URLs — dynamically built from window.location.origin, already correct
- [ ] Deploy to Vercel from ATHLYNX-Manus-Deploy for redundancy
- [ ] Deploy to Cloudflare Pages for additional redundancy
- [ ] Close Railway account
- [ ] Remove Zapier integrations
- [ ] Close Netlify account (after confirming code is off Netlify)

## Homepage Sign-Up CTA & Auth0 Fix
- [ ] Add prominent email sign-up CTA at very top of homepage (above the fold, first thing visitors see)
- [ ] Email + name fields with "GET INSTANT ACCESS" button — immediate platform access on submit
- [ ] Enable client_credentials grant in Auth0 app settings (user action needed)
- [ ] Fix Auth0 callback URLs for all 6 domains via Management API
- [ ] Close Netlify account (off by May 8 deadline)
- [ ] Close Railway account
- [ ] Close Zapier account

## April 17, 2026 — Major Feature Additions

- [x] AI Trainer onboarding flow — 18 roles (athlete, parent, coach, agent, brand, sponsor, financial advisor, trainer, scout, doctor, physical therapist, nutritionist, mental coach, media, pastor, sibling, fan, friend)
- [x] Onboarding data saved to DB (role, all answers, social links, recruiting status)
- [x] getOnboardingStatus tRPC procedure — checks if user has completed onboarding
- [x] saveOnboarding tRPC procedure — saves role + all data + updates athlete profile
- [x] PlatformLayout updated to use AIOnboarding instead of old OnboardingModal
- [x] Master Admin page (/master-admin) — broadcast messages, user directory, stats
- [x] Athlete Journey page (/athlete-journey) — full lifecycle HS → College → Pro → Retirement
- [x] Athlete Legal & Deals Hub (/athlete-legal-hub) — contracts, agent finder, financial advisors, endorsement deals
- [x] Robotics page — Coming Soon with LYNX AI chat
- [x] DB migration — onboardingRole, onboardingData, onboardingCompleted columns on users table
- [x] Nav updated — Athlete Journey and Legal & Deals added to APPS grid
- [x] Routes registered in App.tsx for all new pages
- [x] Vercel stale projects deleted — no more misconfiguration emails
- [x] GitHub backup pushed to chaddozier-bot/ATHLYNX-Manus-Deploy
- [ ] Podcast — connect real episode audio/Spotify/Apple URLs
- [ ] E-commerce — add real product catalog with Stripe checkout
- [ ] Master Admin — add role promotion UI (promote user to admin)
- [ ] Cloudflare Pages deployment

## PWA (Progressive Web App) — Option 4
- [x] Service worker (sw.js) upgraded to v1.2.0 with offline support, CDN caching, offline fallback page, push notifications, background sync
- [x] Service worker registered in main.tsx with update detection and auto-reload on new version
- [x] Removed duplicate inline SW registration from index.html
- [x] PWAInstallBanner component already built (Android + iOS banners)
- [x] PWAInstallBanner wired into App.tsx
- [x] animate-slide-up CSS animation added to index.css
- [x] PWA standalone mode CSS enhancements added
- [x] iOS meta tags: apple-mobile-web-app-capable, apple-touch-icon, apple-mobile-web-app-status-bar-style, apple-mobile-web-app-title
- [x] manifest.json: comprehensive with icons (192x192, 512x512), shortcuts (NIL, Messenger, Transfer, Feed), screenshots, categories
- [x] sw.js and manifest.json both return HTTP 200 with correct content-type

## Personalized Verification Emails & Beta Countdown (April 18, 2026)
- [ ] Update sendVerificationCode() to accept name parameter
- [ ] Upgrade verification email template: personalized with name + signup date/time stamp
- [ ] Update verificationRouter to pass name through to email service
- [ ] Update EarlyAccess.tsx to pass fullName when calling sendCode
- [ ] Fix raw DB error display — show user-friendly error messages only
- [ ] Add Beta countdown timer to Home page (target: July 1, 2026)
- [ ] Add "BETA" badge to platform header with days remaining
- [ ] Build /feedback page — athlete suggestions, upvoting, admin respond/delete
- [ ] Add feedback table to drizzle/schema.ts (id, userId, name, email, title, body, category, votes, status, adminReply, createdAt)
- [ ] Push feedback table migration
- [ ] Add feedbackRouter (submitFeedback, getFeedback, voteFeedback, replyFeedback, deleteFeedback)
- [ ] Add /feedback route to App.tsx
- [ ] Add Feedback link to PlatformLayout sidebar nav
- [ ] Add "Personal Coach" as a role option in EarlyAccess.tsx ROLES list
- [ ] Save checkpoint and push to GitHub after all above complete

## INSTANT MONETIZATION — April 18, 2026 (Priority #1)
- [ ] Post-signup flow: after email verification → redirect to /pricing
- [ ] /pricing page: Free / Pro $9.99/mo / Elite $29.99/mo — clear value props
- [ ] Stripe checkout wired directly from pricing page (no app store needed)
- [ ] Webhook confirms payment → unlock full platform access
- [ ] Payment success page with welcome message
- [ ] No apps needed — PWA on web IS the app

## COMMUNITY FEEDBACK (Live DB)
- [ ] Replace static mock data in CommunityFeedback.tsx with real trpc.feedback.list
- [ ] Submit form calls trpc.feedback.submit mutation
- [ ] Vote button calls trpc.feedback.vote mutation
- [ ] Admin reply/status update (admin only)

## PERSONAL COACH ROLE
- [x] Add "Personal Coach" as role option in EarlyAccess signup

## LINKEDIN LAUNCH POST
- [ ] Write world-class LinkedIn post introducing ATHLYNX to the world

## EASY INSTALL (Priority UX)
- [ ] Add big prominent "📲 Install App" button on homepage hero section
- [ ] Build InstallModal component with step-by-step iOS and Android instructions
- [ ] iOS: animated arrow pointing to Share button with screenshot-style illustration
- [ ] Android: show "Install App" banner preview with one-tap instruction
- [ ] Add install button to PlatformLayout header for logged-in users
- [ ] Make install instructions impossible to miss — no technical knowledge needed

## HAMBURGER MENUS & DROPDOWNS (UX Priority)
- [ ] All hamburger menus: large tap target (min 48px), animated slide-in panel, clear X close button
- [ ] All dropdowns: large text, clear icons, smooth animation, tap anywhere outside to close
- [ ] Mobile nav bottom bar: large icons with labels, active state highlight
- [ ] Profile dropdown: avatar + name visible, clear Sign Out button at bottom
- [ ] Notifications dropdown: unread badge, clear "Mark all read" button
- [ ] All nav links: minimum 44px height, bold text, easy to read on dark background
- [ ] No hidden or tiny buttons anywhere — if it's clickable it must look clickable

## New Icons (Current Sprint)
- [ ] Generate CRM icon (navy person + network web + blue swoosh)
- [ ] Generate Analytics icon (navy bar chart + line graph + blue swoosh)
- [ ] Generate White-Label Licensing icon (navy shield + W + blue swoosh)
- [ ] Generate Admin icon (navy gear + crown + blue swoosh)
- [ ] Generate Settings icon (navy dual gears + blue swoosh)
- [ ] Generate Athlete Store icon (navy shopping cart + jersey + blue swoosh)
- [ ] Upload all new icons to CDN
- [ ] Wire all new icon CDN URLs into PlatformLayout apps array
- [ ] Wire icons onto each individual app page header

## White-Label Licensing System
- [ ] Add license_agreements table to drizzle/schema.ts (id, orgName, orgType, tier, monthlyFee, athleteCount, status, startDate, renewalDate, adminUserId, brandColor, logoUrl, customDomain)
- [ ] Add licensingRouter (getLicenses, createLicense, updateLicense, getLicenseStats)
- [ ] Build /white-label page with 4 tiers: Team ($299/mo), School ($599/mo), Conference ($1,499/mo), Enterprise (custom)
- [ ] Show Chad as the hub connecting licensed orgs to athletes
- [ ] Add license management to /admin/crm
- [ ] Wire Stripe checkout for licensing tiers

## AI Credit System
- [ ] Add ai_credits table to drizzle/schema.ts (userId, balance, totalPurchased, totalUsed)
- [ ] Add credit_transactions table (userId, amount, type, description, createdAt)
- [ ] Add creditsRouter (getBalance, purchaseCredits, deductCredits, getHistory)
- [ ] Build credit purchase UI (bundles: 100/$9.99, 500/$39.99, 1000/$69.99)
- [ ] Wire credit deduction on every AI action (AI Sales, AI Recruiter, AI Content, AI Trainer)
- [ ] Show credit balance in PlatformLayout header

## Monthly Tiered Service
- [ ] Update Pricing.tsx with 4 athlete tiers: Free, Pro ($9.99/mo), Elite ($29.99/mo), NIL Pro ($49.99/mo)
- [ ] Add B2B licensing tiers to Pricing.tsx: Team, School, Conference, Enterprise
- [ ] Wire Stripe subscriptions for all tiers
- [ ] Show subscription badge on user profile

## Athlete Amazon Store
- [ ] Build /athlete-store page — Amazon-style product grid for athletes
- [ ] Product categories: Football, Basketball, Baseball, Soccer, Training, Recovery, Apparel, Tech, Nutrition
- [ ] Add featured products with images, prices, ratings, sport tags
- [ ] Add product detail modal (description, specs, reviews, buy button)
- [ ] Shopping cart (local state: add/remove/quantity/total)
- [ ] Stripe checkout for product purchases
- [ ] Amazon affiliate link integration (external buy links)
- [ ] NIL Merch section (athlete-branded products)
- [ ] Add Athlete Store to PlatformLayout sidebar nav
- [ ] Add Athlete Store app card to Home page grid
- [ ] Add /athlete-store route to App.tsx
- [ ] Generate Athlete Store app icon (navy shopping cart + jersey + blue swoosh)

## Subscription Expiration Warning System
- [ ] Add subscription_expiry_notices table (id, userId, subscriptionId, daysRemaining, emailSentAt timestamp, emailType, status)
- [ ] Add expiration_warnings router (getWarnings, markSent, getOverdue)
- [ ] Build server-side expiration check job (runs daily via cron-like tRPC procedure)
- [ ] Email cadence: Day 7 first warning, Day 5 second, then daily Day 4/3/2/1, Day 0 suspended
- [ ] Each email send logs exact timestamp to subscription_expiry_notices table
- [ ] Build ExpirationWarningPopup component — mandatory modal on login when days <= 5 or expired
- [ ] Popup shows: days remaining, exact expiration date/time, amount owed, Renew Now button → Stripe
- [ ] Popup cannot be dismissed when expired (only Renew or Logout options)
- [ ] Popup can be dismissed (snooze 24h) when 1-5 days remaining
- [ ] Wire popup into PlatformLayout so it fires on every authenticated page load
- [ ] Admin view in /admin showing all users with expiring subscriptions + email log timestamps

## Investor Page (Priority - Top Nav)
- [ ] Create /investors route in App.tsx
- [ ] Add "INVESTORS" link to top nav (prominent, gold/yellow accent)
- [ ] Build Investors.tsx page with: hero section, market opportunity, 5-year P&L proforma table, funding rounds roadmap (Pre-Seed → Seed → Series A → B → C), team section, contact CTA with cdozier@dozierholdingsgroup.com
- [ ] 5-year P&L: Revenue (licensing + subscriptions + credits + store + NIL commissions), COGS, Gross Profit, OpEx, EBITDA, Net Income — all 5 years
- [ ] Funding roadmap: Pre-Seed ($500K, current), Seed ($2M), Series A ($10M), Series B ($50M), Series C ($150M) with use of funds and milestones
- [ ] Market data: NIL $2.5B, Athlete Recruitment $4.6B, AI in Sports $27.6B, Total Sports Tech $130B
- [ ] Competitive moat section: why ATHLYNX wins vs Opendorse/Hudl/INFLCR
- [ ] Team section: Chad A. Dozier (Founder/CEO), Glenn Tse (Co-Founder/CFO), Jimmy Boyd, Andy Kustes, Lee Marshall
- [ ] Contact section: cdozier@dozierholdingsgroup.com, 19039 Cloyanna Ln, Humble TX 77346

## Pro Teams Access
- [ ] Add PRO TEAMS tier to pricing page (NFL/NBA/MLB/NHL/MLS/WNBA/Pro Soccer/Pro Baseball)
- [ ] Add Pro Teams section to PlatformLayout APPS array with dedicated icon
- [ ] Create ProTeams.tsx page with roster management, contract tracking, scouting, training, brand deals
- [ ] Add Pro Teams to mobile nav menu under Sports section
- [ ] Update hero messaging: "Youth → High School → College → Pro → Retired — Every Level, Every Sport"

## Investor Page Rebuild (World-Class)
- [ ] Rebuild InvestorHub.tsx with: bold hero, 5-year P&L proforma table, Pre-Seed→Series C roadmap, market data ($130B), competitive moat, team (Chad & Glenn prominent), contact section
- [ ] 5-year P&L: Year 1-5 revenue streams (licensing, subscriptions, credits, store, NIL commissions), COGS, Gross Profit, OpEx, EBITDA, Net Income
- [ ] Funding rounds: Pre-Seed $500K (current/open), Seed $2M, Series A $10M, Series B $50M, Series C $150M
- [ ] Contact: cdozier@dozierholdingsgroup.com, 19039 Cloyanna Ln, Humble TX 77346
- [ ] "THE ONLY PLATFORM" positioning — no competitor has ever done all of this

## AI Bot + Robot Data Collection Architecture
- [ ] Add athlete_data_events table to drizzle schema (source, data_type, payload, athlete_id, timestamp, session_id, device_type)
- [ ] Add data_sources table (robot, ai_bot, wearable, manual, video_analysis)
- [ ] Build /api/data-ingest endpoint for real-time robot/bot data streaming
- [ ] Build AthleteDataDashboard.tsx page showing real-time data streams per athlete
- [ ] Add "Data Collection" section to investor page as core moat/IP pillar
- [ ] Add data collection status indicator to athlete profile pages

## Investor Page (World-Class Rebuild)
- [ ] Rewrite InvestorHub.tsx with: bold IPO end-game hero, real market data ($34B→$135B), 5-year P&L with numbers that add up, Pre-Seed→Series C→IPO roadmap, AI data moat section, equity structure (Chad 51%/Glenn 24%/Andy 15%/Jimmy 10%), team (Chad & Glenn prominent), contact (cdozier@dozierholdingsgroup.com, +1 601-498-5282)
- [ ] Add "Fastest Growing Company" benchmark comparison (Manus: $0→$100M in 8 months)
- [ ] Add competitive moat table showing ATHLYNX vs all competitors
- [ ] Add IPO timeline: Series C 2028 → IPO 2029-2030

## Real Athlete Photos + Video (Phase 7)
- [ ] Upload all 22 athlete photos (IMG_0973–IMG_1519) to CDN via manus-upload-file --webdev
- [ ] Upload grok_video_2026-03-18-14-11-53.mp4 to CDN
- [ ] Add photo proof gallery section to InvestorHub page ("Real Athletes. Real Results.")
- [ ] Add hero background/slideshow photos to Home page
- [ ] Add athlete action photos to sport-specific pages (Gridiron, Diamond Grind, Court Kings, etc.)

## GTC San Jose Context (Investor Hub)
- [ ] Add "Founder at NVIDIA GTC 2026, San Jose March 13-16" section to InvestorHub with Chad's GTC photos
- [ ] Caption: "Building at the intersection of AI and sports — present at the world's largest AI conference"
- [ ] Feature GTC photos prominently in the founder credibility / proof section
