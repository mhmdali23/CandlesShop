export interface NavigationItem {
    path: string;
    label: string;
    current?: boolean;
    ariaLabel?: string;

  }
  
  export interface NavigationState {
    isMenuOpen: boolean;
    items: NavigationItem[];
  }