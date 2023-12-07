import React from "react";

interface Props {
    icon: React.ReactNode;
    title: string;
    active?: boolean;
    href: string;
}

const NavItem: React.FC<Props> = ({ icon, title, active = false, href }) => {
    return active ? (
        <a className="flex p-4 bg-activeBg rounded-[12px]" href={href}>
            <i className="pr-2">{icon}</i>
            <span className="text-active font-light">{title}</span>
        </a>
    ) : (
        <a className="group flex p-4 rounded-[12px] hover:bg-activeBg" href={href}>
            <i className="pr-2">{icon}</i>
            <span className="text-normal group-hover:text-active font-light">{title}</span>
        </a>
    );
};

export default NavItem;
