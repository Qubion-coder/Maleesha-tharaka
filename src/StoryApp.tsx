import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Volume2, VolumeX } from 'lucide-react';
import RSVPForm from './RSVPForm'; // We'll extract RSVPForm
import WishesForm from './WishesForm';

function SectionBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <img
        src="/white_roses_bg.png"
        alt="White Roses"
        className="w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/60" />
    </div>
  );
}

const galleryImages = [
  "/PRE/WhatsApp Image 2026-10-04 at 10.11.10.jpeg",
  "/PRE/WhatsApp Image 2026-10-04 at 10.15.22.jpeg",
  "/PRE/WhatsApp Image 2026-10-04 at 10.15.23.jpeg",
  "/PRE/WhatsApp Image 2026-10-04 at 10.15.24.jpeg",
  "/PRE/WhatsApp Image 2026-10-04 at 10.15.25.jpeg",
  "/PRE/WhatsApp Image 2026-10-04 at 10.15.26.jpeg",
  "/PRE/WhatsApp Image 2026-10-04 at 10.15.27.jpeg",
];

export default function StoryApp() {
  const [invitationOpened, setInvitationOpened] = useState(false);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2026-11-05T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (invitationOpened && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [invitationOpened]);



  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Read personalized guest link params
  let guestName = '';
  const rawPathName = window.location.pathname.substring(1).replace(/\/$/, '');
  if (rawPathName && rawPathName.toLowerCase() !== 'confirm' && rawPathName.toLowerCase() !== 'admin') {
    guestName = decodeURIComponent(rawPathName);
  }

  return (
    <>
      <AnimatePresence>
        {!invitationOpened && (
          <motion.div
            key="invitation-opened"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="fixed inset-0 z-[200] bg-[#FAFAFA] flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img
                src="/white_roses_bg.png"
                alt="White Roses"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="z-10 flex flex-col items-center gap-8"
            >
              <h1 className="script text-6xl sm:text-7xl text-[#2C2C2C] drop-shadow-sm font-normal text-center px-4">
                Maleesha <span className="text-[#8B7355] text-5xl">&amp;</span> Tharaka
              </h1>
              <p className="text-sm uppercase tracking-[0.3em] text-[#2C2C2C] font-medium text-center">
                Wedding Invitation
              </p>

              <button
                onClick={() => setInvitationOpened(true)}
                className="mt-8 px-8 py-3 bg-[#3D2B1F] text-white rounded-full text-sm uppercase tracking-widest hover:bg-[#8B7355] transition-colors duration-300 shadow-lg shadow-black/10"
              >
                View Invitation
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {invitationOpened && !introPlayed && (
          <motion.div
            key="intro-video"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
            <video
              src="/snaptik_7626793615695777044_v3 (online-video-cutter.com).mp4"
              autoPlay
              muted
              playsInline
              controls={false}
              onEnded={() => setIntroPlayed(true)}
              className="w-full h-full object-cover pointer-events-none"
            />

            <button
              onClick={() => setIntroPlayed(true)}
              className="absolute bottom-10 px-6 py-2 bg-black/40 backdrop-blur-md text-white/90 rounded-full border border-white/20 text-sm tracking-[0.2em] uppercase transition-all hover:bg-white/20 z-10"
            >
              Skip Intro
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="snap-container no-scrollbar bg-paper relative text-[#3D2B1F] font-sans">



        {/* --- SCREEN 1: Invite Details --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-transparent">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-sm flex flex-col items-center justify-center text-[#3D2B1F]"
              >


                {guestName ? (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mb-6 flex flex-col items-center"
                  >
                    <p className="text-[12px] sm:text-sm uppercase tracking-[0.2em] font-bold text-[#8B7355] mb-4">
                      WE CORDIALLY INVITE
                    </p>
                    <p className="script text-4xl sm:text-5xl text-[#3D2B1F] drop-shadow-sm mb-4 text-center px-4">
                      {guestName}
                    </p>
                    <div className="h-px w-16 bg-[#3D2B1F]/50 mb-6"></div>
                    <p className="text-[12px] sm:text-sm uppercase tracking-[0.2em] font-medium text-[#2C2C2C] mb-2 sm:mb-4">
                      TO CELEBRATE OUR
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-[12px] sm:text-sm uppercase tracking-[0.2em] font-medium text-[#2C2C2C] mb-1">
                      INVITE YOU TO CELEBRATE
                    </p>
                    <p className="text-[12px] sm:text-sm uppercase tracking-[0.2em] font-medium text-[#2C2C2C] mb-2 sm:mb-4">
                      OUR
                    </p>
                  </>
                )}

                <h1 className="script text-7xl sm:text-[5.5rem] text-[#2C2C2C] mb-8 sm:mb-12 drop-shadow-sm font-normal">
                  Wedding
                </h1>

                <div className="flex flex-col items-center w-full mb-8 sm:mb-10">
                  <p className="text-[13px] sm:text-[15px] uppercase tracking-widest text-[#2C2C2C] font-bold mb-2">NOVEMBER</p>
                  <div className="flex items-center justify-center w-full gap-4">
                    <div className="flex-1 text-right border-y border-[#2C2C2C]/30 py-2">
                      <p className="text-[12px] sm:text-sm uppercase tracking-widest text-[#2C2C2C] font-bold">THURSDAY</p>
                    </div>
                    <p className="serif text-7xl sm:text-[4.5rem] font-medium text-[#2C2C2C] leading-none px-1">05</p>
                    <div className="flex-1 text-left border-y border-[#2C2C2C]/30 py-2">
                      <p className="text-[12px] sm:text-sm uppercase tracking-widest text-[#2C2C2C] font-bold">AT 09:00 AM</p>
                    </div>
                  </div>
                  <p className="text-[13px] sm:text-[15px] uppercase tracking-widest text-[#2C2C2C] font-bold mt-2">2026</p>
                </div>

                <a
                  href="https://maps.app.goo.gl/G1Yrj9ioJHhngqst6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="space-y-2 mt-2 sm:mt-4 text-[#2C2C2C] hover:opacity-70 transition-opacity block"
                >
                  <p className="text-[12px] sm:text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-1.5">
                    <MapPin size={12} className="text-[#8B7355]" />
                    THE REGENT BALLROOM
                  </p>
                  <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] font-medium">EARL'S REGENCY</p>
                  <p className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] font-medium px-4">KANDY</p>
                </a>

                <div className="mt-8 sm:mt-10">
                  <p className="text-[12px] sm:text-sm uppercase tracking-[0.15em] font-bold text-[#2C2C2C]">RECEPTION TO FOLLOW</p>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-center">
                  <svg className="w-10 h-10 text-[#2C2C2C]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 12c-1.5-1-2-2-2-4v-4l6-2v6c0 2-.5 3-2 4M9 12c1.5-1 2-2 2-4v-4l-6-2v6c0 2 .5 3 2 4M13 12v8M11 12v8M9 20h6" />
                    <circle cx="15.5" cy="5.5" r="0.5" fill="currentColor" />
                    <circle cx="14" cy="7.5" r="0.5" fill="currentColor" />
                    <circle cx="8.5" cy="5.5" r="0.5" fill="currentColor" />
                    <circle cx="10" cy="7.5" r="0.5" fill="currentColor" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 1.5: Parents --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 pt-16 rounded-t-[10rem] rounded-b-[2rem] border border-[#EAE1D3] w-full max-w-sm flex flex-col items-center shadow-xl relative overflow-hidden"
              >
                {/* Subtle texture overlay on the card */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="script text-6xl text-[#C8B29E] mb-3">Together with</h2>
                  <h3 className="serif text-[13px] uppercase tracking-[0.3em] text-[#3D2B1F] mb-10 font-bold">Our Families</h3>

                  <div className="flex flex-col items-center w-full mb-8">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-3 font-bold">Bride's Parents</p>
                    <p className="serif text-xl text-[#2C2C2C] leading-relaxed text-center">Mr. &amp; Mrs. Dharmapala</p>
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-3 w-3/4 mx-auto mb-8">
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#C8B29E]"></div>
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-3 font-bold">Groom's Parents</p>
                    <p className="serif text-xl text-[#2C2C2C] leading-relaxed text-center">(Late) Mr. Jayathilake &amp; Mrs. Jayathilake</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 1.75: Countdown --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-10 pt-16 rounded-t-[10rem] rounded-b-[2rem] border border-[#EAE1D3] w-full max-w-sm flex flex-col items-center shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 w-full flex flex-col items-center text-center">
                  <h2 className="script text-6xl text-[#C8B29E] mb-3">Forever Begins In</h2>
                  <h3 className="serif text-[13px] uppercase tracking-[0.3em] text-[#3D2B1F] mb-10 font-bold">A Grace-filled occasion</h3>

                  <div className="flex flex-row items-center justify-center gap-6 w-full mb-8">
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#2C2C2C] leading-none mb-2">{timeLeft.days}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Days</p>
                    </div>
                    <div className="text-4xl text-[#C8B29E] font-light -mt-4">:</div>
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#2C2C2C] leading-none mb-2">{timeLeft.hours}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Hours</p>
                    </div>
                  </div>

                  {/* Elegant Divider */}
                  <div className="flex items-center justify-center gap-3 w-3/4 mx-auto mb-8">
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#C8B29E]"></div>
                    <div className="h-px bg-[#EAE1D3] flex-1"></div>
                  </div>

                  <div className="flex flex-row items-center justify-center gap-6 w-full">
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#2C2C2C] leading-none mb-2">{timeLeft.minutes}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Mins</p>
                    </div>
                    <div className="text-4xl text-[#C8B29E] font-light -mt-4">:</div>
                    <div className="flex flex-col items-center">
                      <p className="serif text-5xl text-[#2C2C2C] leading-none mb-2">{timeLeft.seconds}</p>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-bold">Secs</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* --- SCREEN 1.8: Couple Image --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-white rounded-t-[2.5rem]">
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center justify-start text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-[65dvh] shrink-0 relative"
            >
              <img alt="Couple" className="w-full h-full object-cover object-top" src="/WhatsApp Image 2026-10-04 at 21.30.59.jpeg" />
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="flex-1 w-full flex flex-col items-center justify-start text-center pt-2 pb-12 z-20 bg-white"
            >
              <h2 className="serif text-6xl md:text-7xl text-[#2C2C2C] font-normal leading-none mt-4">MALEESHA</h2>
              <span className="script text-5xl md:text-6xl text-[#2C2C2C] my-1 opacity-80">and</span>
              <h2 className="serif text-6xl md:text-7xl text-[#2C2C2C] font-normal leading-none">THARAKA</h2>
            </motion.div>
          </div>
        </section>

        {/* --- SCREEN 2: Our Story --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/60 w-full max-w-sm flex flex-col items-center shadow-lg text-center"
              >
                <h2 className="script text-5xl text-[#8B7355] mb-6">Our Story</h2>
                
                <div className="space-y-4 text-[#3D2B1F] text-[13px] md:text-[14px] leading-relaxed font-medium">
                  <p>
                    From the moment our paths crossed, our beautiful journey began.
                  </p>
                  <p>
                    Through laughter and love, we have grown together and cherished every moment.
                  </p>
                  <p>
                    Now, as we begin this new chapter, we look forward to a lifetime of memories together.
                  </p>
                  <p className="font-bold pt-4 text-[#8B7355] uppercase tracking-widest text-[11px]">
                    Join us as we step into forever
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 3: Gallery --- */}
        <section className="snap-section relative z-10 overflow-hidden bg-[#FAF7F2] flex flex-col justify-center">
          <SectionBackground />
          <div className="absolute inset-0 flex flex-col items-center justify-center py-10 z-20">
            <h2 className="script text-6xl text-[#8B7355] mb-8 text-center drop-shadow-sm">Gallery</h2>
            <div className="w-full relative overflow-hidden flex whitespace-nowrap">
              {/* Fade masks for smooth edges */}
              <div className="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
              <div className="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
              
              <motion.div
                className="flex gap-4 px-4 w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  repeat: Infinity,
                  ease: "linear",
                  duration: 25
                }}
              >
                {/* Double the array for a seamless infinite loop */}
                {[...galleryImages, ...galleryImages].map((src, index) => (
                  <div key={index} className="w-56 h-80 sm:w-64 sm:h-96 shrink-0 rounded-2xl overflow-hidden shadow-xl border-4 border-white/80">
                    <img src={src} alt="Gallery image" className="w-full h-full object-cover object-center" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 4: Timeline --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 w-full max-w-sm flex flex-col items-center shadow-lg py-12"
              >
                <h2 className="serif text-4xl tracking-[0.2em] text-[#3D2B1F] font-medium uppercase mb-2">
                  Wedding
                </h2>
                <h3 className="script text-5xl text-[#8B7355] mb-10">
                  Timeline
                </h3>

                <div className="flex flex-col gap-6 w-full relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-300 -translate-x-1/2" />

                  {([
                    { time: "09:00 AM", title: "GUEST ARRIVALS" },
                    { time: "10:14 AM", title: "PORUWA CEREMONY" },
                    { time: "01:00 PM", title: "LUNCH" },
                    { time: "04:00 PM", title: "GOING AWAY" },
                  ] as { time: string; title: string; sub?: string }[]).map((item, idx) => (
                    <div key={idx} className="relative z-10 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-white shadow-sm w-[85%] mx-auto">
                      <p className="text-[13px] font-bold text-[#8B7355] mb-1">{item.time}</p>
                      <p className="text-[12px] uppercase tracking-widest text-[#3D2B1F] font-semibold">{item.title}</p>
                      {item.sub && <p className="serif text-[12px] italic text-zinc-500 mt-1">{item.sub}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 5: The Details --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full max-w-sm flex flex-col gap-4"
              >
                <div className="bg-[#FAF7F2] p-8 rounded-[2rem] shadow-md border border-white">
                  <h3 className="script text-4xl text-[#8B7355] mb-1">the</h3>
                  <h2 className="serif text-4xl tracking-[0.2em] text-[#3D2B1F] font-medium uppercase mb-6">Details</h2>

                  <div className="w-full mb-6 rounded-xl overflow-hidden shadow-sm">
                    <img 
                      src="/WhatsApp Image 2026-10-03 at 21.54.11.jpeg" 
                      alt="Hotel" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="bg-[#EAE1D3] py-2 rounded-t-xl mb-1">
                    <p className="text-[12px] uppercase tracking-[0.2em] font-bold text-[#8B7355]">Location</p>
                  </div>
                  <div className="bg-white py-4 rounded-b-xl shadow-sm border border-white mb-4 flex flex-col items-center">
                    <p className="text-[12px] uppercase font-bold text-[#3D2B1F]">The Regent Ballroom</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">Earl's Regency</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-3 px-2 text-center">Kandy</p>
                    <a
                      href="https://maps.app.goo.gl/G1Yrj9ioJHhngqst6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#EAE1D3] text-[#3D2B1F] rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[#C8B29E] transition-colors"
                    >
                      <MapPin size={10} />
                      Live Location
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 6: RSVP --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#EAE1D3] w-full max-w-sm min-h-[80vh] h-auto flex flex-col justify-center items-center shadow-xl"
              >
                <div className="flex items-center justify-center gap-3 w-[60%] mx-auto mb-10 mt-4 md:mt-0">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <p className="serif text-[13px] uppercase tracking-[0.2em] font-medium text-[#2C2C2C]">PLEASE</p>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>

                <div className="relative mb-12 w-[85%] max-w-[260px]">
                  <img src="/floral_rsvp.png" alt="RSVP" className="w-full h-auto object-contain mix-blend-multiply" />
                </div>

                <p className="serif text-[13px] sm:text-[15px] uppercase tracking-[0.15em] font-bold text-[#2C2C2C] mb-2">
                  BY NOVEMBER 1, 2026
                </p>


                <div className="w-full">
                  <RSVPForm />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- SCREEN 7: Wishes --- */}
        <section className="snap-section relative z-10 overflow-hidden">
          <SectionBackground />
          <div className="absolute inset-0 overflow-y-auto no-scrollbar flex flex-col items-center p-6 text-center">
            <div className="w-full my-auto flex flex-col items-center justify-center py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-[#EAE1D3] w-full max-w-sm h-auto flex flex-col justify-center items-center shadow-xl"
              >
                <div className="flex items-center justify-center gap-3 w-[60%] mx-auto mb-6 mt-4 md:mt-0">
                  <div className="h-px bg-zinc-300 flex-1"></div>
                  <p className="serif text-[13px] uppercase tracking-[0.2em] font-medium text-[#2C2C2C]">GUEST BOOK</p>
                  <div className="h-px bg-zinc-300 flex-1"></div>
                </div>

                <h3 className="script text-5xl text-[#C8B29E] mb-6">Leave a Wish</h3>

                <p className="serif text-[13px] sm:text-[15px] text-[#2C2C2C] mb-8 leading-relaxed">
                  We'd love to hear from you! Please leave your wishes, advice, or a simple hello for us.
                </p>

                <div className="w-full">
                  <WishesForm />
                </div>
              </motion.div>

              <div className="mt-10 mb-8 w-full text-center z-20 relative">
                <p className="text-[#3D2B1F] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] text-[10px] font-sans tracking-widest uppercase leading-relaxed font-semibold">
                  Want a beautiful wedding website like this? <br />
                  Create yours with <a target="_blank" rel="noreferrer" className="text-[#8B7355] hover:text-[#3D2B1F] font-bold underline decoration-[#8B7355] underline-offset-4 transition-colors" href="https://wa.me/94707819074">invitemint</a>
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Audio and Play Button */}
      <audio
        ref={audioRef}
        src="/Alex warren - Ordinary (1).mp3"
        loop
      />
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-[60] p-3 rounded-full shadow-lg transition-all ${isPlaying ? 'bg-[#C8B29E] text-white' : 'bg-white/80 backdrop-blur-sm text-[#8B7355] border border-[#EAE1D3]'
          }`}
        aria-label="Toggle music"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
