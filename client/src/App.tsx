import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import SEOManager from "@/components/SEOManager";
import ScrollToTop from "@/components/ScrollToTop";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// ── Core ──
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import AuthCallback from "./pages/AuthCallback";
import ForgotPassword from "./pages/ForgotPassword";
import EarlyAccess from "./pages/EarlyAccess";
import EarlyAccessUpdated from "./pages/EarlyAccessUpdated";
import Success from "./pages/Success";
import ComingSoon from "./pages/ComingSoon";

// ── Platform Apps ──
import MessengerApp from "./pages/MessengerApp";
import Messages from "./pages/Messages";
import NILPortal from "./pages/NILPortal";
import NILVault from "./pages/NILVault";
import NILMarketplace from "./pages/NILMarketplace";
import NILCalculator from "./pages/NILCalculator";
import TransferPortal from "./pages/TransferPortal";
import TransferPortalFOS from "./pages/TransferPortalFOS";
import TransferPortalIntelligence from "./pages/TransferPortalIntelligence";
import DiamondGrind from "./pages/DiamondGrind";
import WarriorsPlaybook from "./pages/WarriorsPlaybook";
import AISales from "./pages/AISales";
import AIRecruiter from "./pages/AIRecruiter";
import AIContent from "./pages/AIContent";
import AITrainingBot from "./pages/AITrainingBot";
import Faith from "./pages/Faith";
import AthleteDashboard from "./pages/AthleteDashboard";
import AthletePlaybook from "./pages/AthletePlaybook";
import AthleteWebsiteBuilder from "./pages/AthleteWebsiteBuilder";
import AthlynxBrowser from "./pages/AthlynxBrowser";
import SocialHub from "./pages/SocialHub";
import CommsHub from "./pages/CommsHub";
import LegalHub from "./pages/LegalHub";
import HIPAACompliance from "./pages/HIPAACompliance";
import WizardHub from "./pages/WizardHub";
import CRMDashboard from "./pages/CRMDashboard";
import CRMCommandCenter from "./pages/CRMCommandCenter";
import Contracts from "./pages/Contracts";
import CorporateDocuments from "./pages/CorporateDocuments";
import FuelBots from "./pages/FuelBots";
import TeamBots from "./pages/TeamBots";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCRM from "./pages/AdminCRM";
import AdminUsers from "./pages/AdminUsers";
import AdminBroadcast from "./pages/AdminBroadcast";

// ── Sport Platforms ──
import GridironNexus from "./pages/GridironNexus";
import PitchPulse from "./pages/PitchPulse";
import CourtKings from "./pages/CourtKings";
import ReelMasters from "./pages/ReelMasters";
import HuntPro from "./pages/HuntPro";
import FairwayElite from "./pages/FairwayElite";
import SigningDay from "./pages/SigningDay";
import Training from "./pages/Training";

// ── Commerce & Infrastructure ──
import Marketplace from "./pages/Marketplace";
import Store from "./pages/Store";
import Pricing from "./pages/Pricing";
import PricingTiers from "./pages/PricingTiers";
import Billing from "./pages/Billing";
import PaymentSuccess from "./pages/PaymentSuccess";
import Infrastructure from "./pages/Infrastructure";
import InfrastructureManager from "./pages/InfrastructureManager";
import BitcoinMining from "./pages/BitcoinMining";
import Robotics from "./pages/Robotics";
import TrainerBot from "./pages/TrainerBot";
import AthleteJourney from "./pages/AthleteJourney";
import About from "./pages/About";
import AthleteLeagalHub from "./pages/AthleteLeagalHub";
import MasterAdmin from "./pages/MasterAdmin";
import RobotCompanions from "./pages/RobotCompanions";
import AppStoreSubmission from "./pages/AppStoreSubmission";
import Apps from "./pages/Apps";
import MobileApp from "./pages/MobileApp";

// ── DHG Corporate ──
import DHG from "./pages/DHG";
import DHGHome from "./pages/DHGHome";
import DHGCorporate from "./pages/DHGCorporate";
import DHGEmpire from "./pages/DHGEmpire";
import EmpireVision from "./pages/EmpireVision";
import Softmor from "./pages/Softmor";
import Podcast from "./pages/Podcast";
import InvestorHub from "./pages/InvestorHub";
import InvestorDeck from "./pages/InvestorDeck";
import ManusPartnership from "./pages/ManusPartnership";
import Partners from "./pages/Partners";
import PartnerPortal from "./pages/PartnerPortal";
import WhiteLabel from "./pages/WhiteLabel";
import Implementation from "./pages/Implementation";
import Capabilities from "./pages/Capabilities";
import CommunityFeedback from "./pages/CommunityFeedback";

