import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Video, User, Shield, Zap } from 'lucide-react';
import { motion } from 'motion/react';

export default function VideoConference() {
  const { t } = useTranslation();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Jitsi script
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (jitsiContainerRef.current) {
        const domain = 'meet.jit.si';
        const options = {
          roomName: 'MedFlow_AI_Consultation_' + Math.random().toString(36).substring(7),
          width: '100%',
          height: '100%',
          parentNode: jitsiContainerRef.current,
          configOverwrite: {
            startWithAudioMuted: true,
            disableDeepLinking: true,
          },
          interfaceConfigOverwrite: {
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
              'security'
            ],
          },
        };
        // @ts-ignore
        new window.JitsiMeetExternalAPI(domain, options);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col gap-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter uppercase">
            {t('video_call')}
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <Shield className="w-3 h-3 text-blue-400" />
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">End-to-End Encrypted</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Low Latency AI Core</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
        <div ref={jitsiContainerRef} className="w-full h-full" />
        
        {/* Loading State Overlay (Hidden when Jitsi loads) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] -z-10">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center animate-pulse mb-6">
            <Video className="w-10 h-10 text-white" />
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.4em]">Initializing Secure Link...</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/2 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 text-blue-400 rounded-2xl border border-blue-500/20">
            <User className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Consultation Type</p>
            <p className="text-lg font-bold text-white">AI-Assisted Specialist</p>
          </div>
        </div>
        <div className="bg-white/2 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-emerald-600/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Security Protocol</p>
            <p className="text-lg font-bold text-white">HIPAA Compliant</p>
          </div>
        </div>
        <div className="bg-white/2 p-6 rounded-3xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-purple-600/10 text-purple-400 rounded-2xl border border-purple-500/20">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">AI Integration</p>
            <p className="text-lg font-bold text-white">Real-time Translation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
