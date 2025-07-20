import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-demo.component.html'
})
export class CarouselDemoComponent {
  currentSlide = signal(0);
  autoplayEnabled = signal(true);
  
  slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
      title: 'Mountain Vista',
      description: 'Breathtaking mountain landscapes'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
      title: 'Forest Path',
      description: 'Peaceful woodland trails'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=400&fit=crop',
      title: 'Ocean View',
      description: 'Serene ocean horizons'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=400&fit=crop',
      title: 'Desert Sunset',
      description: 'Golden desert landscapes'
    }
  ];

  productSlides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
      title: 'Sneakers',
      price: '$99.99'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
      title: 'Watch',
      price: '$299.99'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      title: 'Headphones',
      price: '$149.99'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1529602819560-9cd1a8df1c8b?w=300&h=300&fit=crop',
      title: 'Sunglasses',
      price: '$89.99'
    }
  ];

  nextSlide(): void {
    this.currentSlide.set((this.currentSlide() + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlide.set((this.currentSlide() - 1 + this.slides.length) % this.slides.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
  }

  toggleAutoplay(): void {
    this.autoplayEnabled.set(!this.autoplayEnabled());
  }
}
