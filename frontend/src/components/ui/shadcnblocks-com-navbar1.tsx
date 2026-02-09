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
      <div className="max-w-7xl mx-auto px-4 py-3 lg:py-[0.8625rem]">
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
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
            <Button asChild variant="outline" size="sm" className="text-black bg-white border border-gray-300 hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] transition-colors">
              <Link to={auth.login.url}>{auth.login.text}</Link>
            </Button>
            {auth.signup.onClick ? (
              <Button size="sm" onClick={auth.signup.onClick} className="bg-[#181818] text-white hover:bg-[#00C6A7] hover:text-white transition-colors shadow-sm hover:shadow-md">
                {auth.signup.text}
              </Button>
            ) : (
              <Button asChild size="sm" className="bg-[#181818] text-white hover:bg-[#00C6A7] hover:text-white transition-colors shadow-sm hover:shadow-md">
                <Link to={auth.signup.url}>{auth.signup.text}</Link>
              </Button>
            )}
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2 py-1">
              <img src={logo.src} className="w-9 h-9" alt={logo.alt} />
              <span className="text-xl font-extrabold text-black tracking-tight">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-11 w-11 border-2 border-gray-300 bg-white hover:bg-[#00C6A7] hover:border-[#00C6A7] hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-white w-[85vw] sm:w-[400px] p-0">
                  <SheetHeader className="px-6 pt-6 pb-4 border-b border-gray-200 bg-gradient-to-r from-[#00C6A7] to-[#009e87]">
                    <SheetTitle className="text-left">
                      <Link to={logo.url} className="flex items-center gap-3">
                        <img src={logo.src} className="w-10 h-10" alt={logo.alt} />
                        <span className="text-xl font-extrabold text-white tracking-tight">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                    <SheetDescription className="sr-only">
                      Navigation menu
                    </SheetDescription>
                  </SheetHeader>
                <div className="px-4 py-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-2 bg-white"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  {mobileExtraLinks.length > 0 && (
                    <div className="border-t border-gray-200 pt-5">
                      <div className="grid grid-cols-2 gap-3">
                        {mobileExtraLinks.map((link, idx) => (
                          <SheetClose key={idx} asChild>
                            <Link
                              to={link.url}
                              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-bold text-black bg-gray-50 border-2 border-gray-200 transition-all hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] hover:shadow-sm active:scale-95"
                            >
                              {link.name}
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </div>
                  )}
                    <div className="flex flex-col gap-3 pt-2 border-t border-gray-200">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full h-12 text-base text-black bg-white border-2 border-gray-300 hover:bg-[#FFD166] hover:text-black hover:border-[#FFD166] transition-colors font-bold rounded-xl active:scale-95">
                          <Link to={auth.login.url}>{auth.login.text}</Link>
                        </Button>
                      </SheetClose>
                      {auth.signup.onClick ? (
                        <SheetClose asChild>
                          <Button onClick={auth.signup.onClick} className="w-full h-12 text-base bg-[#00C6A7] text-white hover:bg-[#009e87] hover:text-white transition-colors shadow-sm hover:shadow-md font-bold rounded-xl active:scale-95">
                            {auth.signup.text}
                          </Button>
                        </SheetClose>
                      ) : (
                        <SheetClose asChild>
                          <Button asChild className="w-full h-12 text-base bg-[#00C6A7] text-white hover:bg-[#009e87] hover:text-white transition-colors shadow-sm hover:shadow-md font-bold rounded-xl active:scale-95">
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
        <NavigationMenuTrigger className="text-black font-bold bg-gray-50 hover:bg-[#00C6A7] hover:text-white data-[state=open]:bg-[#00C6A7] data-[state=open]:text-white transition-colors rounded-full px-4 py-2">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3 bg-white">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#FFD166] hover:text-black focus:bg-[#FFD166] focus:text-black"
                    to={subItem.url}
                  >
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-gray-600">
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
          className="group inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-bold text-black bg-gray-50 transition-colors hover:bg-[#00C6A7] hover:text-white focus:bg-[#00C6A7] focus:text-white"
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
      <AccordionItem key={item.title} value={item.title} className="border-b border-gray-200 last:border-b-0">
        <AccordionTrigger className="py-4 px-4 font-bold hover:no-underline text-gray-900 bg-white hover:bg-gray-50 hover:text-[#00C6A7] data-[state=open]:text-[#00C6A7] data-[state=open]:bg-gray-50 transition-all rounded-xl text-base">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 pb-2">
          <div className="flex flex-col gap-2">
            {item.items.map((subItem) => (
              <SheetClose key={subItem.title} asChild>
                <Link
                  to={subItem.url}
                  className="flex select-none gap-3 rounded-xl p-4 leading-none outline-none transition-all bg-white hover:bg-[#FFD166] hover:text-black focus:bg-[#FFD166] focus:text-black active:bg-[#FFD166] active:scale-95 border border-gray-100 hover:border-[#FFD166] min-h-[60px]"
                >
                  <div className="flex-1">
                    <div className="text-base font-semibold text-gray-900">{subItem.title}</div>
                    {subItem.description && (
                      <p className="text-sm leading-snug text-gray-600 mt-1">
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
        className="block py-4 px-4 font-bold text-gray-900 bg-white hover:text-[#00C6A7] hover:bg-gray-50 transition-all rounded-xl border-b border-gray-200 last:border-b-0 text-base min-h-[56px] flex items-center active:scale-95"
      >
        {item.title}
      </Link>
    </SheetClose>
  );
};

export { Navbar1 };

