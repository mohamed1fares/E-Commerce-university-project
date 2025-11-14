import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  isScrolled = false;
  navLogo = '/images/eLife.png';
  navLogoWidth = '200';

  @HostListener('document:scroll', [])
  onDocumentScroll(): void {
    if (window.scrollY > 0) {
      this.isScrolled = true;
      this.navLogo = '/images/eLife.png';
      this.navLogoWidth = '190';
    } else {
      this.isScrolled = false;
      this.navLogo = '/images/eLife.png';
      this.navLogoWidth = '200';
    }
  }
}