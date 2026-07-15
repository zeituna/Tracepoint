import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  MessageSquare, 
  Bell, 
  Users, 
  Shield, 
  Camera, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Heart,
  TrendingUp,
  AlertTriangle,
  FileText,
  Sparkles,
  Rocket,
  Globe,
  Target,
  Eye,
  Smile,
  Star,
  ChevronRight,
  Quote,
  Compass,
  Zap,
  Award as AwardIcon,
  BadgeCheck,
  Building2,
  Phone,
  Mail,
  Play,
  Video,
  Monitor,
  Smartphone,
  Laptop,
  Share2,
  RefreshCw,
  Send,
  Gift,
  Crown,
  Diamond,
  Gem,
  Flame,
  Sun,
  Moon,
  Cloud,
  Wind,
  Droplets,
  TreePine,
  Mountain,
  Waves,
  Pizza,
  Coffee,
  Utensils,
  Music,
  Film,
  Book,
  Pen,
  Pencil,
  Brush,
  Palette,
  Scissors,
  Compass as CompassIcon,
  Anchor,
  Ship,
  Plane,
  Car,
  Bike,
  Train,
  Bus,
  Rocket as RocketIcon
} from 'lucide-react';

// Premium animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const floatAnimation = {
  y: [0, -15, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};

const floatAnimation2 = {
  y: [0, 15, 0],
  transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
};

const pulseGlow = {
  scale: [1, 1.05, 1],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
};

const shimmer = {
  background: ["linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"],
  transition: { duration: 3, repeat: Infinity, ease: "linear" }
};

// Special hero features - No AI references
const specialFeatures = [
  { 
    icon: Camera, 
    label: 'Face Recognition',
    color: 'from-purple-500 to-purple-600',
    delay: 0
  },
  { 
    icon: MapPin, 
    label: 'Live Tracking',
    color: 'from-emerald-500 to-emerald-600',
    delay: 0.2
  },
  { 
    icon: Bell, 
    label: 'Instant Alerts',
    color: 'from-orange-500 to-orange-600',
    delay: 0.4
  },
  { 
    icon: MessageSquare, 
    label: 'Secure Messaging',
    color: 'from-blue-500 to-blue-600',
    delay: 0.6
  },
];

const HomePage = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [activeStat, setActiveStat] = useState(0);

  const stats = [
    { value: '1,248', label: 'Reports Managed', icon: FileText, gradient: 'from-emerald-400 to-emerald-500' },
    { value: '482', label: 'Active Cases', icon: AlertTriangle, gradient: 'from-amber-400 to-amber-500' },
    { value: '766', label: 'Resolved Cases', icon: CheckCircle, gradient: 'from-blue-400 to-blue-500' },
    { value: '6', label: 'Active Users', icon: Users, gradient: 'from-purple-400 to-purple-500' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* SUPER PREMIUM HERO SECTION - No AI References */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-16 md:py-24 lg:py-28">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-300/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow delay-2000"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/10 rounded-full"
                initial={{
                  x: Math.random() * 100 + '%',
                  y: Math.random() * 100 + '%',
                }}
                animate={{
                  y: [null, Math.random() * 30 - 15 + '%'],
                  x: [null, Math.random() * 30 - 15 + '%'],
                  opacity: [0.1, 0.5, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Premium Floating Elements */}
        <motion.div animate={floatAnimation} className="absolute top-24 right-20 text-emerald-300/20 hidden xl:block">
          <Sparkles size={70} />
        </motion.div>
        <motion.div animate={floatAnimation2} className="absolute bottom-20 left-20 text-emerald-300/15 hidden xl:block">
          <Compass size={55} />
        </motion.div>
        <motion.div animate={{ rotate: [0, 15, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-1/2 right-32 text-emerald-300/10 hidden xl:block">
          <Globe size={45} />
        </motion.div>

        {/* Shimmer Line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium Badge with Glow - No AI */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/10 mb-8 shadow-2xl shadow-emerald-500/20"
            >
              <motion.span 
                className="w-2.5 h-2.5 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.span>
              <span className="text-xs font-medium text-emerald-200/90 tracking-[0.2em] uppercase">
                🌍 Helping Families Reunite
              </span>
              <span className="w-px h-5 bg-white/10"></span>
              <span className="text-xs text-emerald-300/70 flex items-center gap-1">
                <Sparkles size={12} />
                Secure & Trusted
              </span>
            </motion.div>

            {/* Main Title with Special Effects */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span className="text-white">Find Missing</span>
                <span className="block bg-gradient-to-r from-emerald-200 via-white to-emerald-100 bg-clip-text text-transparent">
                  Persons Faster
                </span>
                <span className="block text-white text-2xl sm:text-3xl md:text-4xl mt-2 font-light tracking-wide">
                  with Advanced Tracking & Reporting
                </span>
              </h1>
            </motion.div>

            {/* Special Features Pills - No AI */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-3 mb-8"
            >
              {specialFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(16, 185, 129, 0.3)"
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${feature.color} backdrop-blur-sm border border-white/20 shadow-lg`}
                >
                  <feature.icon size={16} className="text-white" />
                  <span className="text-xs font-medium text-white">{feature.label}</span>
                  {hoveredFeature === index && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons with Special Effects */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link 
                to="/register" 
                className="group relative inline-flex items-center gap-3 bg-white text-emerald-700 px-10 py-4 rounded-2xl font-semibold text-lg shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="relative">Get Started</span>
                <motion.span 
                  className="relative flex items-center gap-1"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                </motion.span>
              </Link>
              <Link 
                to="/report-missing" 
                className="group inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/10 hover:bg-emerald-500/30 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
              >
                <motion.span 
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
                Report Missing Person
              </Link>
            </motion.div>

            {/* Trust Indicators with Icons - No AI */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-6 mt-10"
            >
              {[
                { icon: Shield, label: 'Secure Platform' },
                { icon: Users, label: 'Community Driven' },
                { icon: Star, label: '4.9★ Rated' },
                { icon: Clock, label: '24/7 Support' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2.5"
                >
                  <item.icon className="text-emerald-300" size={18} />
                  <span className="text-sm text-emerald-100/80 font-light">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Interactive Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.08, 
                    y: -5,
                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)"
                  }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/10 hover:bg-white/15 transition-all duration-500 cursor-pointer group"
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <stat.icon className="mx-auto text-emerald-300/70 mb-2 group-hover:text-emerald-300 transition-colors" size={24} />
                  </motion.div>
                  <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-emerald-200/70 mt-1 font-light tracking-wide">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Premium Bottom Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100 L1440 100 L1440 0 C1440 0 1200 70 720 70 C240 70 0 0 0 0 L0 100Z" fill="white" opacity="0.05"/>
          </svg>
        </div>

        {/* Animated Glow Ring */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </section>

      {/* Rest of the sections remain the same */}
    </div>
  );
};

export default HomePage;
