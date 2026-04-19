import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  Lightbulb
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface SuggestedQuestion {
  text: string;
  icon?: string;
}

interface AIWizardChatProps {
  wizardName: string;
  wizardIcon: React.ReactNode;
  wizardColor: string;
  systemPrompt: string;
  suggestedQuestions: SuggestedQuestion[];
  welcomeMessage: string;
}

// Simulated AI responses based on wizard type
const getAIResponse = (wizardName: string, question: string): string => {
  const responses: Record<string, Record<string, string>> = {
    "Agent Wizard": {
      default: `Great question about agents! Here's what you need to know:

**Finding the Right Agent:**
1. Look for NFLPA/NBPA certified agents
2. Check their track record with similar athletes
3. Ask for references from current clients
4. Understand their fee structure (typically 3-5% for contracts, 15-20% for endorsements)

**Red Flags to Watch:**
- Agents who guarantee specific outcomes
- Upfront fees before signing
- Pressure to sign quickly
- No verifiable client list

**Next Steps:**
I recommend starting with a list of 5-10 agents who specialize in your sport and position. Would you like me to help you create evaluation criteria?`,
      contract: `**Contract Negotiation Tips:**

1. **Never sign immediately** - Always take time to review
2. **Get everything in writing** - Verbal promises mean nothing
3. **Understand the term length** - Shorter terms give you flexibility
4. **Check termination clauses** - How can you exit if needed?
5. **Review exclusivity** - What are you giving up?

**Key Contract Elements:**
- Base compensation structure
- Performance bonuses
- Marketing/endorsement splits
- Expense reimbursement
- Term and renewal options

Would you like me to explain any of these in more detail?`,
    },
    "Legal Advisor": {
      default: `**NIL Compliance Overview:**

The NCAA allows athletes to profit from their Name, Image, and Likeness, but there are important rules:

**What's Allowed:**
✅ Social media endorsements
✅ Personal appearances
✅ Autograph signings
✅ Starting your own business
✅ Selling merchandise

**What's NOT Allowed:**
❌ Pay-for-play (compensation tied to athletic performance)
❌ Deals arranged by school boosters as recruiting inducements
❌ Using school logos without permission

**State Laws Matter:**
Each state has different NIL laws. I recommend checking your state's specific regulations.

What specific NIL situation would you like guidance on?`,
    },
    "Financial Coach": {
      default: `**Smart Money Management for Athletes:**

**The 50/30/20 Rule (Modified for Athletes):**
- 50% → Essentials (housing, food, transportation)
- 30% → Savings & Investments
- 20% → Lifestyle & Fun

**Why Athletes Need to Save More:**
- Career earnings are compressed into fewer years
- Income can be unpredictable
- Injuries can end careers suddenly

**Tax Tips:**
1. Set aside 30-40% for taxes on NIL income
2. Track ALL expenses (many are deductible)
3. Consider forming an LLC for NIL activities
4. Work with a sports-specialized accountant

**Investment Basics:**
- Start with index funds
- Avoid "hot tips" from friends
- Never invest what you can't afford to lose

What specific financial topic would you like to explore?`,
    },
    "Scholarship Navigator": {
      default: `**NCAA Scholarship & Eligibility Guide:**

**Academic Requirements (Division I):**
- Complete 16 core courses
- Minimum 2.3 GPA in core courses
- Meet sliding scale SAT/ACT requirements
- Graduate high school

**Maintaining Eligibility:**
- Full-time enrollment (12+ credits)
- Maintain minimum GPA (varies by year)
- Make progress toward degree
- Pass 6 credits each term

**Scholarship Types:**
- **Full Scholarship**: Tuition, room, board, books
- **Partial Scholarship**: Percentage of costs
- **Walk-On**: No athletic scholarship initially

**Important Deadlines:**
- Register with NCAA Eligibility Center early
- Submit transcripts after each year
- Complete amateurism certification

What aspect of scholarships or eligibility would you like to know more about?`,
    },
    "Scout Simulator": {
      default: `**What Scouts Look For:**

**Physical Attributes:**
- Size for your position
- Speed/agility measurables
- Strength indicators
- Injury history

**On-Field Performance:**
- Game film quality
- Consistency across games
- Performance in big moments
- Coachability

**Character Assessment:**
- Academic standing
- Social media presence
- Interview skills
- Team leadership

**How to Improve Your Profile:**
1. Create quality highlight film (3-5 minutes max)
2. Include your best plays AND full game film
3. Keep stats updated and accurate
4. Build a professional online presence

Would you like specific tips for your position?`,
    },
    "Transfer Guide": {
      default: `**Transfer Portal Step-by-Step:**

**Before Entering:**
1. Talk to your current coaches first
2. Understand your eligibility situation
3. Research potential destinations
4. Prepare your highlight film

**The Process:**
1. Submit intent to transfer to compliance office
2. Your name appears in portal within 48 hours
3. Coaches can now legally contact you
4. You have 30 days to find a new school (or withdraw)

**Key Dates (2025-26 Football):**
- Winter Window: Dec 9-28, 2025
- Spring Window: April 16-25, 2026

**Tips for Success:**
- Respond to coaches promptly
- Be honest about your situation
- Take official visits when offered
- Don't commit too quickly

What stage of the transfer process are you in?`,
    },
    "Life Coach": {
      default: `**Balancing Athletics, Academics & Life:**

**Time Management Framework:**
- **Morning**: Classes & study time
- **Afternoon**: Practice & training
- **Evening**: Recovery, social, personal time
- **Weekend**: Catch up & recharge

**Mental Wellness Tips:**
1. It's okay to not be okay - seek help when needed
2. Build relationships outside of sports
3. Have hobbies beyond athletics
4. Practice mindfulness/meditation

**Avoiding Burnout:**
- Schedule rest days
- Set boundaries with coaches/teammates
- Maintain relationships with family
- Remember WHY you play

**Building Your Identity:**
You are more than an athlete. Start exploring:
- Career interests
- Personal values
- Life goals beyond sports

What area of your life would you like to focus on?`,
    },
    "Career Transition": {
      default: `**Preparing for Life After Sports:**

**Start NOW (Not Later):**
- 98% of college athletes don't go pro
- Average pro career is 3-5 years
- Your degree and skills matter

**Transferable Skills from Sports:**
✅ Leadership & teamwork
✅ Time management
✅ Performing under pressure
✅ Goal setting & achievement
✅ Resilience & adaptability

**Career Paths for Athletes:**
- Coaching & training
- Sports media & broadcasting
- Sports business & marketing
- Entrepreneurship
- Corporate careers (finance, sales, etc.)

**Action Steps:**
1. Complete your degree
2. Build professional network NOW
3. Get internships during off-season
4. Develop skills beyond sports

What career direction interests you most?`,
    },
  };

  const wizardResponses = responses[wizardName] || responses["Agent Wizard"];
  
  // Check for keyword matches
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes("contract")) {
    return wizardResponses.contract || wizardResponses.default;
  }
  
  return wizardResponses.default;
};

