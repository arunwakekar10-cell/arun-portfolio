import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, Sparkles } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8698615947',
    href: 'tel:8698615947',
    gradient: 'from-emerald-500 to-cyan-500',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'arun.wakekar10@gmail.com',
    href: 'mailto:arun.wakekar10@gmail.com',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Arun Wakekar',
    href: 'https://www.linkedin.com/in/arun-wakekar-168a3b326/',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Ajay1Arun',
    href: 'https://github.com/Ajay1Arun',
    gradient: 'from-purple-500 to-pink-500',
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 px-4 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
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
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Let's connect and discuss how I can contribute to your team
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Sparkles className="w-6 h-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Contact Information</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                I'm currently open to new opportunities and would love to hear from you. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="flex justify-center">
              <div className="flex items-center space-x-3 text-slate-400">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>Chhatrapati Sambhajinagar
, Maharashtra, India</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center text-center p-6 glass rounded-2xl group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg mb-4`}
                  >
                    <info.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <p className="text-slate-400 text-sm mb-2">{info.label}</p>
                  <p className="text-white font-semibold group-hover:text-emerald-400 transition-colors">
                    {info.value}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 inline-block">
            <p className="text-slate-400 mb-4">Looking for a dedicated QA professional?</p>
            <motion.a
              href="mailto:arun.wakekar10@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-emerald-500/25"
            >
              <Mail className="w-5 h-5 mr-2" />
              Let's Work Together
              <Sparkles className="w-4 h-4 ml-2" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
