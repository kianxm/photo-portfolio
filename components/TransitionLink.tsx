"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, MouseEvent, ReactNode, useTransition } from "react";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  target?: string;
  "aria-label"?: string;
};

const supportsVT = () =>
  typeof document !== "undefined" &&
  typeof (document as Document & {
    startViewTransition?: (cb: () => void) => unknown;
  }).startViewTransition === "function";

const TransitionLink = forwardRef<HTMLAnchorElement, Props>(function TransitionLink(
  { href, children, onClick, ...rest },
  ref
) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // let the browser handle modified clicks, target=_blank, hash, external
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank" ||
      typeof href !== "string" ||
      href.startsWith("http") ||
      href.startsWith("#") ||
      href.startsWith("mailto:")
    ) {
      return;
    }
    if (!supportsVT()) return;

    e.preventDefault();
    (
      document as Document & {
        startViewTransition: (cb: () => void) => unknown;
      }
    ).startViewTransition(() => {
      startTransition(() => router.push(href as string));
    });
  };

  return (
    <Link href={href} ref={ref} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});

export default TransitionLink;
