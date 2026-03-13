import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Nav } from '../nav/nav';
import { Footer } from '../footer/footer';

interface GalleryProject {
  titulo: string;
  etiqueta: string;
  imagen: string;
  resumen: string;
}

const PROJECTS_DATA: GalleryProject[] = [
  {
    titulo: 'Área Gourmet',
    etiqueta: 'Gourmet',
    imagen: '/projects/area_gourmet.jpg',
    resumen: 'Área gourmet planeada a medida.',
  },
  {
    titulo: 'Closet',
    etiqueta: 'Vestidor',
    imagen: '/projects/armario.jpg',
    resumen: 'Montaje de closet con divisorias.',
  },
  {
    titulo: 'Armario Arena con Espejo',
    etiqueta: 'Vestidor',
    imagen: '/projects/armarioRopa.jpg',
    resumen: 'Armario con puerta espejada para habitación.',
  },
  {
    titulo: 'Armario Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/armario_cocina.jpg',
    resumen: 'Armario hecho a medida para cocina.',
  },
  {
    titulo: 'Armario',
    etiqueta: 'Dormitorio',
    imagen: '/projects/armario_hab.jpg',
    resumen: 'Armario a medida para habitación.',
  },
  {
    titulo: 'Armario con Espejo',
    etiqueta: 'Vestidor',
    imagen: '/projects/armario_ropa.jpg',
    resumen: 'Armario hecho a medida con puerta espejada.',
  },
  {
    titulo: 'Armario con detalle',
    etiqueta: 'Gourmet',
    imagen: '/projects/armario_vino.jpg',
    resumen: 'Armario hecho a medida con un detalle especial, pensado para vinos.',
  },
  {
    titulo: 'Baño',
    etiqueta: 'Baño',
    imagen: '/projects/baño.jpg',
    resumen: 'Baño con armarios a medida.',
  },
  {
    titulo: 'Baño Compacto Blanco',
    etiqueta: 'Baño',
    imagen: '/projects/baño1.jpg',
    resumen: 'Baño con armarios a medida.',
  },
  {
    titulo: 'Litera',
    etiqueta: 'Juvenil',
    imagen: '/projects/beliche.jpg',
    resumen: 'Litera robusta en MDF estructural con escalera.',
  },
  {
    titulo: 'Cama',
    etiqueta: 'Dormitorio',
    imagen: '/projects/cama.jpg',
    resumen: 'Cama hecha a medida con cajones inferiores.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina1.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina2.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina3.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina4.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina5.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina6.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina Gourmet',
    etiqueta: 'Gourmet',
    imagen: '/projects/cocina_area.jpg',
    resumen: 'Cocina gourmet hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina_barra.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Cocina',
    etiqueta: 'Cocina',
    imagen: '/projects/cocina_color.jpg',
    resumen: 'Cocina hecha a medida.',
  },
  {
    titulo: 'Comercial',
    etiqueta: 'Comercial',
    imagen: '/projects/consultorio.jpg',
    resumen: 'Proyecto comercial hecho a medida para un espacio para niños.',
  },
  {
    titulo: 'Cuarto infantil',
    etiqueta: 'Infantil',
    imagen: '/projects/cuarto.jpg',
    resumen: 'Cuarto infantil hecho a medida.',
  },
  {
    titulo: 'Cuarto infantil',
    etiqueta: 'Infantil',
    imagen: '/projects/cuarto_bebe.jpg',
    resumen: 'Cuarto infantil hecho a medida.',
  },
  {
    titulo: 'Armario con escritorio',
    etiqueta: 'Home Office',
    imagen: '/projects/cuarto_mesa_aramario.jpg',
    resumen: 'Armario con escritorio hecho a medida.',
  },
  {
    titulo: 'Home Office',
    etiqueta: 'Home Office',
    imagen: '/projects/escritorio.jpg',
    resumen: 'Home office hecho a medida.',
  },
  {
    titulo: 'Panel Salón',
    etiqueta: 'Paneles',
    imagen: '/projects/espacio_vino.jpg',
    resumen: 'Panel salón hecho a medida.',
  },
  {
    titulo: 'Mesa de maquillaje',
    etiqueta: 'Mesa',
    imagen: '/projects/espejo.jpg',
    resumen: 'Mesa de maquillaje con luces y espacios pensados para el cliente.',
  },
  {
    titulo: 'Mesa de maquillaje',
    etiqueta: 'Mesa',
    imagen: '/projects/espejo_luz.jpg',
    resumen: 'Mesa de maquillaje con luces y espacios pensados para el cliente.',
  },
  {
    titulo: 'Mesa Vanity',
    etiqueta: 'Mesa',
    imagen: '/projects/espejo_mesa.jpg',
    resumen: 'Vanity hecho a medida.',
  },
  {
    titulo: 'Dormitorio',
    etiqueta: 'Dormitorio',
    imagen: '/projects/habitacion.jpg',
    resumen: 'Dormitorio hecho a medida.',
  },
  {
    titulo: 'Dormitorio',
    etiqueta: 'Dormitorio',
    imagen: '/projects/habitacion_panel.jpg',
    resumen: 'Dormitorio hecho a medida.',
  },
  {
    titulo: 'Dormitorio',
    etiqueta: 'Dormitorio',
    imagen: '/projects/habitacion_proyecto.jpg',
    resumen: 'Dormitorio hecho a medida.',
  },
  {
    titulo: 'Dormitorio',
    etiqueta: 'Dormitorio',
    imagen: '/projects/habProyecto.jpg',
    resumen: 'Dormitorio hecho a medida.',
  },
  {
    titulo: 'Mesa de maquillaje',
    etiqueta: 'Mesa',
    imagen: '/projects/iluminacion.jpg',
    resumen: 'Mesa de maquillaje con luces y espacios pensados para el cliente.',
  },
  {
    titulo: 'Accesorio',
    etiqueta: 'Accesorios',
    imagen: '/projects/joyero.jpg',
    resumen: 'Espacio para accesorios hecho a medida.',
  },
  {
    titulo: 'Lavandería',
    etiqueta: 'Lavandería',
    imagen: '/projects/lavanderia.jpg',
    resumen: 'Lavandería hecha a medida.',
  },
  {
    titulo: 'Mesa accesorio con espejo',
    etiqueta: 'Mesa',
    imagen: '/projects/mesa_espejo.jpg',
    resumen: 'Mesa con espejo hecho a medida para maquillaje y accesorios.',
  },
  {
    titulo: 'Mesa y zapatero',
    etiqueta: 'Dormitorio',
    imagen: '/projects/mesa_hab.jpg',
    resumen: 'Mesa y zapatero hecho a medida para dormitorio.',
  },
  {
    titulo: 'Mesa de Maquillaje',
    etiqueta: 'Mesa',
    imagen: '/projects/mueble_espejo.jpg',
    resumen: 'Mesa de maquillaje con luces y espacios pensados para el cliente.',
  },
  {
    titulo: 'Oficina',
    etiqueta: 'Comercial',
    imagen: '/projects/oficina.jpg',
    resumen: 'Oficina hecha a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel1.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panelG.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Habitación',
    etiqueta: 'Dormitorio',
    imagen: '/projects/panelHAB.jpg',
    resumen: 'Armarios para habitación con espacio para la cama hecho a medida.',
  },
  {
    titulo: 'Mesa con panel para escritorio',
    etiqueta: 'Dormitorio',
    imagen: '/projects/panelHabitacion.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panelO.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel para habitación',
    etiqueta: 'Dormitorio',
    imagen: '/projects/panel_cama.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel_detalle.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel_hab.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel_nuevo.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel_salon.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/panel_tele.jpg',
    resumen: 'Panel hecho a medida.',
  },
  {
    titulo: 'Panel',
    etiqueta: 'Paneles',
    imagen: '/projects/salon.jpg',
    resumen: 'Panel hecha a medida.',
  },
  {
    titulo: 'Comercial',
    etiqueta: 'Comercial',
    imagen: '/projects/tienda.jpg',
    resumen: 'Proyecto comercial hecho a medida.',
  },
];

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [Nav, Footer],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss'
})
export class ProjectsPage implements OnInit, OnDestroy {
  private readonly bodyClass = 'projects-page-active';

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(this.document.body, this.bodyClass);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, this.bodyClass);
  }

  readonly galleryProjects = PROJECTS_DATA;
  readonly filters = ['Todos', ...Array.from(new Set(this.galleryProjects.map(project => project.etiqueta)))];
  selectedFilter: string = 'Todos';

  get filteredProjects(): GalleryProject[] {
    return this.selectedFilter === 'Todos'
      ? this.galleryProjects
      : this.galleryProjects.filter(project => project.etiqueta === this.selectedFilter);
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
  }
}

