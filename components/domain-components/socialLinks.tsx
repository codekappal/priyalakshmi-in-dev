import { Link } from "@heroui/link";

import { links } from "@/config/links";

export default function SocialLinks() {
  return (
    <div className="grid grid-cols-3 gap-y-4 text-brandprimary max-w-[120px] py-5">
      {links.kappal.map((link) => (
        <div key={link.name} className="col-span-1">
          <Link href={link.href} isExternal={true}>
            <link.icon />
          </Link>
        </div>
      ))}
    </div>
  );
}
