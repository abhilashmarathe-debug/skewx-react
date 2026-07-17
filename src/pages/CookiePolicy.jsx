import { useApp } from '../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function CookiePolicy() {
  const { openModal } = useApp()
  return (
    <>
<section className="pt-40 pb-24 bg-white">
    <div className="max-w-5xl mx-auto px-6 md:px-10">

        <div className="mb-14">
            <span className="text-cyan-700 text-sm tracking-[0.2em] uppercase">
                Legal
            </span>

            <h1 className="text-5xl md:text-6xl font-semibold mt-4 mb-6 text-gray-900">
                Cookie Policy
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
                Effective Date: January 2025
            </p>
        </div>

        <div className="space-y-10 text-gray-600 leading-relaxed text-[15px]">

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    1. What Are Cookies?
                </h2>

                <p>
                    Cookies are small text files stored on your device to improve website functionality and analytics.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. How We Use Cookies
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Website performance and analytics</li>
                    <li>User preferences and settings</li>
                    <li>Security and session management</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. Managing Cookies
                </h2>

                <p>
                    Users may disable cookies through browser settings, though some website functionality may be affected.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. Contact
                </h2>

                <p>
                    For questions about cookies or data usage:
                    <br />
                    <a href="mailto:contact@skewx.com" className="text-cyan-700 font-medium hover:text-cyan-800 transition-colors">
                        contact@skewx.com
                    </a>
                </p>
            </div>

        </div>

    </div>
</section>
    </>
  )
}