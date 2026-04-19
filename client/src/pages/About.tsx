import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";

const CHAD_PHOTOS = [
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/FBZpDFtgpfccCmJU.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/njcSBgdVMQaiXBHv.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/pDhQvrPPogxqLYSQ.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/tFVPmoZRQTPmgrJq.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/nYSwBctuqiLNmZKH.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/BiQQBGyrGgmwbixD.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/rPCgYqdqsUeWubiV.png",
];

const ACTION_PHOTOS = [
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/mdIJLfTkeZzcljGq.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/lQjoLdGtkuRqoxxh.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/mAYQdvZyYAqmaxml.png",
  "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/EOYOAyTecNwpHgPE.png",
];

export default function About() {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [actionIdx, setActionIdx] = useState(0);

  const prevPhoto = () => setPhotoIdx((i) => (i === 0 ? CHAD_PHOTOS.length - 1 : i - 1));
  const nextPhoto = () => setPhotoIdx((i) => (i === CHAD_PHOTOS.length - 1 ? 0 : i + 1));
  const prevAction = () => setActionIdx((i) => (i === 0 ? ACTION_PHOTOS.length - 1 : i - 1));
  const nextAction = () => setActionIdx((i) => (i === ACTION_PHOTOS.length - 1 ? 0 : i + 1));

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-[#0a0f1e]" />
        <div className="relative max-w-6xl mx-auto px-4 pt-16 pb-12 text-center">
          <Badge className="mb-4 bg-blue-600/20 text-blue-400 border-blue-600/30 text-sm px-4 py-1">
            Our Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-4 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Built for Athletes.<br />By Someone Who Knows.
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            ATHLYNX was built from the ground up with one purpose — to give every athlete, at every level, the tools and connections they deserve.
          </p>
        </div>
      </div>

      {/* Photo Gallery + Story */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Photo Carousel */}
          <div className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl shadow-blue-900/30">
              <img
                src={CHAD_PHOTOS[photoIdx]}
                alt="Chad A. Dozier"
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-bold text-white text-lg">Chad A. Dozier Sr.</p>
                <p className="text-blue-300 text-sm">Founder & CEO, ATHLYNX</p>
              </div>
            </div>
            {/* Carousel controls */}
            <button
              onClick={prevPhoto}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {CHAD_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === photoIdx ? "bg-blue-400 w-6" : "bg-gray-600"}`}
                />
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <Quote className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <p className="text-xl text-gray-200 leading-relaxed italic">
                "I built ATHLYNX because I lived the athlete's journey — and I saw how many athletes were left without the right tools, the right connections, and the right guidance at the most critical moments of their careers."
              </p>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Chad A. Dozier Sr. played professional baseball and experienced firsthand what it means to navigate the recruiting process, NIL opportunities, contracts, and the transition from sports to life after the game — often without a roadmap.
              </p>
              <p>
                ATHLYNX is the platform he wished existed when he was coming up. From high school recruiting to college NIL deals, transfer portal decisions, professional contracts, and retirement planning — every feature on this platform was designed around real athlete needs.
              </p>
              <p>
                The mission is simple: <strong className="text-white">no athlete should have to figure it out alone.</strong> Whether you're a 9th grader trying to get recruited, a college athlete navigating NIL, or a pro planning your next chapter — ATHLYNX is your playbook.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: "Pro Baseball", sub: "Played at the highest level" },
                { label: "18 Roles", sub: "Athlete ecosystem covered" },
                { label: "One Platform", sub: "Start to finish career support" },
              ].map((stat) => (
                <div key={stat.label} className="bg-blue-900/20 border border-blue-800/30 rounded-xl p-4 text-center">
                  <p className="font-bold text-white text-sm">{stat.label}</p>
                  <p className="text-gray-400 text-xs mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6">
                  Join ATHLYNX
                </Button>
              </Link>
              <Link href="/athlete-journey">
                <Button variant="outline" className="border-blue-600/50 text-blue-400 hover:bg-blue-900/30 px-6">
                  See the Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Action Photos */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-center mb-8 text-white">On the Field</h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-2xl">
              <img
                src={ACTION_PHOTOS[actionIdx]}
                alt="Chad Dozier in action"
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
            <button
              onClick={prevAction}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={nextAction}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <div className="flex justify-center gap-2 mt-4">
              {ACTION_PHOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActionIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === actionIdx ? "bg-blue-400 w-6" : "bg-gray-600"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/30 rounded-2xl p-10 text-center mb-20">
          <h2 className="text-3xl font-black text-white mb-4">The Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every athlete — from the unrecruited kid at a small school to the pro managing their brand — deserves a complete support system. ATHLYNX brings together the tools, the people, and the opportunities to make that possible.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { emoji: "🏈", label: "High School Recruiting" },
              { emoji: "🎓", label: "College NIL Deals" },
              { emoji: "🔄", label: "Transfer Portal" },
              { emoji: "🏆", label: "Pro Career & Beyond" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <p className="text-sm text-gray-300 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Photo */}
        <div className="mb-20">
          <div className="max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663028706780/fSlDgRPvyWWGgRQm.png"
              alt="Chad Dozier story"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pb-16">
          <h2 className="text-3xl font-black text-white mb-4">Ready to Write Your Story?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join thousands of athletes already using ATHLYNX to manage their careers, find opportunities, and build their legacy.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-6 rounded-xl">
              Start Free — No Credit Card Required
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
