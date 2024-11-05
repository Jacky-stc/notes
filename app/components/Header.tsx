import {Link, Navbar, NavbarBrand, NavbarContent, NavbarItem,} from "@nextui-org/react";
import React from 'react'

const Header = () => {
  return (
    <Navbar maxWidth="full">
        <NavbarBrand className="">
            <p>STC notes</p>
        </NavbarBrand>
        <NavbarContent justify="end"  className="flex gap-8">
            <NavbarItem className="text-xs">
                <Link isBlock color="foreground" href="about" className="text-sm">
                筆記
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link isBlock color="foreground" href="about" className="text-sm">
                雜記
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link isBlock color="foreground" href="about" className="text-sm">
                關於我
                </Link>
            </NavbarItem>
        </NavbarContent>
        <NavbarContent  justify="end" className="gap-4">
            <NavbarItem>search</NavbarItem>
            <NavbarItem>github</NavbarItem>
        </NavbarContent>
    </Navbar>
  )
}

export default Header
