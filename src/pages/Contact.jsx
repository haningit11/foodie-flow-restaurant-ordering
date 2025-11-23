import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-foodie-charcoal mb-12 text-center">Contact Us</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-bold text-foodie-charcoal mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foodie-charcoal mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-foodie-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodie-orange bg-white text-foodie-charcoal"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foodie-charcoal mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-foodie-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodie-orange bg-white text-foodie-charcoal"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foodie-charcoal mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-foodie-charcoal/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodie-orange bg-white text-foodie-charcoal"
                  rows="6"
                  placeholder="Your message..."
                  required
                />
              </div>
              <Button text="Send Message" type="submit" variant="primary" className="w-full" />
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <h2 className="text-2xl font-bold text-foodie-charcoal mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foodie-charcoal mb-2">Address</h3>
                  <p className="text-foodie-charcoal/70">
                    123 Food Street<br />
                    Culinary City, CC 12345<br />
                    Lebanon
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foodie-charcoal mb-2">Phone</h3>
                  <p className="text-foodie-charcoal/70">(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foodie-charcoal mb-2">Email</h3>
                  <p className="text-foodie-charcoal/70">info@foodieflow.com</p>
                </div>
                <div>
                  <h3 className="font-semibold text-foodie-charcoal mb-2">Hours</h3>
                  <p className="text-foodie-charcoal/70">
                    Monday - Friday: 11:00 AM - 10:00 PM<br />
                    Saturday - Sunday: 10:00 AM - 11:00 PM
                  </p>
                </div>
              </div>
            </Card>

            
          {/* Map Section */}
          <Card>
            <h3 className="font-semibold text-foodie-charcoal mb-4">Find Us</h3>
            <div className="rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.903017708491!2d-73.98565668459386!3d40.74881707932744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU2LjAiTiA3M8KwNTknMTYuMCJX!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

