import Image from 'next/image';

const clients = [
  { name: 'L\'Oreal', logo: '/assets/clients/loreal.svg' },
  { name: 'Google', logo: '/assets/clients/google.svg' },
  { name: 'Gilead', logo: '/assets/clients/gilead.svg' },
  { name: 'Gainsight', logo: '/assets/clients/gainsight.svg' },
  { name: 'Ginger', logo: '/assets/clients/ginger.svg' },
  { name: 'BorgWarner', logo: '/assets/clients/borgwarner.svg' },
];

export default function Clients() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          A Few of the Epic Organizations We Work With
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div
              key={client.name}
              className="relative h-16 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={client.logo}
                alt={client.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 