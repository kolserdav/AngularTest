import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { NgRedux } from '@angular-redux/store';
import { StorageService } from '../../services/storage.service';

interface Message {
  tag: string;
  text: string;
  new: boolean;
}

interface IAppState {
  messages: Message[];
  lastUpdate: Date;
}

const REMOVE_ALL_MESSAGES = 'REMOVE_ALL_MESSAGES',
  ADD_MESSAGE = 'ADD_MESSAGE';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss', '../../app.component.scss']
})

export class InputComponent {
  @Input() id: 5;
  //@Output() onInput = new EventEmitter();
  db: DatabaseService;
  messages: Object;
  messagesStore: any;
  ngRedux: NgRedux<IAppState>;
  oldValue: string;

  constructor(db: DatabaseService, ngRedux: NgRedux<IAppState>, storage: StorageService) {
    this.db = db;
    this.ngRedux = ngRedux;
    const INITIAL_STATE: IAppState = {
      messages: [],
      lastUpdate: null
    }
    const reducer = (state: IAppState, action): IAppState => {
      switch (action.type) {
        case ADD_MESSAGE:
          return Object.assign({}, state, {
            messages: state.messages.concat(Object.assign({}, action.state)),
            lastUpdate: new Date()
          });
        case REMOVE_ALL_MESSAGES:
          return INITIAL_STATE;
        default:
          return state
      }
    }
    ngRedux.configureStore(reducer, INITIAL_STATE);
    storage.set(ngRedux);
  }

  handleKeyPress(e: any) {
    if (e.keyCode === 13) {
      let value = e.target.value;
      value = value.trim();
      const regex = /#[a-zA-ZА-Яа-я0-9]+/;
      let tag = value.match(regex);
      if (tag) tag = tag[0];
      const text = (tag)? value.replace(tag, '') : null;
      if (text) {
        const addTag = new Promise((resolve, reject) => { 
          this.db.firestore.collection("messages").add({
            tag: tag,
            text: text
          })
          .then(function(doc) {
              resolve(doc);
          })
          .catch(function(error) {
            reject(error);
          });
        });
        addTag.then(data => {
          e.target.value = tag;
          const ms = this.ngRedux.getState().messages;
          ms.push({tag: tag, text: text, new: true});
          this.ngRedux.dispatch({ type: REMOVE_ALL_MESSAGES });
          this.ngRedux.dispatch({type: ADD_MESSAGE, state: ms });
        })
        .catch(e => console.error(e));
      }
      else if (tag) {
        this.handleChange(e);
      }
    }
  }

  handleChange(event: any) {
    let value = event.target.value;
    value = value.trim();
    if (value.match(/^#[a-zA-ZА-Яа-я0-9]+$/)) {
      const searchTag = new Promise((resolve, reject) => { 
        this.db.firestore.collection("messages").where("tag", "==", value)
        .get()
        .then(function(querySnapshot) {
            let results = [];
            querySnapshot.forEach(function(doc) {
              results.push(doc.data())
            });
            resolve(results);
        })
        .catch(function(error) {
          reject(error);
        });
      });
      searchTag.then(data => {
        let saveData: Message[] = [];
        for (let i = 0; data[i]; i ++) {
          saveData.push({
            text: data[i].text,
            tag: data[i].tag,
            new: false
          });
        }
        if (saveData.length === 0) {
          saveData = [{
            tag: value,
            text: 'На данный тег нет сообщений, будьте первым!',
            new: false
          }]
        }
        if (value !== this.oldValue && saveData[0]) {
          this.ngRedux.dispatch({ type: REMOVE_ALL_MESSAGES });
          this.ngRedux.dispatch({type: ADD_MESSAGE, state: saveData });
          this.oldValue = value;
        }
      })
      .catch(e => console.error(e));
    }
  }
    
}
