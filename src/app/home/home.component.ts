import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { FormsModule } from '@angular/forms';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ButtonModule,
    TabsModule,
    RouterOutlet,
    RouterLinkActive,
    FormsModule,
    CommonModule,
    LottieComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentPath: string | undefined;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  o1: AnimationOptions = {
    path: 'rocketanimation.json',
  };
  tabs = [
    { route: 'send-data', label: 'Send Data', icon: 'pi pi-send' },
    { route: 'receive-data', label: 'Receive Data', icon: 'pi pi-download' },
  ];
  animationCreated(animationItem: AnimationItem): void {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.currentPath = route.snapshot.routeConfig?.path;
      }
    });
  }
}
