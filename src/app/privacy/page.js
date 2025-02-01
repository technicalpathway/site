'use client';

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-400 leading-relaxed">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-400 space-y-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Profile information</li>
              <li>Usage data and preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-400 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-400 space-y-2">
              <li>Provide and maintain our service</li>
              <li>Personalize your experience</li>
              <li>Improve our platform</li>
              <li>Communicate with you</li>
              <li>Ensure security of our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-400 leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-400 space-y-2">
              <li>With your consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and safety</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-gray-400 leading-relaxed">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-400 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-400 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to data processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
            <p className="text-gray-400 leading-relaxed">
              We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Privacy Policy</h2>
            <p className="text-gray-400 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the date at the top.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 