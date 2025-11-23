import React from 'react';
import Card from '../components/ui/Card';
import { FaAward, FaHeart, FaLeaf, FaUsers, FaStar, FaUtensils } from 'react-icons/fa';
import sarah from '../assets/images/sarah.jpg';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Chef Maria Rodriguez',
      role: 'Executive Chef & Founder',
      bio: 'Michelin-trained with over 15 years of culinary excellence. Maria brings innovative techniques while honoring traditional flavors.',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
      specialties: ['French Cuisine', 'Molecular Gastronomy', 'Farm-to-Table'],
    },
    {
      name: 'Chef James Wellington',
      role: 'Sous Chef',
      bio: 'Specialized in Mediterranean and Middle Eastern cuisine. James ensures every plate tells a story through balanced flavors and artistic presentation.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400',
      specialties: ['Mediterranean', 'Spice Blending', 'Plate Composition'],
    },
    {
      name: 'Sarah Chen',
      role: 'Pastry Chef',
      bio: 'Le Cordon Bleu graduate creating exquisite desserts that perfectly complement our savory offerings while pushing creative boundaries.',
      image: sarah,
      specialties: ['French Patisserie', 'Chocolate Work', 'Modern Plating'],
    },
  ];

  const values = [
    {
      icon: FaLeaf,
      title: 'Sustainable Sourcing',
      description:
        'We partner with local farms and ethical suppliers to ensure the highest quality ingredients while supporting our community.',
    },
    {
      icon: FaHeart,
      title: 'Passion-Driven',
      description:
        'Every dish is crafted with genuine care and attention to detail, reflecting our love for culinary excellence.',
    },
    {
      icon: FaUtensils,
      title: 'Innovative Cuisine',
      description:
        'We blend traditional techniques with modern creativity to deliver unique and memorable dining experiences.',
    },
    {
      icon: FaUsers,
      title: 'Community Focus',
      description:
        'Building relationships through food—we believe in creating connections that extend beyond the plate.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-foodie-cream to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-foodie-charcoal text-white overflow-hidden">
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/70 z-0"></div> 
  <img
    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    alt="Restaurant interior"
    className="absolute inset-0 w-full h-full object-cover z-0"
  />
  <div className="relative z-10 max-w-screen-xl mx-auto px-4 text-center">
    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
      Crafting Culinary
      <span className="block text-foodie-primary">Excellence</span>
    </h1>
   
  </div>
</section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
                  alt="Our kitchen"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-foodie-primary/20 rounded-full z-0"></div>
            </div>

            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-foodie-primary/10 rounded-full text-foodie-primary font-semibold text-sm mb-4">
                Our Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foodie-charcoal leading-tight">
                A Legacy of <span className="text-foodie-primary">Flavor</span> & Innovation
              </h2>
              <p className="text-lg text-foodie-charcoal/70 leading-relaxed">
                Founded in 2020, FoodieFlow emerged from a simple yet powerful vision: to redefine casual fine dining by blending culinary artistry with approachable elegance.
              </p>
              <p className="text-lg text-foodie-charcoal/70 leading-relaxed">
                Our philosophy centers on the belief that exceptional dining should be accessible, memorable, and consistently surprising. We challenge conventions while respecting traditions, creating dishes that tell stories and evoke emotions.
              </p>
              <div className="pt-6 flex items-center gap-8 text-sm text-foodie-charcoal/60">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-foodie-primary rounded-full"></div>
                  Michelin-trained Chefs
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-foodie-primary rounded-full"></div>
                  Locally Sourced Ingredients
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-foodie-primary rounded-full"></div>
                  Sustainable Practices
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-foodie-charcoal text-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide every decision we make and every dish we create
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="bg-white/5 border-white/10 text-center p-8 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <value.icon className="text-3xl text-foodie-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300 leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foodie-charcoal mb-4">Meet Our Culinary Artists</h2>
            <p className="text-xl text-foodie-charcoal/70 max-w-2xl mx-auto">
              The talented individuals who bring creativity, expertise, and passion to your plate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="group text-center p-8 hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-foodie-primary/20"
              >
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-foodie-primary/20 group-hover:border-foodie-primary transition-colors duration-300">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-foodie-primary text-white px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                                       {member.role}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foodie-charcoal mb-2">{member.name}</h3>
                <p className="text-foodie-charcoal/70 mb-6 leading-relaxed">{member.bio}</p>

                <div className="space-y-2">
                  {member.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      className="text-sm text-foodie-primary font-medium bg-foodie-primary/10 px-3 py-1 rounded-full inline-block mx-1"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-foodie-primary to-foodie-orange text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Excellence?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join us for an unforgettable culinary journey where every detail matters and every flavor tells a story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Link to Menu */}
            <Link
              to="/menu"
              className="px-8 py-4 bg-white text-foodie-charcoal font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              View Our Menu
            </Link>

            {/* Link to Order */}
            <Link
              to="/order"
              className="px-8 py-4 bg-foodie-charcoal border border-white font-semibold rounded-lg hover:bg-black/80 transition-colors duration-300"
            >
              Place an Order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;