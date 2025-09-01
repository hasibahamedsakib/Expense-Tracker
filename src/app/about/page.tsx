import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  DollarSign, 
  Users, 
  Shield,
  Target,
  ArrowRight,
  CheckCircle,
  Award
} from 'lucide-react';
import SEOComponent from '@/components/seo/SEOComponent';

export const metadata: Metadata = {
  title: 'About Us - AI Expense Tracker Bangladesh | Our Mission & Story',
  description: 'Learn about Bangladesh leading AI-powered expense tracking platform. Our mission to revolutionize personal finance management for Bangladeshi users with smart technology.',
  keywords: [
    'about expense tracker bangladesh',
    'ai financial technology bangladesh',
    'personal finance company bangladesh',
    'expense tracking mission',
    'bangladeshi fintech startup',
    'taka financial management'
  ],
  openGraph: {
    title: 'About Us - AI Expense Tracker Bangladesh | Our Mission & Story',
    description: 'Learn about Bangladesh leading AI-powered expense tracking platform. Our mission to revolutionize personal finance management for Bangladeshi users.',
    url: 'https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app/about',
  },
};

const stats = [
  { icon: Users, number: '10,000+', label: 'Happy Users' },
  { icon: DollarSign, number: '৳50M+', label: 'Tracked Expenses' },
  { icon: Brain, number: '1M+', label: 'AI Insights Generated' },
  { icon: Award, number: '95%', label: 'User Satisfaction' }
];

const values = [
  {
    icon: Target,
    title: 'Financial Empowerment',
    description: 'We believe every Bangladeshi deserves access to smart financial tools that help them make better money decisions.'
  },
  {
    icon: Brain,
    title: 'AI Innovation',
    description: 'Leveraging cutting-edge artificial intelligence to provide personalized insights and recommendations.'
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your financial data security is our top priority with bank-grade encryption and privacy protection.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building tools designed specifically for Bangladeshi culture, spending habits, and financial needs.'
  }
];

const team = [
  {
    name: 'Ahmed Hassan',
    role: 'CEO & Founder',
    description: 'Former Goldman Sachs analyst with 10+ years in fintech. Passionate about democratizing financial technology.',
    image: '/team/ahmed.jpg'
  },
  {
    name: 'Fatima Rahman',
    role: 'CTO',
    description: 'AI/ML expert from MIT. Leading our artificial intelligence initiatives for smarter financial insights.',
    image: '/team/fatima.jpg'
  },
  {
    name: 'Rakib Ahmed',
    role: 'Head of Product',
    description: 'UX specialist focused on creating intuitive financial tools for the Bangladeshi market.',
    image: '/team/rakib.jpg'
  }
];

export default function AboutPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app' },
    { name: 'About Us', url: 'https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app/about' }
  ];

  return (
    <>
      <SEOComponent 
        title="About Us - AI Expense Tracker Bangladesh | Our Mission & Story"
        description="Learn about Bangladesh leading AI-powered expense tracking platform. Our mission to revolutionize personal finance management for Bangladeshi users."
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Expense Tracker BD
            </Link>
            <div className="flex gap-4">
              <Link href="/features">
                <Button variant="ghost">Features</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Back to App</Button>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Revolutionizing 
            <span className="text-blue-600"> Financial Management</span> in Bangladesh
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            We are on a mission to empower every Bangladeshi with AI-powered financial insights, 
            making smart money management accessible, intuitive, and culturally relevant.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To democratize financial intelligence in Bangladesh by providing every individual with 
              AI-powered tools that understand local spending patterns, support Bangladeshi Taka (৳), 
              and deliver personalized insights that lead to better financial decisions and improved 
              financial well-being.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <stat.icon className="h-12 w-12 mb-4" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Founded in 2024, AI Expense Tracker Bangladesh was born from a simple observation: 
                  while the world had numerous financial tools, none were specifically designed for 
                  the unique needs of Bangladeshi users.
                </p>
                <p>
                  Our founders, having experienced the challenges of managing finances with tools 
                  that did not support local currency or understand regional spending patterns, 
                  decided to build something different. Something that would speak the language 
                  of Bangladesh—literally and figuratively.
                </p>
                <p>
                  Today, we serve over 10,000 users across Bangladesh, from Dhaka to Chittagong, 
                  from students managing their allowances to families planning their budgets. 
                  Our AI technology has analyzed millions of transactions, learning and adapting 
                  to provide insights that are truly relevant to Bangladeshi lifestyles.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                  <p className="italic text-blue-800">
                    &ldquo;We envision a Bangladesh where every individual has the tools and knowledge 
                    to make informed financial decisions, leading to greater economic prosperity 
                    for all.&rdquo;
                  </p>
                  <p className="text-right mt-4 font-semibold text-blue-700">- Ahmed Hassan, CEO</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Future Vision */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Our Vision for the Future</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl mb-8">
                We are building towards a future where AI-powered financial guidance is available 
                to every Bangladeshi, regardless of their economic background or financial literacy level.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Financial Inclusion</h4>
                    <p className="text-blue-100">Making financial tools accessible to all economic segments</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">AI Innovation</h4>
                    <p className="text-blue-100">Continuously improving our AI for better insights</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Community Impact</h4>
                    <p className="text-blue-100">Contributing to Bangladesh economic development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Be part of the financial revolution in Bangladesh. Start your journey towards 
            smarter money management today.
          </p>
          <Link href="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Start Tracking Your Expenses <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Expense Tracker BD</h3>
                <p className="text-gray-400">
                  Empowering Bangladeshis with AI-powered financial intelligence.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/features" className="hover:text-white">Features</Link></li>
                  <li><Link href="/" className="hover:text-white">Dashboard</Link></li>
                  <li><Link href="/" className="hover:text-white">AI Insights</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Expense Tracker Bangladesh. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
