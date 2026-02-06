import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, ChevronDown, Sparkles, ArrowRight } from 'lucide-react';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { value: '3+', label: 'Years Experience', gradient: 'from-emerald-400 to-cyan-400' },
    { value: '14+', label: 'Testing Tools', gradient: 'from-cyan-400 to-blue-400' },
    { value: '4+', label: 'Certifications', gradient: 'from-blue-400 to-purple-400' },
    { value: '5+', label: 'Major Projects', gradient: 'from-purple-400 to-pink-400' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-16 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center px-4 py-2 rounded-full glass-light group cursor-pointer hover:border-emerald-500/50 transition-all">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-medium text-sm">Available for Opportunities</span>
                <Sparkles className="w-4 h-4 ml-2 text-emerald-400" />
              </div>
            </motion.div>
            
            {/* Name */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Hi, I'm </span>
                <br />
                <span className="text-gradient-animated">Arun Wakekar</span>
              </h1>
            </motion.div>
            
            {/* Role */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center space-x-4">
                <div className="h-px w-12 bg-gradient-to-r from-emerald-500 to-transparent" />
                <h2 className="text-2xl md:text-3xl text-slate-300 font-light">
                  Quality Analyst
                </h2>
              </div>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-slate-400 text-lg leading-relaxed max-w-xl"
            >
              Experienced QA professional with expertise in automation and manual testing. 
              Specialized in <span className="text-emerald-400 font-medium">Selenium</span>, 
              <span className="text-cyan-400 font-medium"> Appium</span>, 
              <span className="text-blue-400 font-medium"> Playwright</span>, and 
              <span className="text-purple-400 font-medium"> TestSigma</span> with a proven track record of 
              delivering high-quality software across web and mobile platforms.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white font-semibold rounded-2xl overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="#experience"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-semibold overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl" />
                </span>
                <span className="relative flex items-center text-slate-300 group-hover:text-white transition-colors">
                  View Experience
                  <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                </span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4 pt-4">
              {[
                { icon: Phone, label: '8698615947', href: 'tel:8698615947' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/arun-wakekar-168a3b326/' },
                { icon: Github, label: 'GitHub', href: 'https://github.com/Ajay1Arun' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl glass-light text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                  <span className="text-sm">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Stats Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-premium glass rounded-3xl p-8 text-center group"
              >
                <motion.div 
                  className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, type: 'spring', bounce: 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-slate-400 mt-3 font-medium group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
                {/* Decorative Element */}
                <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r ${stat.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity`} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-slate-500"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
