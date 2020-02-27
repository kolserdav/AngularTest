import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';



@Component({
  selector: 'app-messages',
  templateUrl : './messages.component.html',
  styleUrls: ['./messages.component.scss', '../../app.component.scss']
})
export class MessagesComponent implements OnInit {
  store: any;
  data: any;
  oldTag: any;
  @Input() messages = [];
  constructor(storage: StorageService) {
    this.store = storage.get();
    this.store.subscribe(() => {
      const state = this.store.getState();
      const mess = state.messages;
      if (mess[0]) {
        let someMess;
        if (mess[0][0]) {
          let leng = 0;
          for (let i = 0; mess[0][i]; i ++) {
            leng = i;
          }
          someMess = (!mess[0][leng].new)? [] : this.messages;
        }
        for (let i = 0; mess[0][i]; i ++) {
          someMess.push(mess[0][i])
        }
        this.messages = someMess;
      }
    });
  }

  ngOnInit(): void {
  }

}
