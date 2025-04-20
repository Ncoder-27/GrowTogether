const testimonials = [
  {
    quote: "There's no doubt that we are a much stronger unit now. Super valuable.",
    author: "Karan Singh",
    position: "COO, Ginger",
  },
  {
    quote: "What we've learned and applied to date has set our company up to be in a much stronger position now than ever before.",
    author: "Stephanie Binette",
    position: "General Manager at NYX",
  },
];

export default function Testimonials() {
  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Results that WOW
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-lg"
            >
              <blockquote className="text-lg italic text-gray-600 mb-4">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-blue-600 font-medium">
                {testimonial.author}, {testimonial.position}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 