// src/pages/public/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, MessageSquare, Bell, Users, Shield, Camera,
  FileText, AlertTriangle, CheckCircle, Clock, ArrowRight,
  Quote, BarChart3, FolderOpen, Smartphone, Globe,
  Award, Heart, Lock, Send, Sparkles, TrendingUp, Target
} from 'lucide-react';

// ─── Import your hero image ────────────────────────────────────
import heroImage from '../../assets/hero.png';

// ─── Fallback image ────────────────────────────────────────────
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=600&fit=crop&crop=center&auto=format';

// ─── Image Component ──────────────────────────────────────────
const ImageWithFallback = ({ src, fallback, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallback || FALLBACK_IMAGE);
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt || 'TracePoint Platform'}
      className={className}
      onError={handleError}
      loading="lazy"
    />
  );
};

// ─── Animation variants ────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const HomePage = () => {
  // ─── Stats ──────────────────────────────────────────────────────
  const stats = [
    { value: '1,248', label: 'Reports Managed', icon: FileText, change: '+12%' },
    { value: '482', label: 'Active Cases', icon: Target, change: '+8%' },
    { value: '766', label: 'Resolved Cases', icon: CheckCircle, change: '+23%' },
    { value: '96%', label: 'Success Rate', icon: Award, change: '+5%' },
  ];

  // ─── Features ──────────────────────────────────────────────────
  const features = [
    { icon: Camera, title: 'Face Recognition', description: 'State-of-the-art facial matching technology for rapid identification.' },
    { icon: MapPin, title: 'Live GPS Tracking', description: 'Precision location tracking for coordinated search operations.' },
    { icon: Bell, title: 'Instant Notifications', description: 'Real-time updates delivered to volunteers and authorities instantly.' },
    { icon: Shield, title: 'Enterprise Security', description: 'Military-grade encryption ensuring complete data protection.' },
    { icon: Users, title: 'Community Network', description: 'Connect with thousands of volunteers and organizations worldwide.' },
    { icon: BarChart3, title: 'Advanced Analytics', description: 'Comprehensive dashboards with actionable intelligence.' },
    { icon: Globe, title: 'Global Coverage', description: 'Multi-language support across 50+ countries.' },
    { icon: Heart, title: 'Family Support', description: 'Compassionate resources and guidance for affected families.' },
  ];

  // ─── How it works ─────────────────────────────────────────────
  const steps = [
    { icon: FileText, title: 'Report', description: 'Submit detailed case information with photos and location.' },
    { icon: Search, title: 'Track', description: 'Our system coordinates search efforts across all channels.' },
    { icon: Users, title: 'Mobilize', description: 'Engage volunteers, authorities, and organizations.' },
    { icon: CheckCircle, title: 'Reunite', description: 'Successfully reunite families and document outcomes.' },
  ];

  // ─── Testimonials ──────────────────────────────────────────────
  const testimonials = [
    { 
      quote: "TracePoint helped us find my brother within 48 hours. The tracking and community alerts were exceptional.", 
      author: "Sarah M.", 
      role: "Family Member" 
    },
    { 
      quote: "As a law enforcement officer, I've never seen a more intuitive and effective system. Outstanding.", 
      author: "Inspector Kiprop", 
      role: "Police Department" 
    },
    { 
      quote: "We've reunited over 100 families using TracePoint. It's the most reliable platform available.", 
      author: "Dr. Akinyi", 
      role: "NGO Director" 
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================================ */}
      {/* HERO SECTION - Premium Design */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50/30">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-100/10 rounded-tr-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-300/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-emerald-700 font-medium text-sm tracking-wide">
                    Helping Families Reunite
                  </span>
                </div>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Find Missing
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                  Persons Faster
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-xl text-gray-600 max-w-lg leading-relaxed">
                TracePoint combines advanced tracking technology with community collaboration to locate missing individuals and reunite families efficiently.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/35 transition-all duration-300 hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  to="/report-missing"
                  className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-2xl font-semibold border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-300"
                >
                  <AlertTriangle size={20} className="text-emerald-600" />
                  Report a Case
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-medium">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Sparkles key={i} className="fill-emerald-400 text-emerald-400" size={16} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Trusted by 10,000+ families</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl" />
                
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl border-2 border-white/30 bg-white/5">
                  <ImageWithFallback
                    src={heroImage}
                    fallback={FALLBACK_IMAGE}
                    alt="TracePoint Platform"
                    className="w-full h-[420px] lg:h-[520px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                </div>

                {/* Floating Cards - Premium Design */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Camera className="text-white" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Face Recognition</p>
                      <p className="text-xs text-gray-500">99.9% Accuracy</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                      <MapPin className="text-white" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Live Tracking</p>
                      <p className="text-xs text-gray-500">1,247 active</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-400 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Bell className="text-white" size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">Instant Alerts</p>
                      <p className="text-xs text-gray-500">10k+ volunteers</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-emerald-500 rounded-full mt-1.5 animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ============================================================ */}
      {/* TRUSTED BY */}
      {/* ============================================================ */}
      <section className="py-16 bg-white border-b border-gray-100/80">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm font-medium tracking-[0.25em] uppercase"
          >
            Trusted by Leading Organizations
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-12 md:gap-20 mt-8"
          >
            <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default">National Police</span>
            <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default">Red Cross</span>
            <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default">UNHCR</span>
            <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default">Community Networks</span>
            <span className="text-lg font-medium text-gray-400 hover:text-gray-600 transition-colors cursor-default">Government Agencies</span>
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STATS */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-emerald-100/80 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="text-emerald-600" size={28} />
                  </div>
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FEATURES */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500"> Find Missing Persons</span>
            </h2>
            <p className="text-xl text-gray-500 mt-4 leading-relaxed">
              A comprehensive platform combining advanced technology with community collaboration.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-emerald-100/80 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-emerald-600" size={28} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full mb-4">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              How TracePoint Works
            </h2>
            <p className="text-xl text-gray-500 mt-4 leading-relaxed">
              Four simple steps to start your search and reunite families.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-200 to-transparent hidden lg:block" />

            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
                className="relative"
              >
                <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-emerald-100/80 hover:-translate-y-1 text-center">
                  <div className="relative inline-block">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20">
                      <step.icon className="text-white" size={32} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-emerald-500 text-emerald-600 rounded-full text-sm font-bold flex items-center justify-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIALS */}
      {/* ============================================================ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Real Stories from
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500"> Real People</span>
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/80 hover:border-emerald-100/80"
              >
                <Quote className="text-emerald-300/60 mb-4" size={32} />
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-700 font-semibold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA SECTION */}
      {/* ============================================================ */}
      <section className="py-24 bg-gradient-to-r from-emerald-600 to-emerald-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-l-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-black/5 rounded-r-full blur-3xl" />
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-emerald-100/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of families and organizations using TracePoint to find missing persons and reunite loved ones.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-3 bg-white text-emerald-600 px-10 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-3 bg-emerald-700/30 backdrop-blur-sm text-white px-10 py-4 rounded-2xl font-semibold border border-white/20 hover:bg-emerald-700/40 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
            <p className="text-emerald-200/70 text-sm mt-6">
              Free for families • No credit card required • 24/7 support
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;