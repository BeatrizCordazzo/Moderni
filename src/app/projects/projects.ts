import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [MatCardModule, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  @ViewChild('projectsViewport') projectsViewport?: ElementRef<HTMLDivElement>;

  scrollProjects(direction: 'left' | 'right'): void {
    const viewport = this.projectsViewport?.nativeElement;
    if (!viewport) return;
    const amount = Math.max(320, Math.floor(viewport.clientWidth * 0.75));
    viewport.scrollBy({
      left: direction === 'right' ? amount : -amount,
      behavior: 'smooth',
    });
  }

}
