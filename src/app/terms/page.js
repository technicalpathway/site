'use client';

export default function TermsOfService() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              By accessing and using TechnicalPathways, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Description of Service</h2>
            <p className="text-gray-400 leading-relaxed">
              TechnicalPathways provides an AI-powered platform for technical interview preparation. We offer coding practice, personalized feedback, and learning resources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
            <p className="text-gray-400 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Acceptable Use</h2>
            <p className="text-gray-400 leading-relaxed">
              You agree not to:
            </p>
            <ul className="list-disc list-inside mt-2 text-gray-400 space-y-2">
              <li>Use the service for any illegal purpose</li>
              <li>Share account credentials with others</li>
              <li>Attempt to circumvent any security measures</li>
              <li>Upload malicious code or content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. Intellectual Property</h2>
            <p className="text-gray-400 leading-relaxed">
              All content and materials available on TechnicalPathways, including but not limited to text, graphics, website name, code, images, and logos are the intellectual property of TechnicalPathways.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Termination</h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
            <p className="text-gray-400 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any changes by updating the date at the top of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
            <p className="text-gray-400 leading-relaxed">
              If you have any questions about these Terms, please contact us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 