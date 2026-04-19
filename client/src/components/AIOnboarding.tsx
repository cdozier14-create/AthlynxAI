import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { CheckCircle, ArrowRight, ChevronLeft, X } from "lucide-react";

// ─── Role Definitions ─────────────────────────────────────────────────────────
export const ROLES = [
  { id: "athlete", label: "Athlete", emoji: "🏆", desc: "I'm the player" },
  { id: "parent", label: "Parent", emoji: "👨‍👩‍👧", desc: "Supporting my child" },
  { id: "coach", label: "Coach", emoji: "📋", desc: "I coach athletes" },
  { id: "agent", label: "Agent", emoji: "🤝", desc: "I represent athletes" },
  { id: "friend", label: "Friend", emoji: "👫", desc: "Supporting a friend" },
  { id: "fan", label: "Fan", emoji: "📣", desc: "I follow athletes" },
  { id: "brand", label: "Brand", emoji: "🏢", desc: "We want NIL deals" },
  { id: "sponsor", label: "Sponsor", emoji: "💰", desc: "I sponsor athletes" },
  { id: "financial_advisor", label: "Financial Advisor", emoji: "📊", desc: "I manage athlete finances" },
  { id: "pastor", label: "Pastor / Chaplain", emoji: "✝️", desc: "Spiritual support" },
  { id: "sibling", label: "Sibling", emoji: "👥", desc: "Supporting my sibling" },
  { id: "medical_doctor", label: "Doctor (MD)", emoji: "🩺", desc: "Athlete medical care" },
  { id: "physical_therapist", label: "Physical Therapist", emoji: "🦴", desc: "Rehab & recovery" },
  { id: "trainer", label: "Personal Trainer", emoji: "💪", desc: "I train athletes" },
  { id: "scout", label: "Scout / Recruiter", emoji: "🔭", desc: "I find talent" },
  { id: "media", label: "Media / Journalist", emoji: "🎙️", desc: "I cover athletes" },
  { id: "nutritionist", label: "Nutritionist", emoji: "🥗", desc: "Athlete nutrition" },
  { id: "mental_coach", label: "Mental Performance Coach", emoji: "🧠", desc: "Mental skills training" },
] as const;

export type RoleId = typeof ROLES[number]["id"];

// ─── Questions per role ───────────────────────────────────────────────────────
type Question = {
  key: string;
  question: string;
  placeholder: string;
  type?: "text" | "select" | "multiselect";
  options?: string[];
  optional?: boolean;
};

const COMMON_SOCIAL: Question[] = [
  { key: "instagram", question: "What's your Instagram handle? (optional)", placeholder: "@yourhandle", optional: true },
  { key: "twitter", question: "Twitter / X handle? (optional)", placeholder: "@yourhandle", optional: true },
  { key: "tiktok", question: "TikTok handle? (optional)", placeholder: "@yourhandle", optional: true },
  { key: "youtube", question: "YouTube channel? (optional)", placeholder: "youtube.com/c/yourchannel", optional: true },
];

