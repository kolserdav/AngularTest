import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss', '../../app.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  toAnchor(selector: string) {
		var element = document.querySelector('#' + selector);
		//element.scrollIntoView({ behavior: 'smooth', block: 'end' });
		let scrollTop = window.pageYOffset || element.scrollTop
   	const windowWidth = window.innerWidth;
   	let menuHeight = 123;
		if (windowWidth <= 1400) menuHeight = 80;
		if (windowWidth <= 960) menuHeight = 40;
		if (selector == 'mission') menuHeight = 0;
  	const finalOffset = element.getBoundingClientRect().top + scrollTop - menuHeight;
	  window.parent.scrollTo({
	    top: finalOffset,
	    behavior: 'smooth'
	  })
	}

  clickMenu(e) {
    this.toAnchor('start');
  }

  ngOnInit(): void {
  }

}
