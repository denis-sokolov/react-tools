import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react";

import { type Action } from "./Action";

export type ActionAreaProps = {
  /**
   * Possible values for an Action:
   * - "submit"
   * - string with a URL to make a link
   * - { newWindow: string } to make a link that opens in a new window
   * - { download: string, url: string } to make a link that downloads a file with a given filename
   * - () => void to make a click handler
   * - { mousedown: () => void } to make a mousedown handler, but the click handler above is preferred for UX
   * - { disabledReason: "To continue, please fill in all the fields above" } to disable a button and provide an explanation to the user
   */
  action: Action;
  children: ReactNode;
  className?: string;
  /**
   * Override how the ActionArea detects which links are pointing to the current page
   */
  currentPath?: string;
  /**
   * Override how the ActionArea renders buttons
   */
  renderButton?: (
    props: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode },
  ) => ReactNode;
  /**
   * Override how the ActionArea renders inactive areas
   */
  renderDiv?: (
    props: HTMLAttributes<HTMLDivElement> & { children: ReactNode },
  ) => ReactNode;
  /**
   * Override how the ActionArea renders links
   */
  renderLink?: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & {
      children: ReactNode;
      href: string;
    },
  ) => ReactNode;
  style?: CSSProperties;
  title?: string;
};
