import { Mail, Phone, Linkedin, Github } from "lucide-react";

function MyProfile() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6 py-10 md:px-12">
      {/* Placeholder message since Figma didn’t define this page */}
      <section className="text-center max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          Not a blank page by accident.
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          This page wasn’t left empty because I couldn’t design it — I chose to
          follow the Figma design exactly as provided. I’m still exploring my
          own design instincts, and this layout reflects that journey. More
          custom designs coming soon!
        </p>
        <p className="text-gray-700 leading-relaxed">
          Accidentally landed here? Use the nav to head back. But if you liked
          what you saw 👀 — hire me 💫. One shot is all I need to make your
          product shine ✨ and your users smile.
        </p>
      </section>

      {/* Profile Card */}
      <section className="bg-white rounded-2xl shadow-md w-full max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="px-8 md:px-10 py-8 bg-gradient-to-r from-purple-50/70 to-white">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide text-gray-900 text-center md:text-left">
            BASSA NAGA JALA SURYANARAYANA
          </h2>

          {/* Contact Details */}
          <div className="mt-5 flex flex-col md:flex-row md:items-center md:space-x-6 text-sm text-gray-700 space-y-2 md:space-y-0">
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              <span>+91 9133661525</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              <a
                href="mailto:bassanagasurya@gmail.com"
                className="hover:underline"
              >
                bassanagasurya@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Linkedin size={16} className="text-gray-500" />
              <a
                href="https://linkedin.com/in/bassa-nagasuya"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                linkedin.com/in/bassa-nagasuya
              </a>
            </div>

            <div className="flex items-center gap-2">
              <Github size={16} className="text-gray-500" />
              <a
                href="https://github.com/Nagasurya07"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                github.com/Nagasurya07
              </a>
            </div>
          </div>

          {/* Intro */}
          <div className="mt-6 space-y-3 text-center md:text-left">
            <p>
              If you’ve come this far, you might as well explore more about me!
            </p>
            <p>
              I’m a passionate software developer with a keen interest in
              building impactful applications. Let’s connect!
            </p>
            <a
              href="https://linkedin.com/in/bassa-nagasuya"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-all"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}


export default MyProfile;
