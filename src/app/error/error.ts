import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, Nav],
  templateUrl: './error.html',
  styleUrl: './error.scss',
})
export class Error {}
