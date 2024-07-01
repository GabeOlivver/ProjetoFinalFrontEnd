import { Component } from '@angular/core';
import { Contato } from '../contato';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent {
  contatos: Contato[]=[];
  formGroupContato: FormGroup;

  constructor(private formBuilder:FormBuilder){
    this.formGroupContato = formBuilder.group({
      id: [''],
      nome: [''],
      email: [''],
      telefone: [''],
      tipoContato: [''],
      preferenciaContato: [''],
      observacoes: [''],
      confirmacao: ['']
    });
  }

  save(){
    this.contatos.push(this.formGroupContato.value);
  }
}
