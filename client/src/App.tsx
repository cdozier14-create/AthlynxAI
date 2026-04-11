import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "@/pages/LandingPage";
import Portal from "@/pages/Portal";
import FounderStory from "@/pages/FounderStory";
import RobotCompanions from "@/pages/RobotCompanions";
import Veterans from "@/pages/Veterans";
import BlueCollar from "@/pages/BlueCollar";
import CRMDashboard from "@/pages/CRMDashboard";
import CRMCommandCenter from "@/pages/CRMCommandCenter";
import ManusPartnership from "@/pages/ManusPartnership";
import Pricing from "@/pages/Pricing";
import PaymentSuccess from "@/pages/PaymentSuccess";
import NILCalculator from "@/pages/NILCalculator";
import AthleteWebsiteBuilder from "@/pages/AthleteWebsiteBuilder";
import TransferPortal from "@/pages/TransferPortal";
import TransferPortalFOS from "@/pages/TransferPortalFOS";
import SchoolPage from "@/pages/SchoolPage";
import WizardHub from "@/pages/WizardHub";
import AgentWizard from "@/pages/wizards/AgentWizard";
import { 
  LawyerWizard, 
  FinancialWizard, 
  ScholarshipWizard, 
  ScoutWizard, 
  TransferWizard, 
  LifeWizard, 
  CareerWizard 
} from "@/pages/wizards";

// 10 ATHLYNX Apps
import DiamondGrind from "@/pages/DiamondGrind";
import WarriorsPlaybook from "@/pages/WarriorsPlaybook";
import NILVault from "@/pages/NILVault";
import AISales from "@/pages/AISales";
import Faith from "@/pages/Faith";
import AIRecruiter from "@/pages/AIRecruiter";
import AIContent from "@/pages/AIContent";
import InfrastructureManager from "@/pages/InfrastructureManager";

// Legal & Compliance Pages
import LegalHub from "@/pages/LegalHub";
import HIPAACompliance from "@/pages/HIPAACompliance";
import CorporateDocuments from "@/pages/CorporateDocuments";
import Contracts from "@/pages/Contracts";
import Partners from "@/pages/Partners";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import DHGHome from "@/pages/DHGHome";
import SocialHub from "@/pages/SocialHub";
import CommsHub from "@/pages/CommsHub";
import AthlynxBrowser from "@/pages/AthlynxBrowser";
import EarlyAccess from "@/pages/EarlyAccess";
import Dreams2026Gallery from "@/components/Dreams2026Gallery";

