import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  Shield, 
  Users, 
  Phone, 
  Map, 
  Camera, 
  MessageCircle,
  Search,
  Bell,
  BarChart3,
  FileText,
  AlertTriangle,
  UserPlus,
  Building2,
  Mail,
  Lock,
  Database,
  Cloud,
  Zap,
  Globe,
  Smartphone,
  Printer,
  Share2,
  Heart
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Powerful search capabilities with filters, sorting, and real-time results.',
      category: 'Core'
    },
    {
      icon: Camera,
      title: 'Face Recognition',
      description: 'Upload and match images using advanced facial recognition technology.',
      category: 'Core'
    },
    {
      icon: Map,
      title: 'Interactive Maps',
      description: 'Track cases on live interactive maps with detailed location data.',
      category: 'Core'
    },
    {
      icon: Bell,
      title: 'Real-time Alerts',
      description: 'Instant notifications for case updates, emergencies, and announcements.',
      category: 'Core'
    },
    {
      icon: MessageCircle,
      title: 'Secure Messaging',
      description: 'End-to-end encrypted messaging between users, organizations, and authorities.',
      category: 'Core'
    },
    {
      icon: Users,
      title: 'Community Collaboration',
      description: 'Work together with organizations, authorities, and community members.',
      category: 'Core'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Industry-standard encryption and privacy controls for all user data.',
      category: 'Security'
    },
    {
      icon: Lock,
      title: 'Role-Based Access',
      description: 'Granular permission controls for different user roles and organizations.',
      category: 'Security'
    },
    {
      icon: Database,
      title: 'Data Protection',
      description: 'Regular backups and disaster recovery to keep your data safe.',
      category: 'Security'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting on case statistics and trends.',
      category: 'Analytics'
    },
    {
      icon: FileText,
      title: 'Report Generation',
      description: 'Generate detailed reports in PDF, Excel, and other formats.',
      category: 'Analytics'
    },
    {
      icon: Printer,
      title: 'Export & Print',
      description: 'Easily export and print case reports and statistical data.',
      category: 'Analytics'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Secure cloud storage for photos, documents, and case files.',
      category: 'Technology'
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Optimized for speed and responsiveness on all devices.',
      category: 'Technology'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Full functionality on smartphones, tablets, and all devices.',
      category: 'Technology'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Support for multiple languages to serve diverse communities.',
      category: 'Technology'
    },
    {
      icon: Heart,
      title: 'Family Reunification',
      description: 'Dedicated tools and processes to help reunite families.',
      category: 'Impact'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Response',
      description: 'Rapid response capabilities for urgent missing person cases.',
      category: 'Impact'
    },
    {
      icon: Share2,
      title: 'Community Awareness',
      description: 'Share cases and alerts to raise community awareness.',
      category: 'Impact'
    },
  ];

  const categories = ['All', 'Core', 'Security', 'Analytics', 'Technology', 'Impact'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredFeatures = selectedCategory === 'All'
    ? features
    : features.filter(f => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Features</h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Powerful features designed to help find missing persons faster
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-8 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-100">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="text-emerald-600" size={24} />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
              <span className="inline-block mt-3 text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                {feature.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