const ROLE_QUESTIONS: Record<RoleId, Question[]> = {
  athlete: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "sport", question: "What sport do you play?", placeholder: "e.g. Football, Basketball, Soccer..." },
    { key: "position", question: "What position do you play?", placeholder: "e.g. Quarterback, Point Guard..." },
    { key: "grade", question: "What grade or level are you at?", placeholder: "e.g. 10th grade, College Junior, Pro..." },
    { key: "school", question: "What school or team are you on?", placeholder: "School or team name" },
    { key: "recruiting_status", question: "What's your recruiting status?", placeholder: "e.g. Uncommitted, Committed to..., Signed, Pro", type: "select", options: ["Not yet recruiting", "Actively being recruited", "Committed", "Signed / LOI", "Transfer Portal", "Professional"] },
    { key: "gpa", question: "What's your GPA? (optional — helps with academic matching)", placeholder: "e.g. 3.8", optional: true },
    { key: "parent_name", question: "What's your parent or guardian's name? (optional)", placeholder: "Parent/guardian name", optional: true },
    { key: "coach_name", question: "Who's your head coach?", placeholder: "Coach's name" },
    { key: "graduation_year", question: "What year do you graduate?", placeholder: "e.g. 2026, 2027..." },
    { key: "location", question: "What city and state are you from?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
    { key: "highlight_reel", question: "Do you have a highlight reel link? (Hudl, YouTube, etc.)", placeholder: "Paste link here", optional: true },
    { key: "goals", question: "What's your #1 goal on ATHLYNX?", placeholder: "e.g. Get recruited, find NIL deals, connect with coaches..." },
  ],
  parent: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "athlete_name", question: "What's your child's name?", placeholder: "Athlete's full name" },
    { key: "athlete_sport", question: "What sport does your child play?", placeholder: "e.g. Football, Basketball..." },
    { key: "athlete_grade", question: "What grade or level is your child?", placeholder: "e.g. 9th grade, College Freshman..." },
    { key: "athlete_school", question: "What school do they attend?", placeholder: "School name" },
    { key: "recruiting_status", question: "What's their recruiting status?", placeholder: "e.g. Looking for offers, Committed...", type: "select", options: ["Not yet recruiting", "Actively being recruited", "Committed", "Signed / LOI", "Transfer Portal", "Professional"] },
    { key: "location", question: "What city and state are you in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
    { key: "goals", question: "What's your main goal for your child on ATHLYNX?", placeholder: "e.g. Get recruited, find NIL deals, connect with coaches..." },
  ],
  coach: [
    { key: "firstName", question: "What's your first name, Coach?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "sport", question: "What sport do you coach?", placeholder: "e.g. Football, Basketball..." },
    { key: "school", question: "What school or organization do you coach for?", placeholder: "School or org name" },
    { key: "level", question: "What level do you coach?", placeholder: "e.g. High School, College D1, Pro...", type: "select", options: ["Youth / Club", "Middle School", "High School", "JUCO", "College D3", "College D2", "College D1", "Professional", "International"] },
    { key: "location", question: "What city and state are you in?", placeholder: "City, State" },
    { key: "years_coaching", question: "How many years have you been coaching?", placeholder: "e.g. 5 years" },
    ...COMMON_SOCIAL,
    { key: "goals", question: "What are you looking for on ATHLYNX?", placeholder: "e.g. Find recruits, manage my roster, connect with athletes..." },
  ],
  agent: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "agency", question: "What agency or firm are you with?", placeholder: "Agency name (or Independent)" },
    { key: "certification", question: "What certifications do you hold?", placeholder: "e.g. NFLPA, NBPA, MLBPA..." },
    { key: "sports", question: "What sports do you represent?", placeholder: "e.g. Football, Basketball, Baseball..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    { key: "clients", question: "How many active clients do you currently represent?", placeholder: "e.g. 12" },
    ...COMMON_SOCIAL,
    { key: "goals", question: "What are you looking for on ATHLYNX?", placeholder: "e.g. Find new clients, manage NIL deals, connect with athletes..." },
  ],
  friend: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "athlete_name", question: "Who's the athlete you're supporting?", placeholder: "Their name" },
    { key: "athlete_sport", question: "What sport do they play?", placeholder: "Sport" },
    { key: "location", question: "What city and state are you in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  fan: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "favorite_sport", question: "What's your favorite sport?", placeholder: "e.g. Football, Basketball..." },
    { key: "favorite_team", question: "What's your favorite team?", placeholder: "Team name" },
    { key: "location", question: "What city and state are you in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  brand: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "brand_name", question: "What's your brand or company name?", placeholder: "Brand name" },
    { key: "industry", question: "What industry are you in?", placeholder: "e.g. Apparel, Nutrition, Tech..." },
    { key: "target_sports", question: "What sports are you targeting for NIL deals?", placeholder: "e.g. Football, Basketball, All Sports..." },
    { key: "budget", question: "What's your approximate NIL budget range?", placeholder: "e.g. $5K–$50K per deal", type: "select", options: ["Under $1K", "$1K–$5K", "$5K–$25K", "$25K–$100K", "$100K+", "Flexible"] },
    { key: "location", question: "Where is your company headquartered?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
    { key: "goals", question: "What are you looking for on ATHLYNX?", placeholder: "e.g. Find athletes for campaigns, post endorsement deals..." },
  ],
  sponsor: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "company", question: "What company or organization do you represent?", placeholder: "Company name" },
    { key: "sponsorship_type", question: "What type of sponsorships are you offering?", placeholder: "e.g. Equipment, Cash, Scholarship, Apparel..." },
    { key: "sports", question: "What sports are you interested in sponsoring?", placeholder: "e.g. Football, All Sports..." },
    { key: "location", question: "Where are you based?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  financial_advisor: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "firm", question: "What firm are you with?", placeholder: "Firm name (or Independent)" },
    { key: "certifications", question: "What certifications do you hold?", placeholder: "e.g. CFP, CFA, CPA..." },
    { key: "specialty", question: "What's your specialty?", placeholder: "e.g. Athlete wealth management, NIL tax, retirement..." },
    { key: "athlete_clients", question: "How many athlete clients do you currently serve?", placeholder: "e.g. 25" },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  pastor: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "church_org", question: "What church or organization are you with?", placeholder: "Church / org name" },
    { key: "location", question: "What city and state are you in?", placeholder: "City, State" },
    { key: "sports_connection", question: "What sports or teams do you serve?", placeholder: "e.g. High school football, College basketball..." },
    ...COMMON_SOCIAL,
  ],
  sibling: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "athlete_name", question: "What's your sibling's name?", placeholder: "Their name" },
    { key: "athlete_sport", question: "What sport do they play?", placeholder: "Sport" },
    { key: "location", question: "What city and state are you in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  medical_doctor: [
    { key: "firstName", question: "What's your first name, Doctor?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "specialty", question: "What's your medical specialty?", placeholder: "e.g. Sports medicine, Orthopedics..." },
    { key: "organization", question: "What hospital, clinic, or team are you with?", placeholder: "Organization name" },
    { key: "sports_served", question: "What sports or teams do you serve?", placeholder: "e.g. NFL team, College athletics..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  physical_therapist: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "certifications", question: "What certifications do you hold?", placeholder: "e.g. DPT, ATC, CSCS..." },
    { key: "organization", question: "What clinic or team are you with?", placeholder: "Organization name" },
    { key: "sports_served", question: "What sports do you specialize in?", placeholder: "e.g. Football, Basketball, All sports..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  trainer: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "certifications", question: "What certifications do you hold?", placeholder: "e.g. NASM, CSCS, ACE..." },
    { key: "specialty", question: "What's your training specialty?", placeholder: "e.g. Speed & agility, Strength, Sport-specific..." },
    { key: "sports_served", question: "What sports do you train athletes in?", placeholder: "e.g. Football, Basketball, All sports..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
    { key: "goals", question: "What are you looking for on ATHLYNX?", placeholder: "e.g. Find clients, showcase my services..." },
  ],
  scout: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "organization", question: "What organization do you scout for?", placeholder: "School, team, or agency" },
    { key: "sport", question: "What sport do you scout?", placeholder: "e.g. Football, Basketball..." },
    { key: "level", question: "What level do you recruit/scout?", placeholder: "e.g. High School, College, Pro..." },
    { key: "location", question: "What region do you cover?", placeholder: "e.g. Southeast, National..." },
    ...COMMON_SOCIAL,
  ],
  media: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "outlet", question: "What media outlet or publication are you with?", placeholder: "Outlet name (or Independent)" },
    { key: "beat", question: "What's your beat or coverage area?", placeholder: "e.g. College football, NBA, High school sports..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  nutritionist: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "certifications", question: "What certifications do you hold?", placeholder: "e.g. RD, CISSN, CNS..." },
    { key: "organization", question: "What organization or team are you with?", placeholder: "Organization name (or Independent)" },
    { key: "sports_served", question: "What sports do you specialize in?", placeholder: "e.g. Football, Endurance sports, All sports..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
  ],
  mental_coach: [
    { key: "firstName", question: "What's your first name?", placeholder: "First name" },
    { key: "lastName", question: "And your last name?", placeholder: "Last name" },
    { key: "certifications", question: "What certifications do you hold?", placeholder: "e.g. CMPC, PhD, LCSW..." },
    { key: "organization", question: "What organization or team are you with?", placeholder: "Organization name (or Independent)" },
    { key: "sports_served", question: "What sports do you work with?", placeholder: "e.g. Football, All sports..." },
    { key: "location", question: "What city and state are you based in?", placeholder: "City, State" },
    ...COMMON_SOCIAL,
    { key: "goals", question: "What are you looking for on ATHLYNX?", placeholder: "e.g. Find athlete clients, share resources..." },
  ],
};

// ─── Component ────────────────────────────────────────────────────────────────
interface AIOnboardingProps {
  onComplete: (data: Record<string, string>) => void;
  onDismiss?: () => void;
}

export default function AIOnboarding({ onComplete, onDismiss }: AIOnboardingProps) {
  const [step, setStep] = useState<"role" | "questions" | "done">("role");
  const [selectedRole, setSelectedRole] = useState<RoleId | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [messages, setMessages] = useState<{ role: "ai" | "user"; text: string }[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const saveOnboarding = trpc.profile.saveOnboarding.useMutation({
    onSuccess: () => {
      setStep("done");
      onComplete(answers);
    },
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const roleObj = ROLES.find(r => r.id === selectedRole);
  const questions = selectedRole ? ROLE_QUESTIONS[selectedRole] : [];
  const currentQ = questions[questionIndex];
  const progress = questions.length > 0 ? Math.round((questionIndex / questions.length) * 100) : 0;

  const handleRoleSelect = (roleId: RoleId) => {
    setSelectedRole(roleId);
    const role = ROLES.find(r => r.id === roleId)!;
    setMessages([
      { role: "ai", text: `Welcome to ATHLYNX! I'm your AI Trainer. I see you're a ${role.label} ${role.emoji}` },
      { role: "ai", text: `I'm going to ask you a few quick questions to personalize your experience. Let's start — ${ROLE_QUESTIONS[roleId][0].question}` },
    ]);
    setStep("questions");
    setQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer("");
  };

  const handleAnswer = () => {
    if (!currentAnswer.trim() && !currentQ.optional) return;
    const newAnswers = { ...answers, [currentQ.key]: currentAnswer.trim() };
    setAnswers(newAnswers);

    // Add to chat
    const newMessages = [...messages];
    if (currentAnswer.trim()) {
      newMessages.push({ role: "user", text: currentAnswer.trim() });
    } else {
      newMessages.push({ role: "user", text: "Skip" });
    }

    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      newMessages.push({ role: "ai", text: nextQ.question });
      setMessages(newMessages);
      setQuestionIndex(nextIndex);
      setCurrentAnswer("");
    } else {
      // Done
      newMessages.push({ role: "ai", text: `Perfect! You're all set, ${newAnswers.firstName || "there"}! 🎉 Welcome to ATHLYNX — your profile is being set up now.` });
      setMessages(newMessages);
      // Save to backend
      saveOnboarding.mutate({
        role: selectedRole!,
        data: newAnswers,
      });
    }
  };

  const handleSkip = () => {
    if (!currentQ.optional) return;
    const newAnswers = { ...answers };
    const newMessages = [...messages, { role: "user" as const, text: "Skip" }];
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      newMessages.push({ role: "ai" as const, text: questions[nextIndex].question });
      setMessages(newMessages);
      setQuestionIndex(nextIndex);
      setCurrentAnswer("");
    } else {
      newMessages.push({ role: "ai" as const, text: `You're all set! 🎉 Welcome to ATHLYNX — your profile is being set up now.` });
      setMessages(newMessages);
      saveOnboarding.mutate({ role: selectedRole!, data: newAnswers });
    }
  };

  // ── Role Selection ──
  if (step === "role") {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
        <div className="bg-[#0d1a3a] border border-blue-700/50 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl shadow-blue-900/50">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-t-3xl p-5 text-center">
            <div className="text-4xl mb-2">🤖</div>
            <h2 className="text-xl font-black text-white">Welcome to ATHLYNX!</h2>
            <p className="text-blue-200 text-sm mt-1">I'm your AI Trainer. First — who are you?</p>
          </div>

          <div className="p-5">
            <div className="grid grid-cols-2 gap-2.5">
              {ROLES.map(role => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-900/30 border border-blue-800/40 hover:bg-blue-800/50 hover:border-blue-600/60 transition-all text-left group"
                >
                  <span className="text-2xl shrink-0">{role.emoji}</span>
                  <div>
                    <div className="font-bold text-white text-sm leading-tight">{role.label}</div>
                    <div className="text-blue-400 text-xs">{role.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            {onDismiss && (
              <button onClick={onDismiss} className="w-full mt-4 text-blue-500 text-sm hover:text-blue-300 transition-colors py-2">
                Skip for now
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Questions (Chat UI) ──
  if (step === "questions") {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
        <div className="bg-[#0d1a3a] border border-blue-700/50 rounded-3xl w-full max-w-lg shadow-2xl shadow-blue-900/50 flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-t-3xl p-4 shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => { setStep("role"); setSelectedRole(null); }} className="text-blue-200 hover:text-white">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-lg">{roleObj?.emoji}</div>
                <div>
                  <div className="font-black text-white text-sm">AI Trainer</div>
                  <div className="text-blue-200 text-xs">{roleObj?.label} Onboarding</div>
                </div>
              </div>
              {onDismiss && (
                <button onClick={onDismiss} className="text-blue-200 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {/* Progress bar */}
            <div className="mt-3 bg-white/20 rounded-full h-1.5">
              <div
                className="bg-white rounded-full h-1.5 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-blue-200 text-xs mt-1 text-right">{questionIndex} of {questions.length} questions</div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm shrink-0 mt-0.5">🤖</div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-[#1a3a8f] text-blue-100 rounded-bl-sm border border-blue-800/50"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {saveOnboarding.isPending && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm shrink-0">🤖</div>
                <div className="bg-[#1a3a8f] border border-blue-800/50 rounded-2xl rounded-bl-sm px-3 py-2">
                  <div className="flex gap-1 items-center h-5">
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          {step === "questions" && currentQ && !saveOnboarding.isPending && (
            <div className="p-4 border-t border-blue-800/50 shrink-0">
              {currentQ.type === "select" && currentQ.options ? (
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {currentQ.options.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setCurrentAnswer(opt)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all border ${
                          currentAnswer === opt
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-blue-900/30 text-blue-300 border-blue-800/40 hover:bg-blue-800/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={handleAnswer}
                    disabled={!currentAnswer}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl"
                  >
                    Continue <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={currentAnswer}
                    onChange={e => setCurrentAnswer(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleAnswer()}
                    placeholder={currentQ.placeholder}
                    className="flex-1 bg-[#0a0f1e] border-blue-800 text-white placeholder:text-blue-600 rounded-xl"
                    autoFocus
                  />
                  {currentQ.optional && (
                    <Button variant="outline" onClick={handleSkip} className="border-blue-700 text-blue-400 hover:bg-blue-900/40 rounded-xl shrink-0">
                      Skip
                    </Button>
                  )}
                  <Button
                    onClick={handleAnswer}
                    disabled={!currentAnswer.trim() && !currentQ.optional}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shrink-0"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Done ──
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1a3a] border border-green-700/50 rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl">
        <div className="text-6xl mb-4">🎉</div>
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h2 className="text-2xl font-black text-white mb-2">You're In!</h2>
        <p className="text-blue-300 mb-6">Your ATHLYNX profile is set up. Welcome to the platform — let's get to work.</p>
        <Button
          onClick={() => onComplete(answers)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-3 rounded-xl text-lg"
        >
          Let's Go! <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
