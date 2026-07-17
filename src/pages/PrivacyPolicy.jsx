import { useApp } from '../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  const { openModal } = useApp()
  return (
    <>
<section className="pt-36 pb-24 bg-white">
    <div className="max-w-4xl mx-auto px-6 md:px-10">

        <div className="mb-14">
            <p className="text-cyan-700 uppercase tracking-[0.2em] text-xs mb-4">
                Legal
            </p>

            <h1 className="text-5xl md:text-6xl font-semibold mb-6 text-gray-900">
                Privacy Policy
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
                Effective Date: January 2025
            </p>
        </div>

        <div className="space-y-10 text-gray-600 leading-relaxed text-[15px]">

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    1. Introduction
                </h2>

                <p>
                    SkewX Technologies (“SkewX”, “we”, “our”, or “us”)
                    respects your privacy and is committed to protecting
                    your personal information.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. Information We Collect
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Name and contact details</li>
                    <li>Email address and business information</li>
                    <li>Website analytics and device information</li>
                    <li>Communication submitted through forms</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. How We Use Information
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve services</li>
                    <li>Respond to enquiries</li>
                    <li>Enhance website performance</li>
                    <li>Maintain security and compliance</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. Data Security
                </h2>

                <p>
                    We implement appropriate technical and organizational
                    safeguards to protect information against unauthorized
                    access, disclosure, or misuse.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    5. Third-Party Services
                </h2>

                <p>
                    We may use trusted third-party providers for analytics,
                    hosting, communication, and infrastructure services.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    6. Contact
                </h2>

                <p>
                    For privacy-related questions, contact us at:
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