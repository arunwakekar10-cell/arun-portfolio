import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  TestTube, Cog, Code, Database, 
  GitBranch, Zap, Monitor, CheckCircle2
} from 'lucide-react';

export function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const tools = [
    { name: 'Selenium', color: 'from-green-400 to-green-600' },
    { name: 'Appium', color: 'from-purple-400 to-purple-600' },
    { name: 'Playwright', color: 'from-green-500 to-emerald-600' },
    { name: 'PostgreSQL', color: 'from-blue-400 to-blue-600' },
    { name: 'MySQL', color: 'from-orange-400 to-orange-600' },
    { name: 'Java', color: 'from-red-400 to-red-600' },
    { name: 'TypeScript', color: 'from-blue-500 to-blue-700' },
    { name: 'JavaScript', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Cucumber', color: 'from-green-500 to-lime-600' },
    { name: 'Jira', color: 'from-blue-500 to-blue-700' },
    { name: 'Postman', color: 'from-orange-500 to-orange-700' },
    { name: 'Jenkins', color: 'from-red-500 to-red-700' },
    { name: 'Git', color: 'from-orange-600 to-red-600' },
    { name: 'TestNG', color: 'from-yellow-500 to-orange-500' },
  ];

  const skillCategories = [
    {
      title: 'Testing Expertise',
      icon: TestTube,
      gradient: 'from-emerald-500 to-cyan-500',
      skills: [
        'Android Testing',
        'Accessibility',
        'iOS Testing',
        'Web Portal Testing',
        'Smoke Testing',
        'Regression Testing',
        'Test Case Design & Execution',
        'API Testing',
        'Functional Testing'
      ]
    },
    {
      title: 'Automation Tools',
      icon: Cog,
      gradient: 'from-cyan-500 to-blue-500',
      skills: [
        'Selenium WebDriver',
        'Appium',
        'Playwright',
        'TestSigma',
        'TestNG',
        'Maven',
        'JUnit',
        'Selenium Grid'
      ]
    },
    {
      title: 'Programming & Frameworks',
      icon: Code,
      gradient: 'from-blue-500 to-purple-500',
      skills: [
        'Java',
        'BDD (Cucumber)',
        'TypeScript',
        'JavaScript',
        'Data-Driven Framework',
        'Modular Framework',
        'Hybrid Framework'
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: Monitor,
      gradient: 'from-purple-500 to-pink-500',
      skills: [
        'Jira',
        'Google Analytics',
        'Confluence',
        'Jmeter',
        'Charles Proxy',
        'TestFlight',
        'BrowserStack',
        'Postman'
      ]
    },
    {
      title: 'Database & CI/CD',
      icon: Database,
      gradient: 'from-pink-500 to-rose-500',
      skills: [
        'SQL Queries',
        'Database Testing',
        'PostgreSQL',
        'MySQL',
        'CI/CD Pipelines',
        'Jenkins Integration',
        'Git'
      ]
    },
    {
      title: 'Methodologies',
      icon: GitBranch,
      gradient: 'from-rose-500 to-orange-500',
      skills: [
        'Agile Methodology',
        'Functional',
        'Non-functional',
        'Integration',
        'Acceptance',
        'Performance',
        'Cross-Functional Collaboration',
        'Team Leadership',
        'Mentoring'
      ]
    },
  ];

  return (
    <section id="skills" className="py-32 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full glass-light mb-6"
          >
            <Zap className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-cyan-400 text-sm font-medium">Key Skills & Tools</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Comprehensive <span className="text-gradient">Toolkit</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            End-to-end quality assurance expertise with modern tools and frameworks
          </p>
        </motion.div>

        {/* Tool Badges - Scrolling */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <div className="relative overflow-hidden py-4">
            {/* Gradient Masks */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10" />
            
            <motion.div 
              className="flex space-x-4"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              {[...tools, ...tools].map((tool, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 px-6 py-3 rounded-2xl bg-gradient-to-r ${tool.color} flex items-center space-x-2 shadow-lg`}
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span className="text-white font-semibold whitespace-nowrap">{tool.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Skill Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="card-premium glass rounded-3xl p-8 h-full relative overflow-hidden">
                {/* Gradient Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.gradient}`} />
                
                {/* Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${category.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <category.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
                
                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + index * 0.1 + skillIndex * 0.03 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-slate-300 border border-white/10 hover:border-white/30 hover:bg-white/10 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
