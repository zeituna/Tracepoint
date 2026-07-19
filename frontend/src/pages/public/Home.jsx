// src/component/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, MapPin, MessageSquare, Bell, Users, Shield, Camera,
  FileText, AlertTriangle, CheckCircle, Clock, ArrowRight,
  Quote, Sparkles, BarChart3, FolderOpen, Smartphone, Globe,
  Award, Heart, Lock, Send
} from 'lucide-react';

// ─── Hero image – your custom URL ─────────────────────────────
const HERO_IMAGE_URL = 'https://chatgpt.com/backend-api/estuary/content?id=file_00000000fbe471f4aae447e49aa84c80&ts=495641&p=fs&cid=1&sig=db7ba2e2014798b10f5bc35fd6a8e76bd023e13bb49026f4c1dd43e38e2a0c75&v=0';
const MISSION_IMAGE_URL = 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop&crop=center&auto=format';

// ─── Fallback images if your URLs fail ────────────────────────
const FALLBACK_HERO = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=600&fit=crop&crop=center&auto=format';
const FALLBACK_MISSION = 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=600&h=400&fit=crop&crop=center&auto=format';

// ─── Animation variants ────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const HomePage = () => {
  // ─── Stats ──────────────────────────────────────────────────────
  const stats = [
    { value: '1,248', label: 'Reports Managed', icon: FileText, description: 'Total missing person reports filed' },
    { value: '482', label: 'Active Cases', icon: AlertTriangle, description: 'Currently active investigations' },
    { value: '766', label: 'Resolved Cases', icon: CheckCircle, description: 'Successful reunifications' },
    { value: '6', label: 'Active Users', icon: Users, description: 'Registered volunteers & officers' },
    { value: '96%', label: 'Success Rate', icon: Award, description: 'Cases resolved within 72 hours' },
    { value: '24/7', label: 'Emergency Response', icon: Clock, description: 'Round-the-clock support' },
  ];

  // ─── Features ──────────────────────────────────────────────────
  const features = [
    { icon: Camera, title: 'Face Recognition', description: 'Advanced AI-powered facial matching to help identify missing persons quickly and accurately.' },
    { icon: MapPin, title: 'Live GPS Tracking', description: 'Real-time location updates for active search operations, ensuring teams are always coordinated.' },
    { icon: Bell, title: 'Instant Alerts', description: 'Notify volunteers, law enforcement, and communities immediately when a case updates or a person is found.' },
    { icon: MessageSquare, title: 'Secure Messaging', description: 'Private, encrypted communication between case managers, families, and field teams.' },
    { icon: Shield, title: 'Bank-Grade Security', description: 'Your data is protected with military-grade encryption and strict access controls.' },
    { icon: Users, title: 'Community Collaboration', description: 'Engage a network of volunteers, NGOs, and organizations to expand search efforts.' },
    { icon: BarChart3, title: 'Advanced Analytics', description: 'Gain actionable insights with real-time dashboards, case trends, and resource allocation tools.' },
    { icon: FolderOpen, title: 'Comprehensive Case Management', description: 'Centralized case files with document uploads, timelines, and task assignments for seamless tracking.' },
    { icon: Smartphone, title: 'Mobile-First Platform', description: 'Access TracePoint on any device with a fully responsive design and dedicated mobile apps.' },
    { icon: Globe, title: 'Multi-Language Support', description: 'Reach diverse communities with support for multiple local and international languages.' },
    { icon: Lock, title: 'End-to-End Encryption', description: 'All communications and data transfers are secured with end-to-end encryption.' },
    { icon: Heart, title: 'Victim & Family Support', description: 'Provide emotional and practical resources to families during their most difficult time.' },
  ];

  // ─── How it works ─────────────────────────────────────────────
  const steps = [
    { icon: FileText, title: '1. Report', description: 'File a detailed missing person report with photos, descriptions, and last known location.' },
    { icon: Search, title: '2. Search & Track', description: 'Our system coordinates search efforts, tracks progress, and provides real-time updates.' },
    { icon: Users, title: '3. Collaborate', description: 'Share updates with authorities, volunteers, family members, and the public securely.' },
    { icon: CheckCircle, title: '4. Reunite', description: 'Celebrate successful reunifications and close the case with comprehensive documentation.' },
  ];

  // ─── Testimonials ──────────────────────────────────────────────
  const testimonials = [
    { quote: "TracePoint helped us find my brother within 48 hours. The GPS tracking and community alerts were a game changer.", author: "Sarah M.", role: "Family Member" },
    { quote: "As a law enforcement officer, I've seen many systems, but TracePoint's intuitive design and real-time data made our search operation much more efficient.", author: "Inspector Kiprop", role: "Police Department" },
    { quote: "We've reunited over 100 families using TracePoint. It's the most reliable missing person platform we've ever used.", author: "Dr. Akinyi", role: "NGO Director" },
    { quote: "The mobile app and instant alerts allowed our community to mobilize quickly. We found the missing child within hours.", author: "Community Leader", role: "Volunteer Network" },
  ];

  // ─── Blog posts ──────────────────────────────────────────────
  const blogPosts = [
    { title: "New Partnership with National Police", date: "May 15, 2024", excerpt: "TracePoint joins forces with law enforcement to enhance search operations across the country." },
    { title: "Introducing Advanced Face Recognition", date: "May 10, 2024", excerpt: "Our new AI-powered face matching feature significantly improves identification accuracy." },
    { title: "Community Success Story: Reunited!", date: "May 5, 2024", excerpt: "A young boy was safely reunited with his family thanks to the quick action of volunteers." },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 pt-8 pb-16 md:pt-12 md:pb-24">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        <motion.div 
          className="absolute top-20 right-20 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 left-20 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], x: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* ─── Left Content ─────────────────────────────────── */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold tracking-wider uppercase">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  Helping Families Reunite
                </span>
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              >
                Find Missing Persons{' '}
                <span className="text-emerald-600">Faster</span>
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                TracePoint is a comprehensive platform that leverages advanced tracking, community collaboration, and secure reporting to help locate missing individuals and reunite families.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Get Started
                  <ArrowRight size={18} />
                </Link>
                <Link
                  to="/report-missing"
                  className="inline-flex items-center gap-2 bg-white text-gray-700 px-8 py-3.5 rounded-xl font-semibold border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  Report a Missing Person
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-500">
                <span className="flex items-center gap-1.5"><CheckCircle size={16} className="text-emerald-500" /> Secure & Private</span>
                <span className="flex items-center gap-1.5"><Users size={16} className="text-emerald-500" /> Community Driven</span>
                <span className="flex items-center gap-1.5"><Clock size={16} className="text-emerald-500" /> 24/7 Support</span>
              </motion.div>
            </motion.div>

            {/* ─── Right Image – with your custom URL ──────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex relative justify-center"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-emerald-500/20 blur-3xl" />

                <div className="relative rounded-[40%_60%_55%_45%/45%_40%_60%_55%] overflow-hidden shadow-2xl border-4 border-white/20">
                  <img
                    src={HERO_IMAGE_URL}
                    alt="TracePoint – Missing person search"
                    className="h-[400px] lg:h-[450px] w-full object-cover"
                    onError={(e) => {
                      e.target.src = FALLBACK_HERO;
                    }}
                  />
                </div>

                {/* Floating badges */}
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-3 border border-white/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Camera size={22} className="text-emerald-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Face Recognition</p>
                    <p className="text-xs text-gray-500">95% match</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-3 border border-white/50"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <MapPin size={22} className="text-red-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Live Tracking</p>
                    <p className="text-xs text-gray-500">12 active</p>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-3 flex items-center gap-3 border border-white/50"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Bell size={22} className="text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Instant Alerts</p>
                    <p className="text-xs text-gray-500">1.2k+ volunteers</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ─── Decorative wave ─────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80 L1440 80 L1440 0 C1440 0 1200 60 720 60 C240 60 0 0 0 0 L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ========== TRUSTED BY ========== */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Trusted by organizations worldwide
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-6 opacity-60"
          >
            <span className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">🏛️ National Police</span>
            <span className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">❤️ Red Cross</span>
            <span className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">🌍 NGOs</span>
            <span className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">👥 Community Networks</span>
            <span className="text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">🏢 Government Agencies</span>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-emerald-50 transition-all duration-300 border border-transparent hover:border-emerald-200 group relative"
              >
                <stat.icon className="mx-auto text-emerald-500 mb-3 group-hover:scale-110 transition-transform" size={28} />
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-semibold text-gray-800 mt-1">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5 hidden lg:block">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">Features</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-4">Everything you need to find missing persons</h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-lg">Our platform combines cutting-edge technology with community collaboration to maximize search efforts.</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 group"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <feature.icon className="text-emerald-600" size={28} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== ABOUT / MISSION ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">Our Mission</motion.span>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Bringing Families Back Together</motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-600 mt-4 leading-relaxed text-lg">
                TracePoint was founded with a single goal: to leverage technology and community power to find missing persons faster and reunite families.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-500 mt-4 leading-relaxed">
                We work closely with law enforcement, NGOs, and volunteers to provide a secure, real-time platform that coordinates search efforts, shares critical information, and brings hope to families.
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2"><CheckCircle className="text-emerald-500" size={20} /> Trusted by 50+ organizations</div>
                <div className="flex items-center gap-2"><CheckCircle className="text-emerald-500" size={20} /> 100% free for families</div>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl"></div>
              <img
                src={MISSION_IMAGE_URL}
                alt="Team working together"
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover border border-white/20"
                onError={(e) => {
                  e.target.src = FALLBACK_MISSION;
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Simple steps to start your search</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-2xl font-bold mb-4 relative group-hover:bg-emerald-200 transition-colors">
                  <step.icon size={36} className="text-emerald-600" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-600 text-white rounded-full text-sm flex items-center justify-center font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Real stories from real people</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-transparent hover:border-emerald-100"
              >
                <Quote className="text-emerald-300 mb-4" size={36} />
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== BLOG / UPDATES ========== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-semibold rounded-full">Updates</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Latest News & Success Stories</h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200 group"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                  <FileText className="text-emerald-600" size={24} />
                </div>
                <p className="text-sm text-emerald-600 font-medium">{post.date}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-2 group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">{post.excerpt}</p>
                <Link to="#" className="inline-flex items-center gap-1 text-emerald-600 font-medium mt-4 text-sm hover:gap-2 transition-all">
                  Read more <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-20 bg-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
          animate={{ x: [-50, 50, -50] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
          animate={{ x: [50, -50, 50] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Send className="text-emerald-200 mx-auto mb-4" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold text-white">Stay Updated</h2>
            <p className="text-emerald-100 text-lg mt-4 max-w-2xl mx-auto">Subscribe to our newsletter for the latest updates, success stories, and community alerts.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3.5 rounded-xl border-0 focus:ring-2 focus:ring-white/50 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none"
              />
              <button className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
                <Send size={18} />
              </button>
            </div>
            <p className="text-emerald-200/70 text-sm mt-4">We respect your privacy. Unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ready to make a difference?</h2>
            <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">Join TracePoint today and help bring missing persons home. Every second counts.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-10 py-4 rounded-xl font-semibold shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:bg-emerald-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-10 py-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      
    </div>
  );
};

export default HomePage;