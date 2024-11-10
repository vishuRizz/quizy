import React from 'react'

function Footer() {
  return (
    <div>
      <footer className="py-10 bg-gray-800">
        <div className="container px-6 mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Quizy. All rights reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="/about" className="text-gray-400 hover:text-white">About</a>
            <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
            <a href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