// ── People & Culture ──
import Founders from "./pages/Founders";
import FounderStory from "./pages/FounderStory";
import FounderDedication from "./pages/FounderDedication";
import Team from "./pages/Team";
import LeadershipPrinciples from "./pages/LeadershipPrinciples";
import Journey from "./pages/Journey";
import Careers from "./pages/Careers";
import BlueCollar from "./pages/BlueCollar";
import Veterans from "./pages/Veterans";
import MilitaryDivision from "./pages/MilitaryDivision";
import Medical from "./pages/Medical";
import WellnessPortal from "./pages/WellnessPortal";
import Mindset from "./pages/Mindset";
import SerenityMemorial from "./pages/SerenityMemorial";
import SchoolPage from "./pages/SchoolPage";

// ── Media & Content ──
import Music from "./pages/Music";
import Studio from "./pages/Studio";
import MediaShowcase from "./pages/MediaShowcase";
import Portal from "./pages/Portal";

// ── Legal & Compliance ──
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import LegalCompliance from "./pages/LegalCompliance";

// ── PWA ──
import PWAInstallBanner from "./components/PWAInstallBanner";

// ── Utility ──
import Notifications from "./pages/Notifications";
import Contact from "./pages/Contact";
import QuickLinksHub from "./pages/QuickLinksHub";
import ProjectManagement from "./pages/ProjectManagement";
import ProjectChecklist from "./pages/ProjectChecklist";
import ProjectPlaybook from "./pages/ProjectPlaybook";

// ── Wizards ──
import AgentWizard from "./pages/wizards/AgentWizard";
import CareerWizard from "./pages/wizards/CareerWizard";
import FinancialWizard from "./pages/wizards/FinancialWizard";
import LawyerWizard from "./pages/wizards/LawyerWizard";
import LifeWizard from "./pages/wizards/LifeWizard";
import ScholarshipWizard from "./pages/wizards/ScholarshipWizard";
import ScoutWizard from "./pages/wizards/ScoutWizard";
import TransferWizard from "./pages/wizards/TransferWizard";

