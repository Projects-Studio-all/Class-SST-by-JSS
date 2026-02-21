import { motion } from 'motion/react';
import { Clock, ArrowRight } from 'lucide-react';
import { TimelineEvent } from '../constants';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative py-10">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-amber-200 -translate-x-1/2 hidden md:block" />
      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="flex-1 w-full md:w-1/2 px-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold mb-2">
                  {event.date}
                </span>
                <h4 className="text-lg font-bold text-gray-800 mb-1">{event.event}</h4>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            </div>
            
            <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-amber-500 rounded-full border-4 border-white shadow-md -translate-x-1/2 flex items-center justify-center z-10">
              <Clock size={14} className="text-white" />
            </div>
            
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
