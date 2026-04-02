import Link from "next/link"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-screen-xl p-4 py-8">
        <div className="md:flex md:justify-between">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-7"
                alt="SGME Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-foreground">
                SGME
              </span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-xs">
              Système de Gestion de Maintenance d'Équipement. 
              Gérez efficacement vos équipements et maintenances.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-6 sm:gap-6 sm:grid-cols-3">
            {/* Company Links */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">Company</h2>
              <ul className="text-muted-foreground text-sm">
                <li className="mb-2">
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/careers" className="hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/team" className="hover:text-primary">
                    Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">Legal</h2>
              <ul className="text-muted-foreground text-sm">
                <li className="mb-2">
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/terms" className="hover:text-primary">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/cookies" className="hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-foreground">Resources</h2>
              <ul className="text-muted-foreground text-sm">
                <li className="mb-2">
                  <Link href="/documentation" className="hover:text-primary">
                    Documentation
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/support" className="hover:text-primary">
                    Support
                  </Link>
                </li>
                <li className="mb-2">
                  <Link href="/faq" className="hover:text-primary">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="my-6 border-border sm:mx-auto lg:my-8" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-muted-foreground sm:text-center">
            © {currentYear}{" "}
            <Link href="/" className="hover:text-primary">
              SGME
            </Link>
            . All Rights Reserved.
          </span>

          {/* Social Links */}
          <div className="flex mt-4 sm:justify-center sm:mt-0 gap-4">
            {/* Facebook */}
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 8 19" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            
            {/* Twitter/X */}
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 8 19" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            
            {/* GitHub */}
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">GitHub</span>
            </Link>
            
            {/* LinkedIn */}
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
