import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetFooter } from './sheet';
import { Button, buttonVariants } from './button';
import { MenuToggle } from './menu-toggle';

interface MenuItem {
  label: string;
  href: string;
  items?: MenuItem[];
}

interface SimpleHeaderProps {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
      onClick?: () => void;
    };
  };
}

export function SimpleHeader({
  logo,
  menu = [],
  auth = {
    login: { text: 'Log in', url: '#' },
    signup: { text: 'Sign up', url: '#' },
  },
}: SimpleHeaderProps) {
  const [open, setOpen] = React.useState(false);

  // Flatten menu items for mobile view
  const flattenedLinks = React.useMemo(() => {
    const links: { label: string; href: string }[] = [];
    menu.forEach((item) => {
      if (item.items) {
        item.items.forEach((subItem) => {
          links.push({ label: subItem.label, href: subItem.href });
        });
      } else {
        links.push({ label: item.label, href: item.href });
      }
    });
    return links;
  }, [menu]);

  return (
    <header className="bg-white/95 supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 w-full border-b border-gray-100 backdrop-blur-lg shadow-sm">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to={logo.url} className="flex items-center gap-2 focus:outline-none" aria-label="Go to home page">
          <img src={logo.src} className="w-8 h-8" alt={logo.alt} />
          <p className="text-lg font-extrabold text-black tracking-tight">{logo.title}</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {menu.map((link) => {
            if (link.items) {
              // For dropdown items, show all sub-items as individual links
              return link.items.map((subItem) => (
                <Link
                  key={subItem.label}
                  className={buttonVariants({ variant: 'ghost', className: 'text-black hover:bg-[#00C6A7] hover:text-white transition-colors' })}
                  to={subItem.href}
                >
                  {subItem.label}
                </Link>
              ));
            }
            return (
              <Link
                key={link.label}
                className={buttonVariants({ variant: 'ghost', className: 'text-black hover:bg-[#00C6A7] hover:text-white transition-colors' })}
                to={link.href}
              >
                {link.label}
              </Link>
            );
          })}
          <Button asChild variant="outline" className="text-black bg-white border border-gray-300 hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] transition-colors">
            <Link to={auth.login.url}>{auth.login.text}</Link>
          </Button>
          {auth.signup.onClick ? (
            <Button onClick={auth.signup.onClick} className="bg-[#181818] text-white hover:bg-[#00C6A7] hover:text-white transition-colors shadow-sm hover:shadow-md">
              {auth.signup.text}
            </Button>
          ) : (
            <Button asChild className="bg-[#181818] text-white hover:bg-[#00C6A7] hover:text-white transition-colors shadow-sm hover:shadow-md">
              <Link to={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <Button 
            size="icon" 
            variant="outline" 
            className="lg:hidden h-11 w-11 border-2 border-gray-300 bg-white hover:bg-[#00C6A7] hover:border-[#00C6A7] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={() => setOpen(!open)}
          >
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-6"
            />
          </Button>
          <SheetContent
            className="bg-white/95 supports-[backdrop-filter]:bg-white/80 gap-0 backdrop-blur-lg w-[90vw] sm:w-[420px] max-w-md"
            showClose={false}
            side="left"
          >
            {/* Mobile Logo Header */}
            <div className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-[#00C6A7] to-[#009e87]">
              <Link to={logo.url} className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <img src={logo.src} className="w-10 h-10" alt={logo.alt} />
                <span className="text-xl font-extrabold text-white tracking-tight">
                  {logo.title}
                </span>
              </Link>
            </div>

            {/* Mobile Menu Links */}
            <div className="grid gap-y-2 overflow-y-auto px-4 pt-6 pb-5">
              {flattenedLinks.map((link) => (
                <Link
                  key={link.label}
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'justify-start text-gray-900 hover:text-[#00C6A7] hover:bg-gray-50 transition-all rounded-xl text-base font-bold',
                  })}
                  to={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Auth Buttons */}
            <SheetFooter>
              <Button asChild variant="outline" className="w-full h-12 text-base text-black bg-white border-2 border-gray-300 hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] transition-colors font-bold rounded-xl">
                <Link to={auth.login.url} onClick={() => setOpen(false)}>{auth.login.text}</Link>
              </Button>
              {auth.signup.onClick ? (
                <Button 
                  onClick={() => {
                    auth.signup.onClick?.();
                    setOpen(false);
                  }} 
                  className="w-full h-12 text-base bg-[#00C6A7] text-white hover:bg-[#009e87] hover:text-white transition-colors shadow-sm hover:shadow-md font-bold rounded-xl"
                >
                  {auth.signup.text}
                </Button>
              ) : (
                <Button asChild className="w-full h-12 text-base bg-[#00C6A7] text-white hover:bg-[#009e87] hover:text-white transition-colors shadow-sm hover:shadow-md font-bold rounded-xl">
                  <Link to={auth.signup.url} onClick={() => setOpen(false)}>{auth.signup.text}</Link>
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
