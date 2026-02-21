import { useState } from 'react';
import { motion } from 'motion/react';
import { Map as MapIcon, Info } from 'lucide-react';
import { MapData } from '../constants';

interface MapComponentProps {
  data?: MapData;
}

export function MapComponent({ data }: MapComponentProps) {
  const [imageError, setImageError] = useState(false);
  const defaultTitle = "भारत का वास्तविक मानचित्र (Realistic Guide)";
  const points = data?.points || [
    { x: 200, y: 100, label: "हिमालय पर्वतमाला", color: "#ef4444" },
    { x: 150, y: 250, label: "थार मरुस्थल", color: "#f59e0b" },
    { x: 250, y: 250, label: "गंगा का मैदान", color: "#10b981" }
  ];

  // Convert 400x450 coordinates to percentages for the realistic map overlay
  const getPos = (val: number, max: number) => `${(val / max) * 100}%`;

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-xl">
          <MapIcon className="text-white" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black text-slate-800">{data?.title || defaultTitle}</h3>
          <p className="text-slate-500 text-sm">भौगोलिक स्थितियों का सटीक चित्रण</p>
        </div>
      </div>
      
      <div className="relative aspect-[4/5] md:aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 shadow-inner group">
        {/* SVG Fallback (Always present but hidden if image loads) */}
        <div className={`absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-500 ${imageError ? 'opacity-100' : 'opacity-0'}`}>
          <svg viewBox="0 0 400 450" className="w-full h-full max-w-md drop-shadow-lg">
            <path
              d="M175,20 L185,15 L195,20 L205,40 L220,60 L245,70 L265,100 L275,140 L310,180 L330,190 L340,210 L330,230 L310,230 L290,250 L250,330 L200,430 L150,330 L110,250 L85,210 L95,180 L125,160 L135,110 L155,70 L175,20 Z"
              fill="#e0f2fe"
              stroke="#0284c7"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <text x="200" y="225" textAnchor="middle" className="text-[8px] fill-blue-400 font-bold opacity-50">REALISTIC SVG FALLBACK</text>
          </svg>
        </div>

        {/* Realistic Physical Map Image */}
        {!imageError && (
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/India_physical_map.png/800px-India_physical_map.png" 
            alt="India Physical Map"
            className="absolute inset-0 w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src === "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/India_physical_map.png/800px-India_physical_map.png") {
                target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/India_physical_map.svg/1024px-India_physical_map.svg.png";
              } else {
                setImageError(true);
              }
            }}
          />
        )}
        
        {/* Overlay Grid for better location sense */}
        <div className="absolute inset-0 pointer-events-none border border-slate-200/20 grid grid-cols-10 grid-rows-10">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-slate-300/10" />
          ))}
        </div>

        {/* Interactive Points Overlay */}
        <div className="absolute inset-0">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              style={{ 
                left: getPos(point.x, 400), 
                top: getPos(point.y, 450) 
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/point"
            >
              <div className="relative">
                {/* Pulsing effect */}
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: point.color }}
                />
                
                {/* Main point */}
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer relative z-10"
                  style={{ backgroundColor: point.color }}
                />

                {/* Tooltip/Label */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-slate-900 text-white text-[10px] md:text-xs px-2 py-1 rounded-lg opacity-0 group-hover/point:opacity-100 transition-opacity pointer-events-none shadow-xl border border-white/20">
                  {point.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {points.map((point, index) => (
          <div key={index} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100 hover:bg-white hover:shadow-sm transition-all">
            <div className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ backgroundColor: point.color }} />
            <span className="text-xs font-bold text-slate-700 truncate">{point.label}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
        <Info size={14} className="mt-0.5 shrink-0" />
        <p>यह मानचित्र भारत की वास्तविक भौगोलिक संरचना को दर्शाता है। बिंदुओं पर होवर (Hover) करके आप विशिष्ट स्थानों की जानकारी प्राप्त कर सकते हैं।</p>
      </div>
    </div>
  );
}
