import React from "react";
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
    <section className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-3.5">
        <nav className="hidden justify-between lg:flex items-center">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2 focus:outline-none rounded-lg px-1" aria-label="Go to home page">
              <img src={logo.src} className="w-8 h-8" alt={logo.alt} />
              <span className="text-lg font-extrabold text-black tracking-tight">{logo.title}</span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Button asChild variant="outline" size="sm" className="text-black bg-white border border-gray-300 hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] transition-colors focus:outline-none">
              <Link to={auth.login.url}>{auth.login.text}</Link>
            </Button>
            {auth.signup.onClick ? (
              <Button size="sm" onClick={auth.signup.onClick} className="bg-[#181818] text-white hover:bg-[#00C6A7] hover:text-white transition-colors shadow-sm hover:shadow-md focus:outline-none" aria-label={auth.signup.text}>
                {auth.signup.text}
              </Button>
            ) : (
              <Button asChild size="sm" className="bg-[#181818] text-white hover:bg-[#00C6A7] hover:text-white transition-colors shadow-sm hover:shadow-md focus:outline-none">
                <Link to={auth.signup.url}>{auth.signup.text}</Link>
              </Button>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2.5 py-1 focus:outline-none rounded-lg px-1" aria-label="Go to home page">
              <img src={logo.src} className="w-9 h-9" alt={logo.alt} />
              <span className="text-xl font-extrabold text-black tracking-tight">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12 border-2 border-gray-300 bg-white hover:bg-[#00C6A7] hover:border-[#00C6A7] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none rounded-xl"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-gradient-to-b from-white to-gray-50 w-[85vw] sm:w-[380px] p-0 border-l-4 border-[#00C6A7]">
                  <SheetHeader className="px-6 pt-8 pb-6 border-b-2 border-gray-100 bg-white">
                    <SheetTitle className="text-left">
                      <Link to={logo.url} className="flex items-center gap-3 focus:outline-none rounded-lg px-1" aria-label="Go to home page">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00C6A7] to-[#009e87] rounded-xl flex items-center justify-center shadow-md">
                          <img src={logo.src} className="w-8 h-8" alt={logo.alt} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-extrabold text-black tracking-tight">
                            {logo.title}
                          </span>
                          <span className="text-xs text-gray-500 font-medium">Campus Management</span>
                        </div>
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
                    className="flex w-full flex-col gap-3 bg-transparent"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {mobileExtraLinks.length > 0 && (
                    <div className="border-t-2 border-gray-200 pt-5 mt-2">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">Quick Access</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {mobileExtraLinks.map((link, idx) => (
                          <SheetClose key={idx} asChild>
                            <Link
                              to={link.url}
                              className="inline-flex h-14 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-200 transition-all hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] hover:shadow-md active:scale-95 focus:outline-none shadow-sm"
                              aria-label={`Go to ${link.name}`}
                            >
                              {link.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  )}
                    <div className="flex flex-col gap-3 pt-5 mt-2 border-t-2 border-gray-200">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full h-14 text-base text-gray-700 bg-white border-2 border-gray-300 hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] transition-colors font-bold rounded-xl active:scale-95 focus:outline-none shadow-sm hover:shadow-md">
                          <Link to={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                      </SheetClose>
                      {auth.signup.onClick ? (
                        <SheetClose asChild>
                          <Button onClick={auth.signup.onClick} className="w-full h-14 text-base bg-gradient-to-r from-[#00C6A7] to-[#009e87] text-white hover:from-[#009e87] hover:to-[#008a75] transition-all shadow-md hover:shadow-lg font-bold rounded-xl active:scale-95 focus:outline-none" aria-label={auth.signup.text}>
                            {auth.signup.text}
                          </Button>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button asChild className="w-full h-14 text-base bg-gradient-to-r from-[#00C6A7] to-[#009e87] text-white hover:from-[#009e87] hover:to-[#008a75] transition-all shadow-md hover:shadow-lg font-bold rounded-xl active:scale-95 focus:outline-none">
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
        <NavigationMenuTrigger className="text-black font-bold bg-gray-50 hover:bg-[#00C6A7] hover:text-white data-[state=open]:bg-[#00C6A7] data-[state=open]:text-white transition-colors rounded-full px-4 py-2 focus:outline-none" aria-label={`${item.title} menu`}>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-white shadow-lg border border-gray-100 rounded-lg">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#FFD166] hover:text-black"
                    to={subItem.url}
                    aria-label={`Go to ${subItem.title}`}
                  >
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-gray-600 mt-1">
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
          className="group inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-black bg-gray-50 transition-colors hover:bg-[#00C6A7] hover:text-white focus:outline-none"
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
        <AccordionTrigger className="py-4 px-5 font-bold hover:no-underline text-gray-900 bg-white hover:bg-gradient-to-r hover:from-[#00C6A7]/10 hover:to-[#009e87]/10 hover:text-[#00C6A7] data-[state=open]:text-[#00C6A7] data-[state=open]:bg-gradient-to-r data-[state=open]:from-[#00C6A7]/10 data-[state=open]:to-[#009e87]/10 transition-all rounded-xl text-base focus:outline-none shadow-sm border-2 border-gray-100 hover:border-[#00C6A7]/30 data-[state=open]:border-[#00C6A7]/30" aria-label={`${item.title} menu`}>
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-3 pb-2">
          <div className="flex flex-col gap-2.5 pl-2">
            {item.items.map((subItem) => (
              <SheetClose key={subItem.title} asChild>
                <Link
                  to={subItem.url}
                  className="flex select-none gap-3 rounded-xl p-4 leading-none outline-none transition-all bg-white hover:bg-gradient-to-r hover:from-[#FFD166] hover:to-[#FFD166]/80 hover:text-black active:scale-95 border-2 border-gray-100 hover:border-[#FFD166] min-h-[68px] shadow-sm hover:shadow-md"
                  aria-label={`Go to ${subItem.title}`}
                >
                  <div className="flex-1">
                    <div className="text-base font-bold text-gray-900 mb-1">{subItem.title}</div>
                    {subItem.description && (
                      <p className="text-xs leading-snug text-gray-600">
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
        className="block py-4 px-5 font-bold text-gray-900 bg-white hover:bg-gradient-to-r hover:from-[#00C6A7]/10 hover:to-[#009e87]/10 hover:text-[#00C6A7] transition-all rounded-xl text-base min-h-[56px] flex items-center active:scale-95 focus:outline-none shadow-sm border-2 border-gray-100 hover:border-[#00C6A7]/30"
        aria-label={`Go to ${item.title}`}
      >
        {item.title}
      </Link>
    </SheetClose>
  );
};

export { Navbar1 };

