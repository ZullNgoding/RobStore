import { useEffect } from "react";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Shield, 
  Headphones, 
  Tags, 
  Smartphone, 
  History,
  Coins,
  Play,
  Twitter,
  Youtube
} from "lucide-react";

export default function Landing() {
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => document.removeEventListener('click', handleSmoothScroll);
  }, []);

  const robuxPackages = [
    { amount: 80, price: 0.99, popular: false },
    { amount: 400, price: 4.95, popular: true },
    { amount: 800, price: 9.95, popular: false },
    { amount: 1700, price: 19.95, bestValue: true },
  ];

  const features = [
    { icon: Zap, title: "Instant Delivery", description: "Get your Robux delivered to your account within seconds of payment confirmation.", gradient: "from-blue-500 to-blue-700" },
    { icon: Shield, title: "100% Secure", description: "Advanced encryption and secure payment gateways ensure your data is always protected.", gradient: "from-green-500 to-green-600" },
    { icon: Headphones, title: "24/7 Support", description: "Our dedicated support team is available around the clock to assist you.", gradient: "from-purple-500 to-pink-500" },
    { icon: Tags, title: "Best Prices", description: "Competitive pricing with regular discounts and special offers for loyal customers.", gradient: "from-yellow-500 to-orange-500" },
    { icon: Smartphone, title: "Mobile Friendly", description: "Optimized for all devices - purchase Robux easily from your phone or tablet.", gradient: "from-red-500 to-pink-500" },
    { icon: History, title: "Transaction History", description: "Keep track of all your purchases with detailed transaction history and receipts.", gradient: "from-indigo-500 to-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-16">
        {/* Hero Content */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-700 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center animate-in slide-in-from-bottom-8 duration-700">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get <span className="text-yellow-300">Robux</span> Instantly
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                Fast, secure, and reliable Robux top-up service. Join millions of satisfied gamers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => window.location.href = '/api/login'}
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-green-500/25 transition-all duration-200"
                >
                  <Zap className="mr-2" size={20} />
                  Start Top-Up
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold text-lg px-8 py-4 transition-all duration-200"
                >
                  <Play className="mr-2" size={20} />
                  How it Works
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Interactive Container */}
        <div id="robux-3d-preview" className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-[400px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-green-500/10 animate-pulse"></div>
          <div className="text-center text-white z-10">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
              <Coins size={48} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">3D Robux Preview</h3>
            <p className="text-blue-200 max-w-md mx-auto">
              Interactive 3D visualization ready for Three.js integration. This container is optimized for immersive experiences.
            </p>
            <div className="mt-6 text-sm text-blue-300">
              Container ID: #robux-3d-preview | Dimensions: Full-width × 400px minimum
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose RobuxHub?</h2>
            <p className="text-xl text-gray-600">Experience the best Robux top-up service with unmatched benefits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-purple-50">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <Coins className="text-white" size={24} />
                </div>
                <span className="text-2xl font-bold">RobuxHub</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                The most trusted platform for Robux top-ups. Fast, secure, and reliable service for millions of Roblox players worldwide.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Twitter size={20} />
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  <Youtube size={20} />
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-600 mt-12 pt-8 text-center">
            <p className="text-gray-300">
              © 2024 RobuxHub. All rights reserved. Not affiliated with Roblox Corporation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
