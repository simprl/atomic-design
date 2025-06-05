"use client"
import { WithDeps } from "@atomic-design/di";
import { LinkAtomContext } from "@atomic-design/atoms-base";
import { memo } from "react";
import { usePathname } from "next/navigation";

export interface LinkProps {
  href: string;
  children: string;
}

export const LinkMolecule = memo(function ({ href, children, deps }: LinkProps & WithDeps<LinkAtomContext>) {
  const { atoms: { Link } } = deps;

  const pathname = usePathname() || '/'
  const isActive =
      href === '/' ? pathname === href : pathname.startsWith(href)
  return (
    <Link href={href} color="Secondary" active={isActive} >
      {children}
    </Link>
  );
});
LinkMolecule.displayName = "LinkMolecule";
