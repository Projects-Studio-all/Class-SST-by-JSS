/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronLeft, 
  Search, 
  HelpCircle, 
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  GitBranch
} from 'lucide-react';
import { SST_DATA, Subject, Chapter } from './constants';
import { SubjectCard } from './components/SubjectCard';
import { Timeline } from './components/Timeline';
import { Flowchart } from './components/Flowchart';
import { MapComponent } from './components/MapComponent';

export default function App() {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedChapter(null);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
  };

  const filteredSubjects = SST_DATA.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.chapters.some(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={handleBackToSubjects}
          >
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
              <GraduationCap className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              SST विजुअल गाइड
            </h1>
          </div>

          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-2 w-96 border border-slate-200 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="विषय या अध्याय खोजें..." 
              className="bg-transparent border-none focus:outline-none ml-2 w-full text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
              क9
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!selectedSubject ? (
            /* Subjects Grid */
            <motion.div
              key="subjects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold border border-indigo-100"
                >
                  <Sparkles size={14} />
                  <span>कक्षा 9 सामाजिक विज्ञान</span>
                </motion.div>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                  इतिहास, भूगोल और राजनीति को <span className="text-indigo-600">देखें और समझें</span>
                </h2>
                <p className="text-slate-600 text-lg">
                  जटिल विषयों को सरल हिंदी, इन्फोग्राफिक्स और टाइमलाइन के माध्यम से आसानी से सीखें।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredSubjects.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    title={subject.title}
                    icon={subject.icon}
                    color={subject.color}
                    onClick={() => setSelectedSubject(subject)}
                  />
                ))}
              </div>
            </motion.div>
          ) : !selectedChapter ? (
            /* Chapters List */
            <motion.div
              key="chapters"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <button 
                onClick={handleBackToSubjects}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
              >
                <ChevronLeft size={20} />
                विषयों पर वापस जाएं
              </button>

              <div className="flex items-center gap-4 mb-8">
                <div className={`${selectedSubject.color} p-4 rounded-2xl text-white shadow-lg`}>
                  <selectedSubject.icon size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{selectedSubject.title}</h2>
                  <p className="text-slate-500">कुल {selectedSubject.chapters.length} अध्याय उपलब्ध हैं</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedSubject.chapters.map((chapter) => (
                  <motion.div
                    key={chapter.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedChapter(chapter)}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-between group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 p-3 rounded-xl group-hover:bg-indigo-50 transition-colors">
                        <BookOpen className="text-slate-400 group-hover:text-indigo-600" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">{chapter.title}</h3>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-full group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <ChevronLeft className="rotate-180" size={20} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Chapter Detail / Infographic View */
            <motion.div
              key="chapter-detail"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-4xl mx-auto space-y-8 pb-20"
            >
              <button 
                onClick={handleBackToChapters}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium"
              >
                <ChevronLeft size={20} />
                अध्यायों पर वापस जाएं
              </button>

              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                {/* Chapter Header */}
                <div className={`${selectedSubject.color} p-8 text-white relative overflow-hidden`}>
                  <div className="relative z-10 space-y-2">
                    <span className="text-white/80 font-medium uppercase tracking-wider text-sm">अध्याय विवरण</span>
                    <h2 className="text-4xl font-black">{selectedChapter.title}</h2>
                  </div>
                  <selectedSubject.icon size={120} className="absolute -right-8 -bottom-8 text-white/10 rotate-12" />
                </div>

                <div className="p-8 space-y-12">
                  {/* Summary Section */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-2 text-indigo-600">
                      <Sparkles size={20} />
                      <h3 className="text-xl font-bold">मुख्य सारांश (Summary)</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedChapter.summary.map((point, i) => (
                        <div key={i} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                          <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={18} />
                          <p className="text-slate-700 leading-relaxed">{point}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Visual Components based on content */}
                  {selectedChapter.timeline && (
                    <section className="space-y-4">
                      <div className="flex items-center gap-2 text-amber-600">
                        <Clock size={20} />
                        <h3 className="text-xl font-bold">महत्वपूर्ण घटनाक्रम (Timeline)</h3>
                      </div>
                      <Timeline events={selectedChapter.timeline} />
                    </section>
                  )}

                  {selectedChapter.flowchart && (
                    <section className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-600">
                        <GitBranch size={20} />
                        <h3 className="text-xl font-bold">प्रक्रिया चार्ट (Flowchart)</h3>
                      </div>
                      <Flowchart nodes={selectedChapter.flowchart} />
                    </section>
                  )}

                  {selectedSubject.id === 'geography' && (
                    <section className="space-y-4">
                      <MapComponent data={selectedChapter.mapData} />
                    </section>
                  )}

                  {selectedChapter.comparison && (
                    <section className="space-y-4">
                      <div className="flex items-center gap-2 text-blue-600">
                        <AlertCircle size={20} />
                        <h3 className="text-xl font-bold">{selectedChapter.comparison.title}</h3>
                      </div>
                      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                        <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="p-4 font-bold text-slate-900 border-b border-slate-200">{selectedChapter.comparison.col1}</th>
                              <th className="p-4 font-bold text-slate-900 border-b border-slate-200">{selectedChapter.comparison.col2}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedChapter.comparison.rows.map((row, i) => (
                              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-4 border-b border-slate-100 text-slate-700">{row[0]}</td>
                                <td className="p-4 border-b border-slate-100 text-slate-700">{row[1]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </section>
                  )}

                  {/* Keywords Section */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">महत्वपूर्ण शब्द (Keywords)</h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedChapter.keywords.map((kw, i) => (
                        <div key={i} className="group relative">
                          <div className="bg-white border border-slate-200 px-4 py-2 rounded-full cursor-help hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                            <span className="font-bold text-indigo-600">{kw.word}</span>
                          </div>
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-slate-900 text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-20">
                            {kw.meaning}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Quick Revision */}
                  <section className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-200">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Sparkles size={20} />
                      त्वरित पुनरावृत्ति (Quick Revision)
                    </h3>
                    <ul className="space-y-3">
                      {selectedChapter.quickRevision.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="bg-white/20 p-1 rounded mt-1">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="text-indigo-50 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-white">
            <GraduationCap size={32} />
            <span className="text-2xl font-black">SST विजुअल गाइड</span>
          </div>
          <p className="max-w-md mx-auto">कक्षा 9 के छात्रों के लिए एक आधुनिक और इंटरैक्टिव शिक्षण मंच।</p>
          <div className="pt-8 border-t border-slate-800 text-sm">
            © 2026 विजुअल इन्फोग्राफिक्स प्रोजेक्ट | हिंदी माध्यम के छात्रों के लिए समर्पित
          </div>
        </div>
      </footer>
    </div>
  );
}
