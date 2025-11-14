import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const navBar = document.querySelector('nav') as HTMLElement;
    if (!navBar) return;

    if (window.scrollY > 0) {
      navBar.style.background = 'white';
      navBar.style.boxShadow = '0 5px 20px rgba(190, 190, 190, 0.15)';
    } else {
      navBar.style.background = 'transparent';
      navBar.style.boxShadow = 'none';
    }
  }

}