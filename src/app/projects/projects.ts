import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterLink,CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  screenType: string = 'desktop'; 

  ngAfterViewInit(): void {
    const navBar = document.querySelector('nav') as HTMLElement;
    const menuBar = document.querySelector('#menu-bar') as HTMLElement;
    const menuPage = document.querySelector('#menu-page') as HTMLElement;

    // 1. تحديد نوع الشاشة (لأجل عداد الـ Nav/Menu)
    let menuBarStyle = window.getComputedStyle(menuBar);
    this.screenType = (menuBarStyle.display === "flex") ? "mobile" : "desktop";
    
    // 2. تفعيل زر الـ Wishlist (Love) على مستوى المنتجات
    const heartButtons = document.querySelectorAll('.heart-button') as NodeListOf<HTMLElement>;
    heartButtons.forEach(button => {
      button.addEventListener('click', () => {
        // تبديل كلاس active على زر القلب نفسه (لتغيير اللون)
        button.classList.toggle('active'); 
        // تحديث عداد الـ Wishlist في الـ Nav Bar والـ Menu Bar
        this.updateCounter('.wishlist-link span', this.screenType, '#navbar-tools', '#menu-tools', '.heart-button.active');
      });
    });

    // 3. تفعيل زر Add To Cart على مستوى المنتجات
    const cartButtons = document.querySelectorAll('.product-card .blue-button') as NodeListOf<HTMLElement>;
    cartButtons.forEach(button => {
      button.addEventListener('click', () => {
        // تبديل كلاس active على زر الـ Cart نفسه 
        button.classList.toggle('active');
        // تغيير نص الزر
        button.innerHTML = (button.innerHTML.trim() === "Add To Cart") ? "Remove" : "Add To Cart";
        // تحديث عداد الـ Cart في الـ Nav Bar والـ Menu Bar
        this.updateCounter('.cart-link span', this.screenType, '#navbar-tools', '#menu-tools', '.product-card .blue-button.active');
      });
    });

    // 4. تفعيل قائمة الـ Menu Bar (للتنقل/الإخفاء)
    const html = document.querySelector('html') as HTMLElement;
    menuBar.addEventListener('click', () => {
      menuPage.classList.toggle('active');
      html.style.overflow = (menuPage.classList.contains('active')) ? "hidden" : "scroll";
      this.navScroll(menuPage.classList.contains('active'));
    });

    // 5. تم إلغاء Logic الـ Slideshow بالكامل
  }

  // الـ methods المتبقية كما هي
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.navScroll(false);
  }

  private navScroll(isMenuActive: boolean) {
    const navBar = document.querySelector('nav') as HTMLElement;
    if (!navBar) return;

    if (window.scrollY > 0 && !isMenuActive) {
      navBar.style.boxShadow = '0 5px 20px rgba(190, 190, 190, 0.15)';
      navBar.style.backgroundColor = 'white';
    } else {
      navBar.style.boxShadow = 'none';
      navBar.style.backgroundColor = 'transparent';
    }
  }

  private updateCounter(
    spanSelector: string,
    screenType: string,
    desktopContainer: string,
    mobileContainer: string,
    activeItemsSelector: string
  ) {
    // هذه الدالة هي المسؤولة عن تحديث العداد (span) في الـ Nav
    const container = document.querySelector(screenType === 'desktop' ? desktopContainer : mobileContainer) as HTMLElement;
    
    // نحن بحاجة لتحديث كلا العدادين (في الـ Nav العادي و Menu الـ Mobile)
    const desktopCounter = document.querySelector(`${desktopContainer} ${spanSelector}`) as HTMLElement;
    const mobileCounter = document.querySelector(`${mobileContainer} ${spanSelector}`) as HTMLElement;
    
    const activeCount = document.querySelectorAll(activeItemsSelector).length.toString();

    if (desktopCounter) desktopCounter.innerHTML = activeCount;
    if (mobileCounter) mobileCounter.innerHTML = activeCount;
  }
}