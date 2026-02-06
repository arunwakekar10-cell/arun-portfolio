import { motion } from 'framer-motion';
import { CheckCircle2, FileText, Database, Bug, Zap, Layers, Globe, ClipboardList } from 'lucide-react';

const responsibilities = [
  {
    icon: FileText,
    title: 'Test Documentation',
    gradient: 'from-emerald-500 to-cyan-500',
    items: [
      'Writing, Reviewing, and Executing Test Cases as per Functional Specifications',
      'Devising all artifacts of testing such as Test Scenarios, Test Cases, Defect Reports, and Test Summary reports',
    ],
  },
  {
    icon: Database,
    title: 'Database Testing',
    gradient: 'from-cyan-500 to-blue-500',
    items: [
      'Used/created SQL queries to perform database testing of the application',
      'Validating data integrity and consistency across systems',
    ],
  },
  {
    icon: Bug,
    title: 'Functional Testing',
    gradient: 'from-blue-500 to-purple-500',
    items: [
      'Performed Functional testing, Integrity testing, Retesting, and Regression testing',
      'Responsible for performing Smoke & Sanity, and Exploratory Testing',
    ],
  },
  {
    icon: Zap,
    title: 'Selenium Automation',
    gradient: 'from-purple-500 to-pink-500',
    items: [
      'Strong Experience in Automating Web Application Testing using Selenium WebDriver with TestNG framework',
      'Writing Test cases using Element locators, WebDriver methods, Java programming features, and TestNG Annotations',
      'Experience in data-driven Testing, cross-browser testing, and Parallel Test execution',
    ],
  },
  {
    icon: Globe,
    title: 'API Testing',
    gradient: 'from-pink-500 to-rose-500',
    items: [
      'Performed API testing to validate functional requirements',
      'Validating RESTful APIs using Postman',
    ],
  },
  {
    icon: Layers,
    title: 'Test Execution & Reporting',
    gradient: 'from-rose-500 to-orange-500',
    items: [
      'Sending test execution reports on a daily and weekly basis',
      'Executing Selenium Test Cases and Reporting defects',
      'Performed regression testing to validate the resolved defects on every build',
    ],
  },
];

export function Responsibilities() {
  return (
    <section id="responsibilities" className="py-24 px-4 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 mb-6"
          >
            <ClipboardList className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Roles & Responsibilities
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Core testing responsibilities and expertise areas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {responsibilities.map((resp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-premium glass rounded-3xl p-6 group"
            >
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${resp.gradient} flex items-center justify-center shadow-lg`}
                >
                  <resp.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{resp.title}</h3>
              </div>
              
              <ul className="space-y-4">
                {resp.items.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex items-start space-x-3 group/item"
                  >
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${resp.gradient} bg-clip-text text-emerald-400 group-hover/item:scale-110 transition-transform`} />
                    <span className="text-slate-300 text-sm leading-relaxed group-hover/item:text-white transition-colors">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Decorative Glow */}
              <div className={`absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-r ${resp.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
