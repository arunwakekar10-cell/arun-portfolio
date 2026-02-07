import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, Calendar, Building, Sparkles } from 'lucide-react';

const education = {
  degree: 'Bachelor of Engineering (B.E)',
  university: 'Savitribai Phule Pune University',
  college: 'Sir Visvesvaraya Institute of Technology, Nashik',
  year: '2020',
};

const certifications = [
  {
    title: 'Certified Tester Foundation Level (CTFL) v4.0',
    institute: 'ISTQB®',
    description: 'ISTQB - is the leading global certification scheme in the field of software testing. Enhance your skills and career opportunities today.',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    title: 'Selenium Certification',
    institute: 'Naresh IT (Hyderabad)',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    title: 'Core Java Certification',
    institute: 'Naresh IT (Hyderabad)',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Generative AI Mastermind',
    institute: 'Outskill',
    description: 'Completed hands-on program covering Generative AI fundamentals, practical applications, and AI-powered automation for real-world use cases.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export function Education() {
  return (
    <section id="education" className="py-24 px-4 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 mb-6"
          >
            <GraduationCap className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Academic foundation and professional certifications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium glass rounded-3xl p-8 group h-fit"
          >
            <div className="flex items-center space-x-4 mb-8">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/25"
              >
                <GraduationCap className="w-10 h-10 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
                <p className="text-slate-400">Academic Background</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 glass-light rounded-2xl"
              >
                <BookOpen className="w-6 h-6 text-emerald-400 mt-1" />
                <div>
                  <p className="text-white font-semibold text-lg">{education.degree}</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 glass-light rounded-2xl"
              >
                <Building className="w-6 h-6 text-cyan-400 mt-1" />
                <div>
                  <p className="text-white font-medium">{education.university}</p>
                  <p className="text-slate-400 text-sm mt-1">{education.college}</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 p-4 glass-light rounded-2xl"
              >
                <Calendar className="w-6 h-6 text-blue-400 mt-1" />
                <p className="text-white font-medium">Class of {education.year}</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Award className="w-7 h-7 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white">Certifications</h3>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="card-premium glass rounded-2xl p-5 group cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="text-white font-semibold group-hover:text-gradient-animated transition-all">
                      {cert.title}
                    </h4>
                    <p className={`bg-gradient-to-r ${cert.gradient} bg-clip-text text-transparent text-sm font-medium`}>
                      {cert.institute}
                    </p>
                    {cert.description && (
                      <p className="text-slate-400 text-sm mt-2 leading-relaxed">{cert.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
