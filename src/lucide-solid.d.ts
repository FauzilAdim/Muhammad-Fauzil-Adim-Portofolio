declare module 'lucide-solid' {
  import { Component } from 'solid-js';

  interface IconProps {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
    class?: string;
    style?: Record<string, string>;
    [key: string]: any;
  }

  type Icon = Component<IconProps>;

  export const Briefcase: Icon;
  export const MapPin: Icon;
  export const Calendar: Icon;
  export const ChevronDown: Icon;
  export const ChevronUp: Icon;
  export const CheckCircle: Icon;
  export const Code: Icon;
  export const Github: Icon;
  export const Globe: Icon;
  export const Linkedin: Icon;
  export const Mail: Icon;
  export const Heart: Icon;
  export const ArrowUp: Icon;
  export const Building2: Icon;
  export const Search: Icon;
}
