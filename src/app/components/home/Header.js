'use client';

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { useAuthModal } from '../../context/AuthModalContext';
import Image from 'next/image';

export default function Header() {
  const { openLogin, openRegister } = useAuthModal();

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
   

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl shrink-0 lg:mx-0 lg:pt-8">
          <h1 className="text-4xl font-bold text-white">Technical<span className="text-indigo-500">Pathways</span></h1>
          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-white sm:text-7xl">
            Do Leetcode the <span className="relative inline-block">
              <span className="absolute inset-0 bg-indigo-600 px-10 rounded-lg -rotate-1 transform"></span>
              <span className="absolute inset-0 bg-indigo-700 px-10 rounded-lg rotate-1 transform"></span>
              <span className="relative z-10 text-indigo-100 font-bold">right way</span>
            </span>.
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            We use AI to help you build the foundational knowledge and skills you need to ace your next technical interview.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <button
              onClick={openRegister}
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 flex items-center gap-2"
            >
              <FaUserPlus className="w-4 h-4" />
              Create an account
            </button>
            <button 
              onClick={openLogin}
              className="text-sm/6 font-semibold text-white flex items-center gap-2 hover:text-indigo-300 transition-colors"
            >
              <FaSignInAlt className="w-4 h-4" />
              Login
            </button>
          </div>

          {/* Logo Cloud Section */}
          <div className="mt-16 sm:mt-24 border-t border-gray-800 pt-8">
            <p className="text-sm font-semibold leading-6 text-gray-400 mb-6">
              Trusted by engineers from top companies
            </p>
            <div className="mt-4 grid grid-cols-3 md:grid-cols-6 w-full gap-4">
              <div className="relative h-20">
                <Image
                  className="rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                  src="https://logo.clearbit.com/capitalone.com"
                  alt="Capital One"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="relative h-20">
                <Image
                  className="rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                  src="https://logo.clearbit.com/jpmorganchase.com"
                  alt="JPMorgan Chase"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="relative h-20">
                <Image
                  className="rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                  src="https://logo.clearbit.com/anduril.com"
                  alt="Anduril"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="relative h-20">
                <Image
                  className="rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                  src="https://logo.clearbit.com/comcast.com"
                  alt="Comcast"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="relative h-20">
                <Image
                  className="rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                  src="https://logo.clearbit.com/lockheedmartin.com"
                  alt="Lockheed Martin"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div className="relative h-20">
                <Image
                  className="rounded-sm opacity-80 hover:opacity-100 transition-all duration-300"
                  src="https://logo.clearbit.com/nationwide.com"
                  alt="Nationwide"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative w-[76rem] h-[45rem]">
              <Image
                src="/mock.png"
                alt="App screenshot"
                fill
                priority
                className="rounded-md bg-white/5 ring-1 shadow-2xl ring-white/10"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
