import { AppProvider } from '@shopify/polaris';
import { LinkLikeComponentProps } from '@shopify/polaris/build/ts/src/utilities/link';
import translations from '@shopify/polaris/locales/en.json';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import '@shopify/polaris/build/esm/styles.css';

export default function PolarisProvider({ children }: PropsWithChildren) {
  return (
    <AppProvider i18n={translations} linkComponent={CustomLinkComponent}>
      {children}
    </AppProvider>
  );
}

const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;

function CustomLinkComponent({
  children,
  url,
  external,
  role,
  ...rest
}: LinkLikeComponentProps) {
  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={url}>
      <button {...(rest as any)} role={role}>
        {children}
      </button>
    </Link>
  );
}
