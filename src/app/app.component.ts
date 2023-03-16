import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Popover } from "bootstrap";
import { Options } from '@popperjs/core';
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  helpFormatModal: any;
  test:any;
  caracteristiques = [
    'Simulation pour une diffusion nationale (Métropole uniquement)',
    'Simulation pour une diffusion sur un ou plusieurs départements (y compris D.O.M)',
    'Simulation sur la base de votre fichier (nombre de clients par code postal)',
  ];
  formats = ['PF', 'GF', 'AF'];
  // caracteristiques=[{id:'1',value:'Simulation pour une diffusion nationale (Métropole uniquement)'},
  //   {id:'2',value:'Simulation pour une diffusion sur un ou plusieurs départements (y compris D.O.M)'},
  // {id:'3',value:'Simulation sur la base de votre fichier (nombre de clients par code postal)'}];

  userForm: FormGroup;


  poidsMax: string = '';

  constructor(
    private router: Router,

    private fb: FormBuilder
) {}

popperOptions = (options: Partial<Options>) => {
  // customize placement
  options.placement = 'bottom';

  // customize modifiers
  for (const modifier of options.modifiers || []) {
    // disable flip
    if (modifier.name === 'flip') {
      modifier.enabled = false;
    }

    // customize offset
    if (modifier.name === 'offset' && modifier.options) {
      // modifier.options.offset = () => [20, 20];
    }
  }

  // add your own modifier
  options.modifiers?.push({
    name: 'custom',
    enabled: true,
    phase: 'main',
    fn: ({ state }) => {
      console.log('custom modifier');
    },
  });

  // first update callback
  options.onFirstUpdate = (state) => {
    console.log('onFirstUpdate', state);
    if (state.elements?.arrow) {
      state.elements.arrow.style.display = 'none';
    }
  };
  return options;
};

  ngOnInit(): void {
    // this.test = new Popover(document.querySelector('.example-popover'), {
    //   container: 'body',
    //   html: true,
    //   content: document.getElementById('mypopover-content'),
    //   placement: 'top',
    //   offset:'20'

    // });


    this.userForm = new FormGroup({
      caracteristique: new FormControl(null, [Validators.required]),
      nbrPlis: new FormControl(null, [Validators.required]),
      poidsObj: new FormControl(null, [Validators.required]),
      format: new FormControl(null, [Validators.required]),
    });

  this.userForm.statusChanges.subscribe((status) => console.log(status));
  this.helpFormatModal = new window.bootstrap.Modal(
    document.getElementById('helpFormat')
  );


}



  openHelpFormatModal() {
    this.helpFormatModal.show();
    this.test.hide();

  }

  closeHelpFormatModal() {
    this.helpFormatModal.hide();
  }

  onSubmit() {
    console.log(this.userForm);
  }



}

