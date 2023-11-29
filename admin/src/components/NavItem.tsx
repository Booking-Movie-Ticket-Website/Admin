import React from "react";

interface Props {
    icon: React.ReactNode;
    title: string;
    active?: boolean;
}

const NavItem: React.FC<Props> = ({ icon, title, active = false }) => {
    return active ? (
        <nav className="flex p-4 bg-activeBg rounded-[12px]">
            <i className="pr-2">{icon}</i>
            <span className="text-active font-light">{title}</span>
        </nav>
    ) : (
        <nav className="group flex p-4 rounded-[12px] hover:bg-activeBg">
            <i className="pr-2">{icon}</i>
            <span className="text-normal group-hover:text-active font-light">{title}</span>
        </nav>
    );
};

export default NavItem;