export default function AIWizardChat({
  wizardName,
  wizardIcon,
  wizardColor,
  systemPrompt,
  suggestedQuestions,
  welcomeMessage,
}: AIWizardChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(wizardName, messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: welcomeMessage,
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] max-h-[700px]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.role === "assistant" && (
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${wizardColor} flex items-center justify-center flex-shrink-0`}>
                {wizardIcon}
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.role === "user" ? "order-first" : ""}`}>
              <Card className={`p-4 ${
                message.role === "user" 
                  ? "bg-cyan-500/20 border-cyan-500/30" 
                  : "bg-slate-800/80 border-slate-700"
              }`}>
                <div className="text-slate-200 text-sm whitespace-pre-wrap">
                  {message.content.split('\n').map((line, i) => {
                    // Handle bold text
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={i} className={line.startsWith('-') || line.startsWith('✅') || line.startsWith('❌') ? 'ml-2' : ''}>
                        {parts.map((part, j) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={j} className="text-white">{part.slice(2, -2)}</strong>;
                          }
                          return part;
                        })}
                      </p>
                    );
                  })}
                </div>
                
                {/* Message Actions */}
                {message.role === "assistant" && message.id !== "welcome" && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-green-400 h-8 px-2"
                      onClick={() => toast.success("Thanks for the feedback!")}
                    >
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-red-400 h-8 px-2"
                      onClick={() => toast.info("We'll improve this response")}
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-slate-400 hover:text-cyan-400 h-8 px-2"
                      onClick={() => handleCopy(message.content)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </Card>
              <p className="text-slate-500 text-xs mt-1 px-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {message.role === "user" && (
              <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${wizardColor} flex items-center justify-center`}>
              {wizardIcon}
            </div>
            <Card className="p-4 bg-slate-800/80 border-slate-700">
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-sm">Suggested questions</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400"
                onClick={() => handleSend(q.text)}
              >
                {q.icon && <span className="mr-1">{q.icon}</span>}
                {q.text}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
              placeholder={`Ask ${wizardName} anything...`}
              className="bg-slate-800 border-slate-600 text-white pr-12"
              disabled={isLoading}
            />
            <Button
              size="sm"
              className={`absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-r ${wizardColor} hover:opacity-90`}
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="text-slate-500 text-xs mt-2 text-center">
          AI responses are for guidance only. Always consult qualified professionals for important decisions.
        </p>
      </div>
    </div>
  );
}
