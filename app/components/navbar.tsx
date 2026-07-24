export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-6 backdrop-blur-md bg-black/30 border-b border-white/10">

      <h1 className="text-2xl font-bold text-white">
        MENU
      </h1>

      <div className="flex gap-6 text-white">

        <a href="#home" className="hover:text-blue-400 transition">
          Home
        </a>

        <a href="#stories" className="hover:text-blue-400 transition">
          Stories
        </a>
        
        <a href="#gallery" className="hover:text-blue-400 transition">
          Gallery
        </a>

        <a href="#contact" className="hover:text-blue-400 transition">
          Contact
        </a>
      </div>

    </nav>
  );
}