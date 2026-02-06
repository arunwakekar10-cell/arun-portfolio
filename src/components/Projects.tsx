import { motion } from 'framer-motion';
import { Newspaper, Truck, Smartphone, Monitor, CheckCircle, Settings, FolderKanban, Globe, Package, Printer, Ship, Shield, Users2, MessageSquare } from 'lucide-react';

const projects = [
  {
    title: 'Global Digital Newspaper Platform',
    subtitle: 'News & Media Domain',
    icon: Newspaper,
    gradient: 'from-emerald-500 to-cyan-500',
    description: 'Worked on a global digital newspaper platform encompassing regional newspapers from Australia, Germany, UK, and USA, delivering e-papers, magazines, and articles to a diverse user base.',
    highlights: [
      'Validated essential features such as bookmarking articles, sharing content, and managing multiple editions',
      'Conducted extensive accessibility testing for compatibility with different devices, browsers, and versions',
      'Utilized BrowserStack to simulate various environments and user scenarios',
      'Implemented automation scripts using Selenium, Appium, and TestSigma',
      'Used Google Analytics and Charles Proxy to debug and monitor real-time user interactions',
      'Tested iOS TestFlight builds for pre-release validation',
      'Performed smoke and regression testing under Agile methodologies with CI/CD integration',
    ],
    technologies: ['Selenium', 'Appium', 'TestSigma', 'BrowserStack', 'Google Analytics', 'Charles Proxy', 'TestFlight'],
    platforms: [
      { name: 'Android', icon: Smartphone },
      { name: 'iOS', icon: Smartphone },
      { name: 'Web', icon: Monitor },
    ],
  },
  {
    title: 'Printing & Fleet Management System',
    subtitle: 'Printing & Logistics Domain',
    icon: Truck,
    gradient: 'from-cyan-500 to-blue-500',
    description: 'Designed and implemented automation testing frameworks for a comprehensive Printing and Logistics management solution.',
    modules: [
      { name: 'Order Processing', desc: 'Testing order entry validation, status tracking, and order accuracy verification', icon: Package },
      { name: 'Print Job Management', desc: 'Verifying print job specifications, completeness of print data, and workflow validation', icon: Printer },
      { name: 'Inventory Management', desc: 'Validating inventory levels accuracy, stock replenishment, and reporting', icon: Package },
      { name: 'Shipping & Distribution', desc: 'Testing shipping order accuracy, label generation, and distribution routes', icon: Ship },
      { name: 'Quality Control', desc: 'Ensuring print inspection, color accuracy, and adherence to industry standards', icon: Shield },
      { name: 'Supplier Management', desc: 'Validating supplier data, contracts, and procurement coordination', icon: Users2 },
      { name: 'Customer Communication', desc: 'Order updates, delivery notifications, and customer data validation', icon: MessageSquare },
      { name: 'Regulatory Compliance', desc: 'Compliance with printing regulations and environmental standards', icon: Globe },
    ],
    technologies: ['Selenium', 'Appium', 'Cucumber BDD', 'Jenkins', 'Jira', 'Postman'],
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 px-4 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
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
            <FolderKanban className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Key projects showcasing testing expertise across diverse domains
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Project 1 - News Platform */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium glass rounded-3xl overflow-hidden group"
          >
            {/* Header with gradient bar */}
            <div className={`h-2 bg-gradient-to-r ${projects[0].gradient}`} />
            
            <div className="p-8 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="flex items-start space-x-5">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${projects[0].gradient} flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/25`}
                  >
                    <Newspaper className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gradient-animated transition-all">
                      {projects[0].title}
                    </h3>
                    <p className={`bg-gradient-to-r ${projects[0].gradient} bg-clip-text text-transparent font-semibold text-lg`}>
                      {projects[0].subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
                  {projects[0].platforms?.map((platform, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 glass-light text-emerald-400 text-sm rounded-full flex items-center font-medium"
                    >
                      <platform.icon className="w-4 h-4 mr-2" />
                      {platform.name}
                    </motion.span>
                  ))}
                </div>
              </div>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">{projects[0].description}</p>

              <div className="mb-8">
                <h4 className="text-white font-semibold mb-6 flex items-center text-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-400 mr-3" />
                  Key Highlights
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {projects[0].highlights?.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * idx }}
                      className="flex items-start space-x-3 p-3 glass-light rounded-xl hover:bg-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">{highlight}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Settings className="w-5 h-5 text-cyan-400 mr-2" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {projects[0].technologies?.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-4 py-2 rounded-full bg-gradient-to-r ${projects[0].gradient} text-white text-sm font-medium shadow-lg`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 2 - Printing & Fleet */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-premium glass rounded-3xl overflow-hidden group"
          >
            {/* Header with gradient bar */}
            <div className={`h-2 bg-gradient-to-r ${projects[1].gradient}`} />
            
            <div className="p-8 md:p-10">
              <div className="flex items-start space-x-5 mb-8">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${projects[1].gradient} flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/25`}
                >
                  <Truck className="w-8 h-8 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-gradient-animated transition-all">
                    {projects[1].title}
                  </h3>
                  <p className={`bg-gradient-to-r ${projects[1].gradient} bg-clip-text text-transparent font-semibold text-lg`}>
                    {projects[1].subtitle}
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-lg mb-8 leading-relaxed">{projects[1].description}</p>

              <div className="mb-8">
                <h4 className="text-white font-semibold mb-6 flex items-center text-lg">
                  <FolderKanban className="w-6 h-6 text-cyan-400 mr-3" />
                  Tested Modules
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {projects[1].modules?.map((module, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * idx }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="glass-light rounded-2xl p-5 hover:bg-white/10 transition-all group/card"
                    >
                      <module.icon className="w-8 h-8 text-cyan-400 mb-3 group-hover/card:scale-110 transition-transform" />
                      <h5 className="text-white font-semibold mb-2">{module.name}</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">{module.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <Settings className="w-5 h-5 text-cyan-400 mr-2" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {projects[1].technologies?.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-4 py-2 rounded-full bg-gradient-to-r ${projects[1].gradient} text-white text-sm font-medium shadow-lg`}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
