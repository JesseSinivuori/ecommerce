"use client";
import styles from "@/app/style";
import { Disclosure as HUIDisclosure } from "@headlessui/react";

interface DisclosureProps {
  buttonText: string;
  panelText: string | React.ReactNode;
}

export default function Disclosure({ buttonText, panelText }: DisclosureProps) {
  return (
    <div className="mt-4 first:mt-0">
      <HUIDisclosure>
        {({ open }) => (
          <div>
            <HUIDisclosure.Button className="flex w-full rounded-md border border-white/10 py-2 px-4">
              <span className="flex flex-1">{buttonText}</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-white ml-2`}
              />
            </HUIDisclosure.Button>
            <HUIDisclosure.Panel
              className={`px-4 pb-2 pt-4 text-sm ${styles.paragraph}`}
            >
              {panelText}
            </HUIDisclosure.Panel>
          </div>
        )}
      </HUIDisclosure>
    </div>
  );
}

const ChevronUpIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`h-6 w-6 ${className}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);
