import { useApp } from '../lib/AppContext.jsx'
import { Link } from 'react-router-dom'

export default function Terms() {
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
                Terms of Service
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed">
                Effective Date: January 2025
            </p>

        </div>

        <div className="space-y-10 text-gray-600 leading-relaxed text-[15px]">

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    1. Acceptance of Terms
                </h2>

                <p>
                    By accessing or using SkewX Technologies services,
                    you agree to comply with these Terms of Service.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    2. Services
                </h2>

                <p>
                    SkewX provides AI automation, software solutions,
                    and related technology services.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    3. User Responsibilities
                </h2>

                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate information</li>
                    <li>Use services lawfully</li>
                    <li>Avoid misuse or unauthorized access</li>
                </ul>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    4. Intellectual Property
                </h2>

                <p>
                    All branding, software, and content remain the
                    intellectual property of SkewX Technologies unless
                    otherwise stated.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    5. Limitation of Liability
                </h2>

                <p>
                    SkewX Technologies shall not be liable for indirect
                    or consequential damages arising from use of the services.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    6. Contact
                </h2>

                <p>
                    For legal enquiries:
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