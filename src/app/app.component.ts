import { Component, Input } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title: string = 'angChat'; 
  constructor(db: DatabaseService) {
    window.addEventListener('resize', () => {
      console.log(window.innerWidth)
    });
    document.body.style.margin = '0';
  }
}
