import { motion } from 'motion/react';
import { GitBranch, ArrowDown } from 'lucide-react';
import { FlowNode } from '../constants';

interface FlowchartProps {
  nodes: FlowNode[];
}

export function Flowchart({ nodes }: FlowchartProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      {nodes.map((node, index) => (
        <div key={index} className="flex flex-col items-center w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="w-full bg-emerald-50 border-2 border-emerald-200 p-4 rounded-xl shadow-sm hover:bg-emerald-100 transition-colors"
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="bg-emerald-500 p-1.5 rounded-lg">
                <GitBranch size={16} className="text-white" />
              </div>
              <h4 className="font-bold text-emerald-800">{node.title}</h4>
            </div>
            <p className="text-emerald-700 text-sm pl-9">{node.description}</p>
          </motion.div>
          
          {index < nodes.length - 1 && (
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="my-2 text-emerald-300"
            >
              <ArrowDown size={24} />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
