import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Globe, Github } from 'lucide-react';
import KampusKartNavbar from './KampusKartNavbar';
import { ShuffleHero } from './ui/shuffle-grid';
import { Footer } from './ui/footer';

const socialLinks = [
  { href: 'https://www.instagram.com/gaurav_khandelwal_/', label: 'Instagram', icon: <Instagram className="h-4 w-4" /> },
  { href: 'https://www.linkedin.com/in/gaurav-khandelwal-17a127358/', label: 'LinkedIn', icon: <Linkedin className="h-4 w-4" /> },
  { href: 'https://gaurav-khandelwal.vercel.app/', label: 'Portfolio', icon: <Globe className="h-4 w-4" /> },
  { href: 'https://github.com/Gaurav-205', label: 'GitHub', icon: <Github className="h-4 w-4" /> },
];

const steps = [
  { iconBg: 'bg-[#181818]', number: '1', title: 'Explore Features', desc: 'Browse all the smart tools KampusKart offers for your campus life.' },
  { iconBg: 'bg-[#00C6A7]', number: '2', title: 'Sign Up Instantly', desc: 'Create your account in seconds and personalize your experience.' },
  { iconBg: 'bg-[#F05A25]', number: '3', title: 'Enjoy Campus Life', desc: 'Access everything you need, stay updated, and connect with your campus.' },
];

const Landing: React.FC = () => {
  return (
    <>
      <KampusKartNavbar />
      <div className="bg-white font-sans pt-[72px]">

        {/* Hero — full viewport minus navbar */}
        <div className="min-h-[calc(100vh-72px)] w-full flex items-center overflow-hidden py-8 md:py-0">
          <ShuffleHero />
        </div>

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <div className="border-t-2 border-gray-200" />
        </div>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-16">
          <div className="mb-8 md:mb-10 text-center md:text-left">
            <span className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg bg-gray-50 border-2 border-gray-200 text-xs font-semibold text-[#00C6A7] uppercase tracking-widest">
              Simple by design
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black mb-3" style={{ letterSpacing: '-0.01em' }}>
              Here's how it works
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500">More living, less searching.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-4 sm:p-5 md:p-6 bg-white border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200">
                <div className={`mb-3 md:mb-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg font-extrabold text-base sm:text-lg text-white ${step.iconBg}`}>
                  {step.number}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-black mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center md:text-left">
            <Link
              to="/signup"
              className="inline-block px-6 sm:px-8 py-3 rounded-lg font-bold text-white bg-[#181818] hover:bg-[#00C6A7] transition-colors duration-200 text-sm sm:text-base min-h-touch"
            >
              Sign up free
            </Link>
          </div>
        </section>

        {/* Footer */}
        <Footer
          logo={<img src="/Logo.png" alt="KampusKart Logo" className="h-7 w-7" />}
          brandName="KampusKart"
          socialLinks={socialLinks}
          mainLinks={[
            { href: '/', label: 'Home' },
            { href: '/login', label: 'Sign In' },
            { href: '/signup', label: 'Sign Up' },
          ]}
          legalLinks={[
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms', label: 'Terms' },
          ]}
          copyright={{
            text: `© ${new Date().getFullYear()} KampusKart`,
            license: 'All rights reserved.',
          }}
        />

      </div>
    </>
  );
};

export default Landing;
