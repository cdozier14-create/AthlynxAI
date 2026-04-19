import { useState } from 'react';
import { Link } from 'wouter';
import { CheckCircle2, Circle, Clock, Target, Users, Rocket, Calendar } from 'lucide-react';

interface Task {
  id: string;
  task: string;
  status: 'done' | 'in-progress' | 'pending';
  route?: string;
}

interface Phase {
  id: string;
  title: string;
  tasks: Task[];
}

const phases: Phase[] = [
  {
    id: 'foundation',
    title: 'Phase 1: Foundation (COMPLETE)',
    tasks: [
      { id: '1', task: 'VIP Early Access Page', status: 'done', route: '/' },
      { id: '2', task: 'DHG Corporate Page', status: 'done', route: '/dhg' },
      { id: '3', task: 'Softmor Inc Page', status: 'done', route: '/softmor' },
      { id: '4', task: 'Project Management Dashboard', status: 'done', route: '/pm' },
      { id: '5', task: 'Media Showcase', status: 'done', route: '/media' },
      { id: '6', task: 'Quick Links Hub', status: 'done', route: '/hub' },
      { id: '7', task: 'Investor Hub', status: 'done', route: '/investor-hub' },
      { id: '8', task: 'Team/Leadership Page', status: 'done', route: '/team' },
      { id: '9', task: 'Athlete Dashboard', status: 'done', route: '/athlete-dashboard' },
      { id: '10', task: 'NIL Portal', status: 'done', route: '/nil-portal' },
      { id: '11', task: 'NIL Marketplace', status: 'done', route: '/nil-marketplace' },
      { id: '12', task: 'Diamond Grind', status: 'done', route: '/diamond-grind' },
      { id: '13', task: 'Messages', status: 'done', route: '/messages' },
      { id: '14', task: 'Transfer Portal', status: 'done', route: '/transfer-portal' },
      { id: '15', task: 'Founder Story', status: 'done', route: '/founder-story' },
      { id: '16', task: 'Apps Page', status: 'done', route: '/apps' },
      { id: '17', task: 'Pricing Page', status: 'done', route: '/pricing' },
      { id: '18', task: 'Store', status: 'done', route: '/store' },
      { id: '19', task: 'Careers', status: 'done', route: '/careers' },
      { id: '20', task: 'Medical', status: 'done', route: '/medical' },
      { id: '21', task: 'Training', status: 'done', route: '/training' },
      { id: '22', task: 'Veterans', status: 'done', route: '/veterans' },
      { id: '23', task: 'Music', status: 'done', route: '/music' },
      { id: '24', task: 'Faith', status: 'done', route: '/faith' },
      { id: '25', task: 'Military Division', status: 'done', route: '/military-division' },
    ]
  },
  {
    id: 'navigation',
    title: 'Phase 2: Navigation & Connectivity (COMPLETE)',
    tasks: [
      { id: '26', task: 'Unified Footer Component', status: 'done' },
      { id: '27', task: 'Home Page Links to All Sections', status: 'done', route: '/home' },
      { id: '28', task: 'VIP Page Footer', status: 'done', route: '/' },
      { id: '29', task: 'Launch Tracker Created', status: 'done' },
    ]
  },
  {
    id: 'email',
    title: 'Phase 3: Email & User Systems',
    tasks: [
      { id: '30', task: 'VIP Signups to Database', status: 'done' },
      { id: '31', task: 'AI Welcome Email Generation', status: 'done' },
      { id: '32', task: 'Owner Notification on Signup', status: 'done' },
      { id: '33', task: 'Access Code Generation', status: 'done' },
      { id: '34', task: 'Email Verification System', status: 'pending' },
      { id: '35', task: 'User Onboarding Flow', status: 'pending' },
    ]
  },
  {
    id: 'ai-bots',
    title: 'Phase 4: AI Bots & Agents',
    tasks: [
      { id: '36', task: 'FUEL Bots Integration', status: 'pending' },
      { id: '37', task: 'AI Training Recommendations', status: 'pending' },
      { id: '38', task: 'AI Deal Matching', status: 'pending' },
      { id: '39', task: 'Chatbot for Support', status: 'pending' },
    ]
  },
  {
    id: 'diamond-grind',
    title: 'Phase 5: Diamond Grind Polish (2/1/26 Launch)',
    tasks: [
      { id: '40', task: 'Baseball-Specific Features', status: 'in-progress', route: '/diamond-grind' },
      { id: '41', task: 'Player Profiles', status: 'pending' },
      { id: '42', task: 'Stats Tracking', status: 'pending' },
      { id: '43', task: 'Recruitment Tools', status: 'pending' },
      { id: '44', task: 'Video Highlights', status: 'pending' },
    ]
  },
  {
    id: 'beta',
    title: 'Phase 6: Beta Launch (10,000 Users)',
    tasks: [
      { id: '45', task: 'Load Testing', status: 'pending' },
      { id: '46', task: 'User Feedback System', status: 'pending' },
      { id: '47', task: 'Bug Tracking', status: 'pending' },
      { id: '48', task: 'Analytics Dashboard', status: 'pending' },
      { id: '49', task: 'Beta Invite System', status: 'pending' },
      { id: '50', task: 'Launch Marketing', status: 'pending' },
    ]
  }
];

