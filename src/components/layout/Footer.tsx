import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const footerLinks = {
  shop: [
    { name: "Best Sellers", path: "/best-sellers" },
    { name: "Gift Cards", path: "/gift-cards" },
  ],
  help: [
    { name: "FAQs", path: "/faq" },
    { name: "Shipping", path: "/shipping" },
    { name: "Returns", path: "/returns" },

  ],
  about: [
    { name: "Our Story", path: "/about" },
    { name: "Sustainability", path: "/sustainability" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="border-b border-background/20">
        <div className="container py-16">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-4xl md:text-5xl mb-4">JOIN THE MOVEMENT</h3>
            <p className="text-background/60 mb-8 text-sm">
              Subscribe for exclusive drops, early access & 10% off your first order
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent border border-background/30 px-6 py-4 text-sm placeholder:text-background/40 focus:outline-none focus:border-background transition-colors"
              />
              <button type="submit" className="bg-background text-foreground px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-background/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="block max-w-[180px]">
              <img src="/logo-white.png" alt="OPPOZITE" className="w-full h-auto" />
            </Link>
            <p className="mt-4 text-sm text-background/60 max-w-xs">
              Premium streetwear for those who dare to be different. Stand out. Be authentic.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/oppozite.eg?igsh=aG40MDZhNTZobWdn&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 border border-background/30 hover:bg-background hover:text-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/1ZtnxAUmdd/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-2 border border-background/30 hover:bg-background hover:text-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@oppozite.eg?_r=1&_t=ZS-928atypcjH0" target="_blank" rel="noopener noreferrer" className="p-2 border border-background/30 hover:bg-background hover:text-foreground transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 tracking-wide">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 tracking-wide">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4 tracking-wide">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-background/60 hover:text-background transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-background/20">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/40">
          <p>© 2026 <b style={{ color: "#fff" }}>Oppozite</b>. Made with <span style={{ color: "#fff" }}>❤️</span> by <a href="https://fahdscode.me" style={{ color: "#fff" }}>Fahd's Code</a></p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-background transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
