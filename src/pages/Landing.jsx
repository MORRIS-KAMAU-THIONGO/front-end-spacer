import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui'

export const Landing = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Book Unique Spaces for Your Events
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect with space owners and discover the perfect venue for your meeting, event, or activity
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/spaces">
              <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-gray-100">
                Browse Spaces
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Link to="/spaces">
              <Button variant="outline" size="md" className="bg-white text-primary hover:bg-gray-100">
                I'm a Client
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="secondary" size="md">
                I'm a Space Owner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-light">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Why Choose Spacer?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Easy Discovery</h3>
              <p className="text-gray-600">
                Find the perfect space with detailed descriptions, images, and reviews from real users.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden fees. See exactly what you're paying before you book with our clear pricing model.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Secure Bookings</h3>
              <p className="text-gray-600">
                Your bookings are protected with our secure payment system and booking agreement.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Mobile Friendly</h3>
              <p className="text-gray-600">
                Book spaces on the go with our mobile-responsive design that works everywhere.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Reviews & Ratings</h3>
              <p className="text-gray-600">
                Make informed decisions based on honest reviews and ratings from the community.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">
                Join a community of passionate people sharing their spaces and experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-dark text-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Space?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of people using Spacer to find and book amazing spaces
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary">
              Sign Up for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Landing
