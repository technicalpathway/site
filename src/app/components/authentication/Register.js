'use client';

import { FaGoogle, FaGithub, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 z-40"
          />
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-50"
          >
            <div className="relative min-h-screen">
              {/* Close button */}
              <motion.button 
                onClick={onClose}
                className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTimes className="w-6 h-6" />
              </motion.button>

              <div className="flex min-h-screen">
                {/* Left side - Registration form */}
                <motion.div 
                  className="w-1/2 flex items-center justify-center p-8"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="max-w-md w-full space-y-8">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-4xl font-bold text-white">Create an account</h2>
                      <p className="mt-4 text-lg text-gray-400">
                        Join TechnicalPathways and start your journey
                      </p>
                    </motion.div>

                    <div className="space-y-4">
                      {/* OAuth Buttons */}
                      <motion.button 
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-400 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaGoogle className="w-5 h-5" />
                        Sign up with Google
                      </motion.button>
                      <motion.button 
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-600 text-sm font-medium rounded-lg text-white hover:bg-gray-800 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaGithub className="w-5 h-5" />
                        Sign up with GitHub
                      </motion.button>

                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-gray-900 text-gray-400">Or sign up with email</span>
                        </div>
                      </div>

                      {/* Registration Form */}
                      <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                              First name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                              Last name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="you@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-lg bg-gray-800 border-gray-700 text-white px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            placeholder="••••••••"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-indigo-500 focus:ring-indigo-500"
                          />
                          <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                            I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms</a> and{' '}
                            <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>
                          </label>
                        </div>
                        <motion.button
                          type="submit"
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Create account
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </motion.div>

                {/* Right side - Image/Illustration */}
                <motion.div 
                  className="w-1/2 bg-gray-800 flex items-center justify-center p-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="max-w-lg text-center">
                    <motion.h3 
                      className="text-2xl font-bold text-white mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Level up your interview skills
                    </motion.h3>
                    <motion.p 
                      className="text-gray-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Get personalized learning paths, AI-powered feedback, and join a community of developers preparing for technical interviews.
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 