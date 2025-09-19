export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Links */}
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Acknowledgments
            </a>
          </div>

          {/* Attribution */}
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>Data from Argo Program, Visualization powered by FloatChat.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