function Router() {
  return (
    <Switch>
      {/* ── Core ── */}
      <Route path="/" component={Home} />
      <Route path="/demo" component={Demo} />
      <Route path="/how-it-works" component={Demo} />
      <Route path="/signup" component={EarlyAccess} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/early-access-v2" component={EarlyAccessUpdated} />
      <Route path="/signin" component={SignIn} />
      <Route path="/login" component={SignIn} />
      <Route path="/callback" component={AuthCallback} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/success" component={Success} />
      <Route path="/feed" component={Feed} />
      <Route path="/profile/:id?" component={Profile} />

      {/* ── Platform Apps ── */}
      <Route path="/messenger" component={MessengerApp} />
      <Route path="/messages" component={Messages} />
      <Route path="/nil-portal" component={NILPortal} />
      <Route path="/nil-vault" component={NILVault} />
      <Route path="/nil-marketplace" component={NILMarketplace} />
      <Route path="/nil-calculator" component={NILCalculator} />
      <Route path="/transfer-portal" component={TransferPortal} />
      <Route path="/transfer-portal-fos" component={TransferPortalFOS} />
      <Route path="/transfer-intelligence" component={TransferPortalIntelligence} />
      <Route path="/diamond-grind" component={DiamondGrind} />
      <Route path="/baseball" component={DiamondGrind} />
      <Route path="/warriors-playbook" component={WarriorsPlaybook} />
      <Route path="/playbook" component={WarriorsPlaybook} />
      <Route path="/ai-sales" component={AISales} />
      <Route path="/ai-recruiter" component={AIRecruiter} />
      <Route path="/ai-content" component={AIContent} />
      <Route path="/ai-training-bot" component={AITrainingBot} />
      <Route path="/faith" component={Faith} />
      <Route path="/athlete-dashboard" component={AthleteDashboard} />
      <Route path="/athlete-playbook" component={AthletePlaybook} />
      <Route path="/athlete-website-builder" component={AthleteWebsiteBuilder} />
      <Route path="/athlynx-browser" component={AthlynxBrowser} />
      <Route path="/social-hub" component={SocialHub} />
      <Route path="/comms-hub" component={CommsHub} />
      <Route path="/legal-hub" component={LegalHub} />
      <Route path="/athlete-legal-hub" component={AthleteLeagalHub} />
      <Route path="/athlete-journey" component={AthleteJourney} />
      <Route path="/about" component={About} />
      <Route path="/master-admin" component={MasterAdmin} />
      <Route path="/hipaa" component={HIPAACompliance} />
      <Route path="/wizard-hub" component={WizardHub} />
      <Route path="/crm" component={CRMDashboard} />
      <Route path="/crm-command" component={CRMCommandCenter} />
      <Route path="/contracts" component={Contracts} />
      <Route path="/corporate-documents" component={CorporateDocuments} />
      <Route path="/fuel-bots" component={FuelBots} />
      <Route path="/team-bots" component={TeamBots} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/crm" component={AdminCRM} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/broadcast" component={AdminBroadcast} />
      <Route path="/master-admin" component={MasterAdmin} />

      {/* ── Sport Platforms ── */}
      <Route path="/gridiron-nexus" component={GridironNexus} />
      <Route path="/football" component={GridironNexus} />
      <Route path="/pitch-pulse" component={PitchPulse} />
      <Route path="/soccer" component={PitchPulse} />
      <Route path="/court-kings" component={CourtKings} />
      <Route path="/basketball" component={CourtKings} />
      <Route path="/reel-masters" component={ReelMasters} />
      <Route path="/fishing" component={ReelMasters} />
      <Route path="/hunt-pro" component={HuntPro} />
      <Route path="/hunting" component={HuntPro} />
      <Route path="/fairway-elite" component={FairwayElite} />
      <Route path="/golf" component={FairwayElite} />
      <Route path="/signing-day" component={SigningDay} />
      <Route path="/training" component={Training} />
      <Route path="/gym" component={Training} />
      <Route path="/ice-breakers" component={() => <ComingSoon title="Ice Breakers" description="Hockey recruiting, showcase events, and NHL draft prep. Own the ice." icon="🏒" />} />
      <Route path="/hockey" component={() => <ComingSoon title="Ice Breakers" description="Hockey recruiting, showcase events, and NHL draft prep." icon="🏒" />} />
      <Route path="/net-setters" component={() => <ComingSoon title="Net Setters" description="Volleyball recruiting, beach and indoor rankings, and club connections." icon="🏐" />} />
      <Route path="/volleyball" component={() => <ComingSoon title="Net Setters" description="Volleyball recruiting, beach and indoor rankings." icon="🏐" />} />
      <Route path="/track-elite" component={() => <ComingSoon title="Track Elite" description="Track & field recruiting, meet results, and Olympic pathway. Chase greatness." icon="🏃" />} />
      <Route path="/track" component={() => <ComingSoon title="Track Elite" description="Track & field recruiting, meet results, and Olympic pathway." icon="🏃" />} />
      <Route path="/swim-surge" component={() => <ComingSoon title="Swim Surge" description="Swimming recruiting, time tracking, and championship prep. Make waves." icon="🏊" />} />
      <Route path="/swimming" component={() => <ComingSoon title="Swim Surge" description="Swimming recruiting, time tracking, and championship prep." icon="🏊" />} />
      <Route path="/mat-warriors" component={() => <ComingSoon title="Mat Warriors" description="Wrestling recruiting, tournament brackets, and weight management." icon="🤼" />} />
      <Route path="/wrestling" component={() => <ComingSoon title="Mat Warriors" description="Wrestling recruiting, tournament brackets, and weight management." icon="🤼" />} />
      <Route path="/racket-kings" component={() => <ComingSoon title="Racket Kings" description="Tennis recruiting, rankings, and tournament play. Rule the court." icon="🎾" />} />
      <Route path="/tennis" component={() => <ComingSoon title="Racket Kings" description="Tennis recruiting, rankings, and tournament play." icon="🎾" />} />

      {/* ── Commerce & Infrastructure ── */}
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/store" component={Store} />
      <Route path="/shop" component={Store} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/pricing-tiers" component={PricingTiers} />
      <Route path="/billing" component={Billing} />
      <Route path="/payment-success" component={PaymentSuccess} />
      <Route path="/infrastructure" component={Infrastructure} />
      <Route path="/infrastructure-manager" component={InfrastructureManager} />
      <Route path="/bitcoin-mining" component={BitcoinMining} />
      <Route path="/robotics" component={Robotics} />
      <Route path="/trainerbot" component={TrainerBot} />
      <Route path="/trainer-bot" component={TrainerBot} />
      <Route path="/robot-companions" component={RobotCompanions} />
      <Route path="/download" component={AppStoreSubmission} />
      <Route path="/app-store" component={AppStoreSubmission} />
      <Route path="/apps" component={Apps} />
      <Route path="/mobile-app" component={MobileApp} />

      {/* ── DHG Corporate ── */}
      <Route path="/dhg" component={DHGCorporate} />
      <Route path="/dhg-home" component={DHGHome} />
      <Route path="/dhg-empire" component={DHGEmpire} />
      <Route path="/empire-vision" component={EmpireVision} />
      <Route path="/dozier-holdings" component={DHGCorporate} />
      <Route path="/softmor" component={Softmor} />
      <Route path="/investor-hub" component={InvestorHub} />
      <Route path="/investor-deck" component={InvestorDeck} />
      <Route path="/manus-partnership" component={ManusPartnership} />
      <Route path="/partners" component={Partners} />
      <Route path="/partner-portal" component={PartnerPortal} />
      <Route path="/white-label" component={WhiteLabel} />
      <Route path="/implementation" component={Implementation} />
      <Route path="/capabilities" component={Capabilities} />
      <Route path="/community-feedback" component={CommunityFeedback} />

      {/* ── People & Culture ── */}
      <Route path="/founders" component={Founders} />
      <Route path="/founder-story" component={FounderStory} />
      <Route path="/founder-dedication" component={FounderDedication} />
      <Route path="/team" component={Team} />
      <Route path="/leadership-principles" component={LeadershipPrinciples} />
      <Route path="/journey" component={Journey} />
      <Route path="/careers" component={Careers} />
      <Route path="/jobs" component={Careers} />
      <Route path="/blue-collar" component={BlueCollar} />
      <Route path="/veterans" component={Veterans} />
      <Route path="/military-division" component={MilitaryDivision} />
      <Route path="/operation-warrior-pipeline" component={MilitaryDivision} />
      <Route path="/medical" component={Medical} />
      <Route path="/health" component={Medical} />
      <Route path="/wellness" component={WellnessPortal} />
      <Route path="/mindset" component={Mindset} />
      <Route path="/serenity-memorial" component={SerenityMemorial} />
      <Route path="/school" component={SchoolPage} />

      {/* ── Media & Content ── */}
      <Route path="/podcast" component={Podcast} />
      <Route path="/music" component={Music} />
      <Route path="/studio" component={Studio} />
      <Route path="/media-showcase" component={MediaShowcase} />
      <Route path="/portal" component={Portal} />

      {/* ── Legal ── */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/legal-compliance" component={LegalCompliance} />

      {/* ── Utility ── */}
      <Route path="/notifications" component={Notifications} />
      <Route path="/contact" component={Contact} />
      <Route path="/quick-links" component={QuickLinksHub} />
      <Route path="/project-management" component={ProjectManagement} />
      <Route path="/project-checklist" component={ProjectChecklist} />
      <Route path="/project-playbook" component={ProjectPlaybook} />

      {/* ── Wizards ── */}
      <Route path="/wizards" component={WizardHub} />
      <Route path="/wizards/agent" component={AgentWizard} />
      <Route path="/wizards/career" component={CareerWizard} />
      <Route path="/wizards/financial" component={FinancialWizard} />
      <Route path="/wizards/lawyer" component={LawyerWizard} />
      <Route path="/wizards/life" component={LifeWizard} />
      <Route path="/wizards/scholarship" component={ScholarshipWizard} />
      <Route path="/wizards/scout" component={ScoutWizard} />
      <Route path="/wizards/transfer" component={TransferWizard} />

      {/* ── 404 ── */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SEOManager />
          <ScrollToTop />
          <Router />
          <PWAInstallBanner />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
