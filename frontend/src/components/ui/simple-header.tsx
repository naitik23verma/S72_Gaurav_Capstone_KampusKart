import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetFooter } from './sheet';
import { Button, buttonVariants } from './button';
import { MenuToggle } from './menu-toggle';

interface SimpleHeaderProps {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  links: {
    label: string;
    href: string;
  }[];
  auth: {
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

export function SimpleHeader({ logo, links, auth }: SimpleHeaderProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="bg-white/95 supports-[backdrop-filter]:bg-white/80 sticky top-0 z-50 w-full border-b border-gray-200 backdrop-blur-lg shadow-sm">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to={logo.url} className="flex items-center gap-2 focus:outline-none" aria-label="Go to home page">
          <img src={logo.src} className="w-8 h-8" alt={logo.alt} />
          <p className="text-xl font-extrabold text-black tracking-tight">{logo.title}</p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              className={buttonVariants({ variant: 'ghost' })}
              to={link.href}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="outline" size="sm">
            <Link to={auth.login.url}>{auth.login.text}</Link>
          </Button>
          {auth.signup.onClick ? (
            <Button size="sm" onClick={auth.signup.onClick}>
              {auth.signup.text}
            </Button>
          ) : (
            <Button asChild size="sm">
              <Link to={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <Sheet open={open} onOpenChange={setOpen}>
          <Button
            size="icon"
            variant="outline"
            className="lg:hidden border-2 border-gray-300 hover:bg-[#00C6A7] hover:border-[#00C6A7] hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
          >
            <MenuToggle
              strokeWidth={2.5}
              open={open}
              onOpenChange={setOpen}
              className="size-6"
            />
          </Button>
          <SheetContent
            className="bg-white/95 supports-[backdrop-filter]:bg-white/80 gap-0 backdrop-blur-lg flex flex-col"
            side="left"
          >
            {/* Mobile Logo */}
            <div className="px-4 pt-6 pb-4 border-b border-gray-200">
              <Link to={logo.url} className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <img src={logo.src} className="w-10 h-10" alt={logo.alt} />
                <p className="text-xl font-extrabold text-black tracking-tight">{logo.title}</p>
              </Link>
            </div>

            {/* Mobile Links */}
            <div className="flex-1 overflow-y-auto px-4 pt-6 pb-5">
              <div className="grid gap-y-2">
                {links.map((link) => (
                  <Link
                    key={link.label}
                    className={buttonVariants({
                      variant: 'ghost',
                      className: 'justify-start h-12 text-base',
                    })}
                    to={link.href}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer Buttons */}
            <SheetFooter className="mt-auto flex flex-col gap-3 p-4 border-t border-gray-200">
              <Button
                asChild
                variant="outline"
                className="w-full h-12 text-base"
                onClick={() => setOpen(false)}
              >
                <Link to={auth.login.url}>{auth.login.text}</Link>
              </Button>
              {auth.signup.onClick ? (
                <Button
                  className="w-full h-12 text-base"
                  onClick={() => {
                    auth.signup.onClick?.();
                    setOpen(false);
                  }}
                >
                  {auth.signup.text}
                </Button>
              ) : (
                <Button asChild className="w-full h-12 text-base" onClick={() => setOpen(false)}>
                  <Link to={auth.signup.url}>{auth.signup.text}</Link>
                </Button>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
