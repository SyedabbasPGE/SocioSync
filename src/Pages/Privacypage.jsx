import React from "react";

const Privacy = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
    

      <div className="space-y-6 mt-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Account Information:</strong> Name, email address, and
              login credentials for TikTok accounts.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with the Service.
            </li>
            <li>
              <strong>Cookies:</strong> Data collected through cookies for
              analytics and performance optimization.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>To provide and maintain the Service.</li>
            <li>To improve user experience and develop new features.</li>
            <li>To communicate with you about updates, offers, or support.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            3. Sharing Your Information
          </h2>
          <p>
            We do not sell, rent, or share your information with third parties
            except:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>When required by law.</li>
            <li>To protect our rights or comply with legal processes.</li>
            <li>
              With trusted partners for the functionality of the Service (e.g.,
              hosting providers).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your
            information. However, no method of transmission or storage is 100%
            secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">5. User Rights</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Access and Update:</strong> You can access and update your
              account information.
            </li>
            <li>
              <strong>Data Deletion:</strong> You can request the deletion of
              your personal data by contacting us.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            6. Third-Party Integrations
          </h2>
          <p>
            Our Service integrates with TikTok. Your use of TikTok through the
            Service is subject to TikTok's privacy policy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            7. Changes to the Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of changes by posting the new policy on our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:sultan@pangeaglobalinvestments.com"
              className="text-blue-400"
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

export default Privacy;
