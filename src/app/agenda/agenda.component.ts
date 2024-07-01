import { Component, OnInit } from '@angular/core';
import { Contato } from '../contato';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit {
  contatos: Contato[]=[];
  formGroupContato: FormGroup;

  isEditing: boolean = false;

  ngOnInit(): void {
      this.loadContatos();
  }

  loadContatos(){
    this.service.getContatos().subscribe({
      next: data => this.contatos = data
    })
  }

  constructor(private formBuilder:FormBuilder, private service: ContatoService){
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
    if(this.isEditing){
      this.service.save(this.formGroupContato.value).subscribe({
        next: () => {
          this.loadContatos();
          this.isEditing = false;
          this.formGroupContato.reset();
        }
      })
    } else{
      this.service.save(this.formGroupContato.value).subscribe({
        next: (data) => {
          this.contatos.push(data);
          this.formGroupContato.reset();
        }
      })
    }
  }

  delete(contato:Contato){
    this.service.delete(contato).subscribe({
      next: () => this.loadContatos()
    })
  }

  edit(contato: Contato){
    this.formGroupContato.setValue(contato);
    this.isEditing = true;
  }


}
