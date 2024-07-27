import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GlobalModule } from './global/global.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GlobalModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'public';
}