export default function ProjectChecklist() {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['foundation', 'navigation', 'email', 'diamond-grind']);

  const togglePhase = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = phases.reduce((acc, phase) => 
    acc + phase.tasks.filter(t => t.status === 'done').length, 0
  );
  const inProgressTasks = phases.reduce((acc, phase) => 
    acc + phase.tasks.filter(t => t.status === 'in-progress').length, 0
  );
  const progress = Math.round((completedTasks / totalTasks) * 100);

  const daysToLaunch = Math.ceil((new Date('2026-02-01').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a1628] to-[#1a2d4a] border-b border-cyan-500/20">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm mb-2 inline-block">
                ← Back to Platform
              </Link>
              <h1 className="text-3xl font-bold">ATHLYNX Project Checklist</h1>
              <p className="text-gray-400 mt-1">Launch Tracker for 2/1/26</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">{daysToLaunch}</div>
                <div className="text-xs text-gray-400">Days to Launch</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{completedTasks}</div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">{inProgressTasks}</div>
                <div className="text-xs text-gray-400">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-400">{totalTasks - completedTasks - inProgressTasks}</div>
                <div className="text-xs text-gray-400">Pending</div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span className="text-cyan-400">{progress}%</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="container py-8">
        <div className="space-y-4">
          {phases.map((phase) => {
            const phaseCompleted = phase.tasks.filter(t => t.status === 'done').length;
            const phaseTotal = phase.tasks.length;
            const phaseProgress = Math.round((phaseCompleted / phaseTotal) * 100);
            const isExpanded = expandedPhases.includes(phase.id);

            return (
              <div key={phase.id} className="bg-[#0d1e36] border border-cyan-500/20 rounded-lg overflow-hidden">
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#1a2d4a] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      phaseProgress === 100 ? 'bg-green-500/20 text-green-400' :
                      phaseProgress > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {phaseProgress === 100 ? <CheckCircle2 className="w-5 h-5" /> :
                       phaseProgress > 0 ? <Clock className="w-5 h-5" /> :
                       <Target className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold">{phase.title}</h3>
                      <p className="text-sm text-gray-400">{phaseCompleted}/{phaseTotal} tasks completed</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          phaseProgress === 100 ? 'bg-green-500' :
                          phaseProgress > 0 ? 'bg-yellow-500' :
                          'bg-gray-600'
                        }`}
                        style={{ width: `${phaseProgress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-400 w-12">{phaseProgress}%</span>
                    <svg 
                      className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-cyan-500/10">
                    <div className="divide-y divide-cyan-500/10">
                      {phase.tasks.map((task) => (
                        <div 
                          key={task.id}
                          className="px-6 py-3 flex items-center justify-between hover:bg-[#1a2d4a]/50"
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(task.status)}
                            <span className={task.status === 'done' ? 'text-gray-400' : 'text-white'}>
                              {task.task}
                            </span>
                          </div>
                          {task.route && (
                            <Link 
                              href={task.route}
                              className="text-cyan-400 hover:text-cyan-300 text-sm"
                            >
                              View →
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="bg-[#0d1e36] border border-cyan-500/20 rounded-lg p-4 text-center">
            <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">Feb 1, 2026</div>
            <div className="text-sm text-gray-400">Launch Date</div>
          </div>
          <div className="bg-[#0d1e36] border border-cyan-500/20 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">10,000</div>
            <div className="text-sm text-gray-400">Beta Users Target</div>
          </div>
          <div className="bg-[#0d1e36] border border-cyan-500/20 rounded-lg p-4 text-center">
            <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">25+</div>
            <div className="text-sm text-gray-400">Pages Built</div>
          </div>
          <div className="bg-[#0d1e36] border border-cyan-500/20 rounded-lg p-4 text-center">
            <Rocket className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold">Diamond Grind</div>
            <div className="text-sm text-gray-400">First Launch App</div>
          </div>
        </div>
      </div>
    </div>
  );
}
