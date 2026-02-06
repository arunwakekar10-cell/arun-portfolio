import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle, Building2 } from 'lucide-react';

const experiences = [
  {
    company: 'Pagesuite India Pvt Ltd',
    role: 'Quality Analyst',
    period: 'Sep 2024 - Present',
    location: 'India',
    gradient: 'from-emerald-500 to-cyan-500',
    responsibilities: [
      'Conducted extensive functional and regression testing on the e-paper, magazine, and article modules.',
      'Ensured seamless user experience by validating core functionalities such as bookmarking articles, sharing articles, and managing editions.',
      'Developed and executed automation scripts using TestSigma, Selenium, and Appium to streamline testing processes.',
      'Performed smoke testing to validate builds and ensure application stability for daily releases.',
      'Used Google Analytics and Charles Proxy to monitor user behavior and debug issues related to user interactions and API calls.',
      'Tested iOS applications using TestFlight builds and provided detailed reports on app performance and compatibility.',
      'Utilized BrowserStack to perform manual testing across different browsers and ensure consistent application behavior.',
      'Played a key role in identifying and reporting critical issues in daily newspaper apps and web portals.',
    ],
  },
  {
    company: 'Sankey Business Solutions Pvt Ltd',
    role: 'Automation and Manual Tester',
    period: 'Nov 2022 - Sep 2024',
    location: 'India',
    gradient: 'from-cyan-500 to-blue-500',
    responsibilities: [
      'Designed and implemented automation testing frameworks for the Printing and Logistics Domain.',
      'Functional testing on Web-Application.',
      'Monitor operating environment, apply performance tuning, and develop capacity plans for testing.',
      'Actively participating in all phases of product testing, including planning and delivery recommendations on mobile applications & Web.',
      'Led testing efforts for print management software, ensuring accurate and efficient document processing.',
      'Collaborated with logistics teams to validate software solutions that optimize supply chain processes.',
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 px-4 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 mb-6"
          >
            <Briefcase className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Building expertise in quality assurance across diverse domains
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-cyan-500 to-transparent hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 top-8 w-4 h-4 -translate-x-1/2 hidden md:block">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.gradient}`} />
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${exp.gradient} animate-ping opacity-50`} />
                </div>

                <div className="md:ml-20 card-premium glass rounded-3xl p-8 group">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <Building2 className="w-7 h-7 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-white group-hover:text-gradient-animated transition-all">
                          {exp.role}
                        </h3>
                        <p className={`bg-gradient-to-r ${exp.gradient} bg-clip-text text-transparent font-semibold text-lg`}>
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 lg:mt-0">
                      <div className="flex items-center text-slate-400 text-sm glass-light px-4 py-2 rounded-full">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-400" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-slate-400 text-sm glass-light px-4 py-2 rounded-full">
                        <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                        {exp.location}
                      </div>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {exp.responsibilities.map((resp, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                        className="flex items-start space-x-3 group/item"
                      >
                        <div className="mt-1">
                          <CheckCircle className={`w-5 h-5 text-emerald-400 group-hover/item:scale-110 transition-transform`} />
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                          {resp}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
