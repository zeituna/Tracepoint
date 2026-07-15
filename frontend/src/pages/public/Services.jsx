import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  MessageSquare, 
  Bell, 
  Users, 
  Shield, 
  Camera, 
  BarChart3,
  FileText,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Building2,
  Mail,
  Phone,
  Clock,
  Award,
  Heart
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Search,
      title: 'Missing Person Reports',
      description: 'Create and manage comprehensive missing person reports with detailed information, photos, and location data.',
      features: ['Photo upload', 'Detailed descriptions', 'Location tracking', 'Status updates'],
      color: 'bg-blue-50 text-blue-600'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track missing persons on interactive maps with live location updates and case progress.',
      features: ['Live location', 'History tracking', 'Geofencing', 'Route optimization'],
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: Camera,
      title: 'Face Recognition',
      description: 'Advanced facial recognition technology to help identify and locate missing persons.',
      features: ['Image matching', 'Confidence scoring', 'Database search', 'Match history'],
      color: 'bg-purple-50 text-purple-600'
    },
    {
      icon: MessageSquare,
      title: 'Secure Communication',
      description: 'Communicate securely with authorities, organizations, and family members.',
      features: ['Private messaging', 'Group chats', 'File sharing', 'Read receipts'],
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Receive real-time notifications about case updates, emergency alerts, and announcements.',
      features: ['Push notifications', 'Email alerts', 'SMS alerts', 'Emergency broadcasts'],
      color: 'bg-orange-50 text-orange-600'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with community members, NGOs, and government agencies for assistance.',
      features: ['Community forums', 'Volunteer coordination', 'Resource sharing', 'Support groups'],
      color: 'bg-pink-50 text-pink-600'
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Your data is protected with industry-standard security measures and privacy controls.',
      features: ['Encryption', 'Access control', 'Audit logs', 'Data protection'],
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'View comprehensive statistics and insights about missing persons cases.',
      features: ['Case statistics', 'Trend analysis', 'Performance metrics', 'Export reports'],
      color: 'bg-yellow-50 text-yellow-600'
    },
  ];

  const pricing = [
    {
      name: 'Basic',
      price: 'Free',
      features: ['Report missing persons', 'View cases', 'Receive alerts', 'Community access'],
      button: 'Get Started',
      popular: false
    },
    {
      name: 'Organization',
      price: 'Free',
      features: ['All Basic features', 'Organization dashboard', 'Case management', 'Team collaboration', 'Advanced analytics', 'API access'],
      button: 'Join Now',
      popular: true
    },
    {
      name: 'Agency',
      price: 'Free',
      features: ['All Organization features', 'Multi-agency coordination', 'Priority support', 'Custom integration', 'Advanced security'],
      button: 'Contact Us',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-emerald-200 max-w-2xl mx-auto">
            Comprehensive tools designed to help find missing persons and reunite families
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-100">
              <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <ul className="mt-4 space-y-1">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle className="text-emerald-500" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">Choose Your Plan</h2>
          <p className="text-gray-600 text-center mb-12">All plans are completely free</p>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg p-6 border ${plan.popular ? 'border-emerald-500' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{plan.price}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="text-emerald-500" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.button === 'Contact Us' ? '/contact' : '/register'}
                  className={`block text-center mt-6 px-6 py-2 rounded-lg font-semibold transition ${
                    plan.popular
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.button}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
