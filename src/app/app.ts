import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginRequiredModalComponent } from './shared/login-required-modal/login-required-modal';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginRequiredModalComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
