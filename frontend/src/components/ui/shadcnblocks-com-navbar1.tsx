import React from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
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
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactElement;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
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
  themeToggle?: React.ReactNode;
}

const Navbar1 = ({
  logo = {
    url: "https://www.shadcnblocks.com",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Shadcnblocks.com",
  },
  menu = [
    { title: "Home", url: "#" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "The latest industry news, updates, and info",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Company",
          description: "Our mission is to innovate and empower the world",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Careers",
          description: "Browse job listing and discover our workspace",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Support",
          description:
            "Get in touch with our support team or visit our community forums",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Terms of Service",
          description: "Our terms and conditions for using our services",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Pricing",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ],
  mobileExtraLinks = [
    { name: "Press", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Imprint", url: "#" },
    { name: "Sitemap", url: "#" },
  ],
  auth = {
    login: { text: "Log in", url: "#" },
    signup: { text: "Sign up", url: "#" },
  },
  themeToggle,
}: Navbar1Props) => {
  return (
    <section className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md w-full border-b border-gray-100" style={{ overflowX: 'hidden', overflowY: 'visible', overflow: 'visible' }}>
      <div className="max-w-7xl mx-auto px-4 py-[0.8625rem]" style={{ overflow: 'visible' }}>
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
            {themeToggle}
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
            <Link to={logo.url} className="flex items-center gap-2">
              <img src={logo.src} className="w-8" alt={logo.alt} />
              <span className="text-lg font-extrabold text-black tracking-tight">{logo.title}</span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>
                      <Link to={logo.url} className="flex items-center gap-2">
                        <img src={logo.src} className="w-8" alt={logo.alt} />
                        <span className="text-lg font-extrabold text-black tracking-tight">
                          {logo.title}
                        </span>
                      </Link>
                    </SheetTitle>
                  </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          to={link.url}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-black bg-white transition-colors hover:bg-[#FFD166] hover:text-black hover:shadow-sm"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                    <div className="flex flex-col gap-3">
                      {themeToggle && (
                        <div className="pb-2 border-b mb-2">
                          {themeToggle}
                        </div>
                      )}
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
          <ul className="w-80 p-3 bg-white" style={{ overflow: 'hidden', overflowY: 'hidden', overflowX: 'hidden' }}>
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
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-bold hover:no-underline text-black hover:text-[#00C6A7] data-[state=open]:text-[#00C6A7] transition-colors">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              to={subItem.url}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-[#FFD166] hover:text-black focus:bg-[#FFD166] focus:text-black"
            >
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-gray-600">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} to={item.url} className="font-bold text-black hover:text-[#00C6A7] transition-colors">
      {item.title}
    </Link>
  );
};

export { Navbar1 };