function Router() {
  return (
    <Switch>
      <Route path="/" component={EarlyAccess} />
      <Route path="/dhg" component={DHGHome} />
      <Route path="/dozier-holdings" component={DHGHome} />
      <Route path="/empire" component={DHGHome} />
      <Route path="/early-access" component={EarlyAccess} />
      <Route path="/gallery" component={Dreams2026Gallery} />
      <Route path="/dreams-2026" component={Dreams2026Gallery} />
      <Route path="/vision" component={Dreams2026Gallery} />
      <Route path="/portal" component={Portal} />
      <Route path="/our-story" component={FounderStory} />
      <Route path="/founder-story" component={FounderStory} />
      <Route path="/robot-companions" component={RobotCompanions} />
      <Route path="/robots" component={RobotCompanions} />
      <Route path="/veterans" component={Veterans} />
      <Route path="/veterans-heroes" component={Veterans} />
      <Route path="/blue-collar" component={BlueCollar} />
      <Route path="/life-playbook" component={BlueCollar} />
      <Route path="/crm" component={CRMDashboard} />
      <Route path="/dashboard" component={CRMDashboard} />
      <Route path="/partner-dashboard" component={CRMDashboard} />
      <Route path="/command-center" component={CRMCommandCenter} />
      <Route path="/admin" component={CRMCommandCenter} />
      <Route path="/founders" component={CRMCommandCenter} />
      <Route path="/backoffice" component={CRMCommandCenter} />
      <Route path="/manus" component={ManusPartnership} />
      <Route path="/partnership" component={ManusPartnership} />
      <Route path="/ai-partner" component={ManusPartnership} />
      
      {/* Social Media Hub - ALL PLATFORMS IN ONE */}
      <Route path="/social" component={SocialHub} />
      <Route path="/social-hub" component={SocialHub} />
      <Route path="/broadcast" component={SocialHub} />
      <Route path="/comms" component={CommsHub} />
      <Route path="/communications" component={CommsHub} />
      <Route path="/team-comms" component={CommsHub} />
      
      {/* ATHLYNX Browser - AI-Powered */}
      <Route path="/browser" component={AthlynxBrowser} />
      <Route path="/athlynx-browser" component={AthlynxBrowser} />
      <Route path="/web" component={AthlynxBrowser} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/transfer-portal" component={TransferPortal} />
      <Route path="/portal-news" component={TransferPortalFOS} />
      <Route path="/transfer-news" component={TransferPortalFOS} />
      <Route path="/school/:slug" component={SchoolPage} />
      <Route path="/portal-search" component={TransferPortal} />
      <Route path="/find-players" component={TransferPortal} />
      <Route path="/plans" component={Pricing} />
      <Route path="/subscribe" component={Pricing} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/checkout/success" component={PaymentSuccess} />
      <Route path="/nil-calculator" component={NILCalculator} />
      <Route path="/infrastructure" component={InfrastructureManager} />
      <Route path="/calculator" component={NILCalculator} />
      <Route path="/valuation" component={NILCalculator} />
      <Route path="/website-builder" component={AthleteWebsiteBuilder} />
      <Route path="/build-website" component={AthleteWebsiteBuilder} />
      <Route path="/athlete-site" component={AthleteWebsiteBuilder} />
      
      {/* AI Wizard Hub & Individual Wizards */}
      <Route path="/wizards" component={WizardHub} />
      <Route path="/ai-hub" component={WizardHub} />
      <Route path="/wizard/agent" component={AgentWizard} />
      <Route path="/wizard/lawyer" component={LawyerWizard} />
      <Route path="/wizard/financial" component={FinancialWizard} />
      <Route path="/wizard/scholarship" component={ScholarshipWizard} />
      <Route path="/wizard/scout" component={ScoutWizard} />
      <Route path="/wizard/transfer" component={TransferWizard} />
      <Route path="/wizard/life" component={LifeWizard} />
      <Route path="/wizard/career" component={CareerWizard} />
      
      {/* 10 ATHLYNX Apps */}
      <Route path="/diamond-grind" component={DiamondGrind} />
      <Route path="/training" component={DiamondGrind} />
      <Route path="/workout" component={DiamondGrind} />
      <Route path="/warriors-playbook" component={WarriorsPlaybook} />
      <Route path="/playbook" component={WarriorsPlaybook} />
      <Route path="/strategy" component={WarriorsPlaybook} />
      <Route path="/nil-vault" component={NILVault} />
      <Route path="/vault" component={NILVault} />
      <Route path="/deals" component={NILVault} />
      <Route path="/ai-sales" component={AISales} />
      <Route path="/brand-deals" component={AISales} />
      <Route path="/outreach" component={AISales} />
      <Route path="/faith" component={Faith} />
      <Route path="/spiritual" component={Faith} />
      <Route path="/wellness" component={Faith} />
      <Route path="/ai-recruiter" component={AIRecruiter} />
      <Route path="/recruiting" component={AIRecruiter} />
      <Route path="/schools" component={AIRecruiter} />
      <Route path="/ai-content" component={AIContent} />
      <Route path="/content" component={AIContent} />
      <Route path="/create" component={AIContent} />
      
      {/* Legal & Compliance */}
      <Route path="/legal" component={LegalHub} />
      <Route path="/legal-hub" component={LegalHub} />
      <Route path="/hipaa" component={HIPAACompliance} />
      <Route path="/hipaa-compliance" component={HIPAACompliance} />
      <Route path="/corporate" component={CorporateDocuments} />
      <Route path="/corporate-documents" component={CorporateDocuments} />
      <Route path="/business-formation" component={CorporateDocuments} />
      <Route path="/contracts" component={Contracts} />
      <Route path="/agreements" component={Contracts} />
      <Route path="/nil-contracts" component={Contracts} />
      <Route path="/partners" component={Partners} />
      <Route path="/partner-portal" component={Partners} />
      <Route path="/affiliate" component={Partners} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/tos" component={TermsOfService} />
      
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
// Force rebuild Sun Jan 25 14:15:28 EST 2026
