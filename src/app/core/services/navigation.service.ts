import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavigationState } from '../../models/navigation';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private readonly initialState: NavigationState = {
    isMenuOpen: false,
    items: [
      { path: '/', label: 'Home', current: true, ariaLabel: 'Navigate to home page' },
      { path: '/shop', label: 'Shop', current: false, ariaLabel: 'Browse our shop' },
      { path: '/about', label: 'About Us', current: false, ariaLabel: 'Learn about us' },
      { path: '/contact', label: 'Contact Us', current: false, ariaLabel: 'Get in touch' }
    ]
  };

  private state = new BehaviorSubject<NavigationState>(this.initialState);
  readonly state$ = this.state.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateCurrentRoute(event.url);
    });
  }

  private updateCurrentRoute(currentPath: string): void {
    const currentState = this.state.getValue();
    const updatedItems = currentState.items.map(item => ({
      ...item,
      current: item.path === currentPath
    }));

    this.state.next({
      ...currentState,
      items: updatedItems
    });
  }

  toggleMenu(): void {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      isMenuOpen: !currentState.isMenuOpen
    });
  }

  closeMenu(): void {
    const currentState = this.state.getValue();
    this.state.next({
      ...currentState,
      isMenuOpen: false
    });
  }
}