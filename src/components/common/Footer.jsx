const Footer = () => {
  
    return (
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EduPlatform</h3>
              <p className="text-gray-300 text-sm">
                Plateforme d'apprentissage en ligne offrant des cours de qualité dans divers domaines.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-gray-300 hover:text-white transition">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="/courses" className="text-gray-300 hover:text-white transition">
                    Cours
                  </a>
                </li>
                <li>
                  <a href="/categories" className="text-gray-300 hover:text-white transition">
                    Catégories
                  </a>
                </li>
                <li>
                  <a href="/tags" className="text-gray-300 hover:text-white transition">
                    Tags
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  contact@eduplatform.com
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +33 1 23 45 67 89
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-sm text-gray-400 text-center">
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  