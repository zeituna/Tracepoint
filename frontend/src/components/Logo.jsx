import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', showText = true, className = '', variant = 'light' }) => {
  const sizes = {
    sm: { 
      icon: 'w-9 h-9', 
      text: 'text-base', 
      iconText: 'text-sm',
      gap: 'gap-2.5',
      padding: 'p-1.5',
      glow: 'w-20 h-20'
    },
    md: { 
      icon: 'w-12 h-12', 
      text: 'text-xl', 
      iconText: 'text-base',
      gap: 'gap-3',
      padding: 'p-2',
      glow: 'w-28 h-28'
    },
    lg: { 
      icon: 'w-16 h-16', 
      text: 'text-3xl', 
      iconText: 'text-2xl',
      gap: 'gap-4',
      padding: 'p-3',
      glow: 'w-36 h-36'
    },
    xl: { 
      icon: 'w-24 h-24', 
      text: 'text-5xl', 
      iconText: 'text-4xl',
      gap: 'gap-5',
      padding: 'p-4',
      glow: 'w-52 h-52'
    },
  };

  const sizeClasses = sizes[size] || sizes.md;

  const textColors = {
    light: 'text-gray-800',
    dark: 'text-white',
  };

  const textColor = textColors[variant] || textColors.light;

  // Premium animation variants
  const iconVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.08,
      rotate: [-2, 2, -2],
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.3, scale: 0.9 },
    hover: { 
      opacity: 0.8, 
      scale: 1.2,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    hover: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, delay: 0.1 }
    }
  };

  return (
    <Link 
      to="/" 
      className={`flex items-center ${sizeClasses.gap} group ${className}`}
    >
      {/* Premium Icon with multiple layers */}
      <motion.div 
        className="relative flex-shrink-0"
        initial="initial"
        whileHover="hover"
        animate="initial"
      >
        {/* Outer glow ring - animated */}
        <motion.div 
          variants={glowVariants}
          className={`${sizeClasses.glow} absolute -inset-4 bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 rounded-full blur-2xl`}
        ></motion.div>
        
        {/* Secondary glow */}
        <motion.div 
          variants={glowVariants}
          className={`${sizeClasses.icon} absolute -inset-2 bg-gradient-to-br from-emerald-400/30 to-emerald-500/30 rounded-2xl blur-xl`}
        ></motion.div>
        
        {/* Main icon with premium gradient - animated */}
        <motion.div 
          variants={iconVariants}
          className={`${sizeClasses.icon} relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-emerald-400/20 ${sizeClasses.padding}`}
        >
          {/* Inner shimmer effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent"></div>
          
          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl bg-gradient-to-b from-white/15 to-transparent"></div>
          
          {/* Animated shimmer line */}
          <motion.div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          ></motion.div>
          
          {/* Sparkle effects - animated */}
          <motion.div 
            variants={sparkleVariants}
            className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-300/60 rounded-full blur-sm"
          ></motion.div>
          <motion.div 
            variants={sparkleVariants}
            className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-emerald-400/50 rounded-full blur-sm"
          ></motion.div>
          <motion.div 
            variants={sparkleVariants}
            className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/50 rounded-full"
          ></motion.div>
          
          {/* Icon text with shadow and animation */}
          <motion.span 
            className={`${sizeClasses.iconText} font-bold text-white tracking-tight relative z-10 drop-shadow-lg`}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            TP
          </motion.span>
        </motion.div>
        
        {/* Decorative dot with pulse */}
        <motion.div 
          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white shadow-lg"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        ></motion.div>
      </motion.div>

      {/* Text section - Only the name, no description */}
      {showText && (
        <motion.div 
          className="leading-tight"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`${sizeClasses.text} font-bold ${textColor} tracking-tight block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent`}>
              TracePoint
            </span>
            <motion.span 
              className="text-[8px] font-semibold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              ®
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </Link>
  );
};

export default Logo;
