import Image from "next/image"
import Link from "next/link"

export function OfficialFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gradient-to-b from-hhs-navy to-hhs-dark py-12">
      <div className="container mx-auto px-4">
        {/* Official Seals Section */}
        <div className="mb-8">
          <h3 className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-white/70">
            Official Government Partners
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {/* HHS Seal */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf722ceb-e7b9-4590-948e-681c5bcaffa1-dgMfg1h5S5kjnl0vai88AXFuzuE0Jy.jpeg"
                alt="Department of Health & Human Services USA"
                width={120}
                height={120}
                className="rounded-full shadow-lg ring-2 ring-white/20"
              />
              <span className="text-center text-xs text-white/60">HHS</span>
            </div>

            {/* FBI Seal */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4061-w5s8Ph185n7JItKkNGdrCYWpaxEfEe.jpeg"
                alt="Federal Bureau of Investigation"
                width={120}
                height={120}
                className="rounded-full shadow-lg ring-2 ring-white/20"
              />
              <span className="text-center text-xs text-white/60">FBI</span>
            </div>

            {/* Power of Attorney Seal */}
            <div className="flex flex-col items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4063-Mb0IBp4cELzLG5qg1jOMZyv2F5xpjC.jpeg"
                alt="Power of Attorney"
                width={120}
                height={120}
                className="rounded-full shadow-lg ring-2 ring-white/20"
              />
              <span className="text-center text-xs text-white/60">Legal Authority</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Footer Links */}
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="mb-3 font-semibold text-white">About</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/about" className="hover:text-white">
                  About HHS Grants
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-white">
                  Grant Guidelines
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Resources</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/grants" className="hover:text-white">
                  Available Grants
                </Link>
              </li>
              <li>
                <Link href="/my-applications" className="hover:text-white">
                  My Applications
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/accessibility" className="hover:text-white">
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} U.S. Department of Health & Human Services</p>
          <p className="mt-2">Official Government Grant Portal</p>
        </div>
      </div>
    </footer>
  )
}
