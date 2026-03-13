import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Button } from "./button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
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

const Navbar1 = ({
  logo,
  menu = [],
  mobileExtraLinks = [],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
}: Navbar1Props) => {
  return (
    <section className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full border-b-2 border-gray-100 transition-shadow duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="hidden justify-between lg:flex items-center">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2.5 focus:outline-none rounded-lg transition-transform duration-200 hover:scale-105" aria-label="Go to home page">
              <img src={logo.src} className="w-8 h-8 transition-transform duration-200" alt={logo.alt} />
              <span className="text-xl font-extrabold text-black tracking-tight">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <Button asChild variant="outline" className="h-10 px-4 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 rounded-lg hover:shadow-sm">
              <Link to={auth.login.url}>{auth.login.text}</Link>
            </Button>
            {auth.signup.onClick ? (
              <Button onClick={auth.signup.onClick} className="h-10 px-4 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 rounded-lg border-0 hover:shadow-md hover:scale-105 active:scale-95" aria-label={auth.signup.text}>
                {auth.signup.text}
              </Button>
            ) : (
              <Button asChild className="h-10 px-4 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 rounded-lg border-0 hover:shadow-md hover:scale-105 active:scale-95">
                <Link to={auth.signup.url}>{auth.signup.text}</Link>
              </Button>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between h-10">
            <Link to={logo.url} className="flex items-center gap-2.5 focus:outline-none rounded-lg transition-transform duration-200 hover:scale-105" aria-label="Go to home page">
              <img src={logo.src} className="w-8 h-8 transition-transform duration-200" alt={logo.alt} />
              <span className="text-xl font-extrabold text-black tracking-tight">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-9 w-9 bg-transparent hover:bg-gray-100 transition-all duration-200 ease-in-out focus:outline-none focus:ring-0 rounded-lg p-0 hover:scale-110 active:scale-95"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5 text-black transition-transform duration-200" strokeWidth={2} />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white w-[85vw] sm:w-[380px] p-0 border-l-2 border-gray-200 animate-in slide-in-from-right duration-300">
                  <SheetHeader className="px-6 border-b-2 border-gray-100 min-h-[72px] flex flex-row items-center justify-start">
                    <SheetTitle className="text-left flex-1">
                      <Link to={logo.url} className="flex items-center gap-2.5 focus:outline-none rounded-lg transition-transform duration-200 hover:scale-105" aria-label="Go to home page">
                        <img src={logo.src} className="w-8 h-8 transition-transform duration-200" alt={logo.alt} />
                        <span className="text-xl font-extrabold text-black tracking-tight">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Navigation menu for KampusKart
                    </SheetDescription>
                  </SheetHeader>
                <div className="px-5 py-6 flex flex-col gap-5">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-3 bg-transparent [&_[data-state=open]]:animate-accordion-down [&_[data-state=closed]]:animate-accordion-up"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {mobileExtraLinks.length > 0 && (
                    <div className="border-t border-gray-200 pt-4 mt-2 animate-in fade-in-50 duration-300">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Quick Access</h3>
                      <div className="flex flex-col gap-2">
                        {mobileExtraLinks.map((link, idx) => (
                          <SheetClose key={idx} asChild>
                            <Link
                              to={link.url}
                              className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300 active:scale-98 focus:outline-none focus:ring-0 hover:shadow-sm"
                              aria-label={`Go to ${link.name}`}
                            >
                              {link.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  )}
                    <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-200 animate-in fade-in-50 duration-300">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full h-11 text-sm font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-900 hover:border-gray-400 transition-all duration-200 ease-in-out rounded-lg active:scale-98 focus:outline-none focus:ring-0 hover:shadow-sm">
                          <Link to={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                      </SheetClose>
                      {auth.signup.onClick ? (
                        <SheetClose asChild>
                          <Button onClick={auth.signup.onClick} className="w-full h-11 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 ease-in-out rounded-lg active:scale-98 focus:outline-none focus:ring-0 hover:shadow-md" aria-label={auth.signup.text}>
                            {auth.signup.text}
                          </Button>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button asChild className="w-full h-11 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 ease-in-out rounded-lg active:scale-98 focus:outline-none focus:ring-0 hover:shadow-md">
                            <Link to={auth.signup.url}>{auth.signup.text}</Link>
                          </Button>
                        </SheetClose>
                      )}
                    </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-black">
        <NavigationMenuTrigger className="text-gray-700 font-semibold bg-transparent hover:bg-gray-100 hover:text-gray-900 data-[state=open]:bg-gray-100 data-[state=open]:text-gray-900 focus:bg-gray-100 focus:text-gray-900 transition-colors rounded-lg px-4 py-2 border-0 focus:outline-none focus:ring-0 [&>svg]:text-gray-700 data-[state=open]:[&>svg]:text-gray-900" aria-label={`${item.title} menu`}>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-2 bg-white shadow-xl border border-gray-200 rounded-lg">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex select-none gap-3 rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 ease-in-out hover:bg-gray-100 text-gray-700 hover:text-gray-900 border-0 focus:ring-0 hover:scale-[1.02] active:scale-[0.98]"
                    to={subItem.url}
                    aria-label={`Go to ${subItem.title}`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-xs leading-snug text-gray-600 mt-1">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          to={item.url}
          className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 bg-transparent border-0 transition-all duration-200 ease-in-out hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-0 hover:scale-105 active:scale-95"
          aria-label={`Go to ${item.title}`}
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-none">
        <AccordionTrigger className="py-3 px-4 font-semibold hover:no-underline !text-gray-700 bg-white hover:!bg-gray-100 hover:!text-gray-900 data-[state=open]:!text-gray-900 data-[state=open]:!bg-gray-50 transition-all duration-300 ease-in-out rounded-lg text-sm focus:outline-none focus:ring-0 border border-gray-200 hover:border-gray-300 data-[state=open]:border-gray-300 [&>svg]:!text-gray-700 data-[state=open]:[&>svg]:!text-gray-900 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-in-out" aria-label={`${item.title} menu`}>
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pb-2 transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-2 pl-2">
            {item.items.map((subItem) => (
              <SheetClose key={subItem.title} asChild>
                <Link
                  to={subItem.url}
                  className="flex select-none gap-3 rounded-lg p-3 leading-none outline-none transition-all duration-200 ease-in-out bg-white hover:bg-gray-100 !text-gray-700 hover:!text-gray-900 active:scale-98 border border-gray-200 hover:border-gray-300 focus:ring-0 focus:!text-gray-900"
                  aria-label={`Go to ${subItem.title}`}
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold !text-gray-900 mb-1">{subItem.title}</div>
                    {subItem.description && (
                      <p className="text-xs leading-snug !text-gray-600">
                        {subItem.description}
                      </p>
                    )}
                  </div>
                </Link>
              </SheetClose>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <SheetClose key={item.title} asChild>
      <Link 
        to={item.url} 
        className="block py-3 px-4 font-semibold !text-gray-700 bg-white hover:bg-gray-100 hover:!text-gray-900 transition-all duration-200 ease-in-out rounded-lg text-sm h-11 flex items-center active:scale-98 focus:outline-none focus:ring-0 border border-gray-200 hover:border-gray-300 focus:!text-gray-900"
        aria-label={`Go to ${item.title}`}
      >
        {item.title}
      </Link>
    </SheetClose>
  );
};

export { Navbar1 };

