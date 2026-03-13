import { Component, OnInit, OnDestroy } from '@angular/core';
import { Nav } from "../nav/nav";
import { Projects } from "../projects/projects";
import { Footer } from "../footer/footer";
import { RouterLink } from '@angular/router';


interface Project {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [Nav, Projects, Footer, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  currentSlide = 0;
  private autoPlayInterval: any;

  projects: Project[] = [
    {
      title: 'Area',
      description: 'Proyecto Moderni',
      image: '/carrousel/area.png'
    },
    {
      title: 'Bodega',
      description: 'Proyecto Moderni',
      image: '/carrousel/bodega.png'
    },
    {
      title: 'Cocina',
      description: 'Proyecto Moderni',
      image: '/carrousel/cocina.png'
    },
    {
      title: 'Cuarto',
      description: 'Proyecto Moderni',
      image: '/carrousel/cuarto.png'
    },
    {
      title: 'Mesa Cuarto',
      description: 'Proyecto Moderni',
      image: '/carrousel/mesa_cuarto.png'
    },
    {
      title: 'Panel',
      description: 'Proyecto Moderni',
      image: '/carrousel/Panel.png'
    },
    {
      title: 'Panel Cuarto',
      description: 'Proyecto Moderni',
      image: '/carrousel/panel_cuarto.png'
    },
    {
      title: 'Salon Panel',
      description: 'Proyecto Moderni',
      image: '/carrousel/salon_panel.png'
    },
    {
      title: 'Tienda',
      description: 'Proyecto Moderni',
      image: '/carrousel/tienda.png'
    },
  ];

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.projects.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 
      ? this.projects.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  getSlideTransform(index: number): string {
    const totalSlides = this.projects.length;
    if (!totalSlides) {
      return 'translateX(0%)';
    }

    let offset = index - this.currentSlide;

    if (offset > totalSlides / 2) {
      offset -= totalSlides;
    } else if (offset < -totalSlides / 2) {
      offset += totalSlides;
    }

    return `translateX(${offset * 100}%)`;
  }
}
