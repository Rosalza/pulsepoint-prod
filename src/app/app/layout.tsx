'use client'

import { MenuIcon } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import classNames from "classnames";
import NavBar from "@/components/navigation/NavBar";


const Layout = (props: PropsWithChildren) => {
    var collapsed = false
    return (
      <div>
        <NavBar />
        {props.children}
      </div>
    );
}

export default Layout