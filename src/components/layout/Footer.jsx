import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-2">Spacer</h3>
            <p className="text-sm text-gray-400">
              An online marketplace for booking unique spaces for meetings, events, and activities.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/spaces" className="text-gray-400 hover:text-primary transition">
                  Browse Spaces
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} Spacer. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.87.39-1.8.65-2.77.77 1-1 1.76-2.09 2.13-3.62-1.04.62-2.19 1.07-3.41 1.31-.98-1.05-2.38-1.7-3.91-1.7-2.96 0-5.36 2.4-5.36 5.36 0 .42.05.83.14 1.22-4.45-.23-8.39-2.35-11.03-5.59-.46.8-.73 1.73-.73 2.73 0 1.86.94 3.5 2.38 4.46-.88-.03-1.71-.27-2.43-.67v.07c0 2.6 1.85 4.77 4.3 5.26-.45.12-.93.19-1.42.19-.35 0-.69-.03-1.02-.1.69 2.14 2.67 3.7 5.02 3.74-1.84 1.44-4.15 2.29-6.65 2.29-.43 0-.86-.03-1.28-.08 2.38 1.53 5.21 2.42 8.24 2.42 9.88 0 15.27-8.18 15.27-15.27 0-.23 0-.47-.01-.7 1.05-.76 1.96-1.72 2.68-2.8z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.04C6.5 2.04 2 6.53 2 12.09c0 5.02 3.66 9.15 8.44 9.88v-6.99h-2.54V12.09h2.54V9.94c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.45h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.77l-.44 2.89h-2.33v6.99c4.78-.73 8.44-4.86 8.44-9.88 0-5.56-4.5-10.05-10-10.05z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
