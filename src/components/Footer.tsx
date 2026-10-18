import { site } from "../data/site";
import { cn } from "../lib/cn";
import { Link } from "../lib/router";
import { ArrowIcon } from "./Icons";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer id="contact" aria-labelledby="contact-heading" className="scroll-mt-[54px] border-t border-line md:scroll-mt-[61px]">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
        <Reveal>
          <div className="flex flex-col gap-10 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-24">
            <div>
              <h2
                id="contact-heading"
                className="font-mono text-[12px] leading-none tracking-[-0.02em] text-soft"
              >
                Contact
              </h2>
              {site.contact.email ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-5 inline-flex items-center gap-3 font-display text-[26px] leading-none tracking-[-0.03em] text-ink transition-opacity duration-300 hover:opacity-50 sm:text-[34px] lg:text-[40px]"
                >
                  {site.contact.email}
                  <ArrowIcon className="size-4 shrink-0 text-soft" />
                </a>
              ) : null}
              <p
                className={cn(
                  "text-[14px] leading-[1.6] text-muted",
                  site.contact.email ? "mt-4" : "mt-5",
                )}
              >
                {site.contact.note}
              </p>
            </div>

            <nav aria-label="页脚导航" className="flex flex-col gap-2.5 lg:items-end">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-[14px] leading-none tracking-[-0.02em] text-muted transition-opacity duration-300 hover:opacity-55"
                >
                  {item.label}
                </Link>
              ))}
              {site.contact.email ? (
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[14px] leading-none tracking-[-0.02em] text-muted transition-opacity duration-300 hover:opacity-55"
                >
                  Email
                </a>
              ) : null}
              {site.contact.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-[14px] leading-none tracking-[-0.02em] text-muted transition-opacity duration-300 hover:opacity-55"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </Reveal>

        <div className="flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] leading-[1.6] tracking-[0.01em] text-soft">
            {site.footer.copyright}
          </span>
          <span className="font-mono text-[11px] leading-[1.6] tracking-[0.01em] text-soft">
            {site.footer.note}
          </span>
        </div>
      </div>
    </footer>
  );
}
