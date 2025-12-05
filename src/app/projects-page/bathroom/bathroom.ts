import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Datos, ShowcaseProject } from '../../datos';
import { ConfirmationModal } from '../../shared/confirmation-modal/confirmation-modal';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastNotification } from '../../shared/toast-notification/toast-notification';

@Component({
  selector: 'app-bathroom',
  imports: [CommonModule, ConfirmationModal, ToastNotification],
  templateUrl: './bathroom.html',
  styleUrl: './bathroom.scss',
})
export class Bathroom implements OnInit, OnDestroy {
  projects: ShowcaseProject[] = [];
  isLoading = true;
  errorMessage = '';
  selectedProject: ShowcaseProject | null = null;
  isAdmin = false; // Admin delete functionality

  // Confirmation modal
  showDeleteConfirm = false;
  projectToDelete: number | null = null;

  private projectsSubscription?: Subscription;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'info' | 'warning' = 'success';
  toastDuration = 3000;
  private toastTimeout?: ReturnType<typeof setTimeout>;

  constructor(private datosService: Datos, private router: Router) {}

  ngOnInit() {
    this.loadProjects();
    this.checkAdminStatus();

    // Subscribe to project changes
    this.projectsSubscription = this.datosService.showcaseProjectsChanged$.subscribe(() => {
      this.loadProjects();
    });
  }

  ngOnDestroy() {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
  }

  checkAdminStatus() {
    this.datosService.getLoggedUser().subscribe({
      next: (user) => {
        const role = user && (user.rol || user.role) ? user.rol || user.role : null;
        this.isAdmin = !!role && ['admin', 'carpintero', 'superadmin', 'arquitecto'].includes(role);
      },
      error: () => {
        this.isAdmin = false;
      },
    });
  }

  loadProjects() {
    this.isLoading = true;
    this.errorMessage = '';

    this.datosService.getBathroomProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading bathroom projects:', error);
        this.errorMessage = 'Error al cargar los proyectos de baño. Por favor, intenta de nuevo.';
        this.isLoading = false;
      },
    });
  }

  viewProject(project: ShowcaseProject) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
  }

  retryLoad() {
    this.loadProjects();
  }

  confirmDeleteProject(projectId: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.projectToDelete = projectId;
    this.showDeleteConfirm = true;
  }

  cancelDelete() {
    this.showDeleteConfirm = false;
    this.projectToDelete = null;
  }

  executeDelete() {
    if (!this.isAdmin || !this.projectToDelete) {
      return;
    }

    this.datosService.deleteShowcaseProject(this.projectToDelete).subscribe({
      next: () => {
        this.showDeleteConfirm = false;
        this.projectToDelete = null;
        this.triggerToast('Proyecto eliminado correctamente.', 'success');
      },
      error: (err) => {
        console.error('Error deleting project:', err);
        this.showDeleteConfirm = false;
        this.projectToDelete = null;
        this.errorMessage = 'Error al eliminar el proyecto.';
        const message = err?.error?.error || 'Error al eliminar el proyecto.';
        this.triggerToast(message, 'error');
      },
    });
  }

  // Helper method to calculate start date
  getStartDate(completedDate: string, duration: number): Date {
    const completed = new Date(completedDate);
    const start = new Date(completed);
    start.setDate(start.getDate() - duration);
    return start;
  }

  // Helper method to get category display name
  getCategoryName(category: string): string {
    const categoryNames: { [key: string]: string } = {
      kitchen: 'Kitchen',
      bathroom: 'Bathroom',
      bedroom: 'Bedroom',
      livingroom: 'Living Room',
      others: 'Custom Furniture',
    };
    return categoryNames[category] || category;
  }

  goToServices() {
    this.router.navigate(['/services']);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  private triggerToast(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }
    this.toastTimeout = setTimeout(() => {
      this.showToast = false;
    }, this.toastDuration);
  }
}
