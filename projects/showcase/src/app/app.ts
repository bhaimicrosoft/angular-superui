import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from 'lib';
import { InputComponent } from 'lib';
import { Alert } from 'lib';

@Component({
  selector: 'app-root',
  imports: [Button, InputComponent, Alert],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('showcase');
}