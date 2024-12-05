import React from "react";

const Terms = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
      <div className="w-11/12 max-w-3xl mx-auto bg-gradient-to-br from-gray-800 via-gray-700 to-slate-900 text-white p-6 rounded-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Terms and Conditions
        </h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
          <p>
            By using SocioSync (the "Service"), you agree to these Terms and
            Conditions. If you do not agree, you may not use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">2. Service Overview</h2>
          <p>
            SocioSync allows users to manage up to 80 TikTok accounts, post
            directly, and schedule TikTok posts with a specific date and time.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">3. User Responsibilities</h2>
          <ul className="list-disc pl-6">
            <li>
              You must provide accurate and current information during
              registration.
            </li>
            <li>
              You are responsible for maintaining the security of your account
              credentials.
            </li>
            <li>
              You must comply with TikTok's terms of service and community
              guidelines.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">4. Restrictions</h2>
          <ul className="list-disc pl-6">
            <li>
              You may not use the Service for illegal activities or to violate
              TikTok's policies.
            </li>
            <li>You may not share your account with unauthorized users.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
          <p>
            SocioSync is not responsible for any account suspensions, bans, or
            penalties imposed by TikTok due to misuse of the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">6. Intellectual Property</h2>
          <p>
            All content, design, and features of SocioSync are the intellectual
            property of [Your Company Name] and may not be reproduced without
            permission.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">7. Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to the
            Service if you violate these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            8. Modifications to the Terms
          </h2>
          <p>
            We may update these Terms and Conditions from time to time.
            Continued use of the Service after updates constitutes acceptance of
            the changes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>
            If you have questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:sultan@pangeaglobalinvestments.com"
              className="text-yellow-400 hover:text-white"
            >
              sultan@pangeaglobalinvestments.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
