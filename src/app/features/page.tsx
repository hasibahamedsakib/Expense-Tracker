import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  DollarSign, 
  Shield, 
  Smartphone, 
  CheckCircle,
  Star,
  ArrowRight,
  BarChart3,
  Target
} from 'lucide-react';
import SEOComponent from '@/components/seo/SEOComponent';

export const metadata: Metadata = {
  title: 'Features - AI-Powered Expense Tracking for Bangladesh',
  description: 'Discover powerful features of Bangladesh smartest expense tracker. AI insights, Taka support, budget management, spending analytics, and more.',
  keywords: [
    'expense tracker features',
    'ai financial insights',
    'bangladesh budget app',
    'taka expense management',
    'smart spending tracker',
    'financial analytics bangladesh'
  ],
  openGraph: {
    title: 'Features - AI-Powered Expense Tracking for Bangladesh',
    description: 'Discover powerful features of Bangladesh smartest expense tracker. AI insights, Taka support, budget management, spending analytics, and more.',
    url: 'https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app/features',
  },
};

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Get personalized financial advice and spending pattern analysis powered by advanced AI technology.',
    benefits: ['Smart spending recommendations', 'Pattern recognition', 'Predictive budgeting', 'Automated categorization']
  },
  {
    icon: DollarSign,
    title: 'Bangladeshi Taka Support',
    description: 'Native support for Bangladeshi currency with localized financial insights for local spending habits.',
    benefits: ['Local currency formatting', 'Bangladesh-specific categories', 'Regional spending insights', 'Taka-optimized budgets']
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Comprehensive spending analytics with beautiful charts and detailed financial reports.',
    benefits: ['Interactive charts', 'Monthly/yearly reports', 'Category breakdowns', 'Trend analysis']
  },
  {
    icon: Target,
    title: 'Smart Budget Management', 
    description: 'Set intelligent budgets with AI-assisted recommendations and real-time tracking.',
    benefits: ['AI budget suggestions', 'Real-time alerts', 'Category-wise limits', 'Goal tracking']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with end-to-end encryption to keep your financial data safe.',
    benefits: ['256-bit encryption', 'Secure authentication', 'Data privacy', 'No data sharing']
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Responsive design optimized for mobile devices with PWA support for app-like experience.',
    benefits: ['Progressive Web App', 'Offline support', 'Touch-optimized', 'Fast loading']
  }
];

const testimonials = [
  {
    name: 'Ahmed Rahman',
    location: 'Dhaka',
    rating: 5,
    text: 'Best expense tracker for Bangladesh! The AI insights helped me save ৳15,000 monthly.'
  },
  {
    name: 'Fatima Khatun',
    location: 'Chittagong', 
    rating: 5,
    text: 'Love how it understands local spending patterns. Finally an app made for Bangladeshis!'
  },
  {
    name: 'Rajib Hasan',
    location: 'Sylhet',
    rating: 5,
    text: 'The Taka support and Bengali interface makes budgeting so much easier.'
  }
];

export default function FeaturesPage() {
  const breadcrumbs = [
    { name: 'Home', url: 'https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app' },
    { name: 'Features', url: 'https://costing-tracker-cxoiu1yv6-sakibs-project.vercel.app/features' }
  ];

  return (
    <>
      <SEOComponent 
        title="Features - AI-Powered Expense Tracking for Bangladesh"
        description="Discover powerful features of Bangladesh smartest expense tracker. AI insights, Taka support, budget management, spending analytics, and more."
        breadcrumbs={breadcrumbs}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Expense Tracker BD
            </Link>
            <Link href="/">
              <Button variant="outline">Back to App</Button>
            </Link>
          </nav>
        </header>

        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Features for 
            <span className="text-blue-600"> Smart Money Management</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how our AI-powered expense tracker helps thousands of Bangladeshis 
            take control of their finances with intelligent insights and local currency support.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Start Tracking Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Everything You Need for Financial Success</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-12">Trusted by Thousands</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl font-bold">10,000+</div>
                <div className="text-blue-200">Active Users</div>
              </div>
              <div>
                <div className="text-4xl font-bold">৳50M+</div>
                <div className="text-blue-200">Tracked Expenses</div>
              </div>
              <div>
                <div className="text-4xl font-bold">95%</div>
                <div className="text-blue-200">User Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold">24/7</div>
                <div className="text-blue-200">AI Support</div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Finances?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of Bangladeshis who are already managing their money smarter with AI.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Expense Tracker BD</h3>
                <p className="text-gray-400">
                  Bangladesh smartest AI-powered expense tracking platform.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Features</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/features" className="hover:text-white">AI Insights</Link></li>
                  <li><Link href="/features" className="hover:text-white">Taka Support</Link></li>
                  <li><Link href="/features" className="hover:text-white">Budget Management</Link></li>
                  <li><Link href="/features" className="hover:text-white">Analytics</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                  <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Facebook</a></li>
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white">Instagram</a></li>
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
