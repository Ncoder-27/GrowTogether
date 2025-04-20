import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/">
              <Image
                src="/assets/logo.svg"
                alt="Epic Teams Logo"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a 
                href="#about" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                About
              </a>
              <a 
                href="#services" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Services
              </a>
              <a 
                href="#results" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Results
              </a>
              <a 
                href="#resources" 
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Resources
              </a>
              <a
                href="#contact"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
} 