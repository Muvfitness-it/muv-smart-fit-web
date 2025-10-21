/**
 * Type definitions for Google Maps Extended Component Library
 * https://github.com/googlemaps/extended-component-library
 */

declare namespace JSX {
  interface IntrinsicElements {
    'gmpx-place-overview': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        place?: string;
        size?: 'small' | 'medium' | 'large' | 'x-large';
        'google-logo-already-displayed'?: boolean | '';
      },
      HTMLElement
    >;
  }
}
