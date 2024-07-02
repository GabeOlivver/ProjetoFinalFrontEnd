import { Component, OnInit } from '@angular/core';
import { Contato } from '../contato';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      nome: ['',[Validators.minLength(3), Validators.required]],
      email: ['',[Validators.minLength(3), Validators.required]],
      telefone: ['',[Validators.minLength(3), Validators.required]],
      tipoContato: ['', [Validators.required]],
      preferenciaContato: ['email', [Validators.required]],
      observacoes: ['', [Validators.required]],
      confirmacao: ['']
    });
  }

  save(){
    if(this.formGroupContato.valid){
      if(this.isEditing){
        this.service.update(this.formGroupContato.value).subscribe({
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
  }

  get nome(): any{
    return this.formGroupContato.get("nome");
  }

  get email(): any{
    return this.formGroupContato.get("email");
  }

  get telefone(): any{
    return this.formGroupContato.get("telefone");
  }

  get tipoContato(): any{
    return this.formGroupContato.get("tipoContato");
  }

  get preferenciaContato(): any{
    return this.formGroupContato.get("preferenciaContato")
  }

  get confirmacao(): any{
    return this.formGroupContato.get("confirmacao")
  }

  get observacoes(): any{
    return this.formGroupContato.get("observacoes")
  }

  delete(contato: Contato){
    this.service.delete(contato).subscribe({
      next: () => this.loadContatos()
    })
  }

  edit(contato: Contato){
    this.formGroupContato.setValue(contato);
    this.isEditing = true;
  }


}
