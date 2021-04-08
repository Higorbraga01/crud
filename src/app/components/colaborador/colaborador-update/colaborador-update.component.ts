import { SetorService } from './../../setor/setor.service';
import { Colaborador } from './../colaborador.model';
import { ColaboradorService } from './../colaborador.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from '../../setor/setor.model';
import { CustomErrorStateMatcher } from 'src/app/validators/CustomErrorStateMatcher';
import { FormBuilder, Validators } from '@angular/forms';
import { DateValidator } from 'src/app/validators/DateValidator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-colaborador-update',
  templateUrl: './colaborador-update.component.html',
  styleUrls: ['./colaborador-update.component.css']
})
export class ColaboradorUpdateComponent implements OnInit {

  matcher = new CustomErrorStateMatcher();
  
  colaborador: Colaborador = {
    cpf: "",
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: null,
    setor: null
  }

  setores: Setor[];

  formGroup = this.formBuilder.group({
    setor: ['', [Validators.required]],
    nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
    telefone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dataNascimento: ['', [Validators.required, DateValidator.date]]
  });

  constructor(
    private router: Router, 
    private colaboradorService: ColaboradorService,
    private setorService: SetorService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup.get('setor').valueChanges.pipe().subscribe((colaborador) => {
      this.colaborador.setor = colaborador
    });
    this.formGroup.get('nome').valueChanges.pipe(debounceTime(1000)).subscribe((colaborador) => {
      this.colaborador.nome = colaborador
    });
    this.formGroup.get('cpf').valueChanges.pipe().subscribe((colaborador) => {
        this.colaborador.cpf = colaborador
      });
    this.formGroup.get('telefone').valueChanges.pipe().subscribe((colaborador) => {
          this.colaborador.telefone = colaborador
    });
    this.formGroup.get('email').valueChanges.pipe(debounceTime(1000)).subscribe((colaborador) => {
      this.colaborador.email = colaborador
      console.log(this.colaborador.email);
    });
    this.formGroup.get('dataNascimento').valueChanges.pipe(debounceTime(1000)).subscribe((colaborador) => {
      this.colaborador.dataNascimento = colaborador
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.colaboradorService.readById(id).subscribe(colaborador =>{
      this.colaborador = colaborador
      console.log(this.colaborador);
      
    });
    this.setorService.read().subscribe(setores => {
      this.setores = setores;
    })
  }

  update(): void {
    this.colaboradorService.update(this.colaborador).subscribe(() =>{
      this.colaboradorService.showMessage('Dados atualizado com sucesso!');
      this.router.navigate(["/colaboradores"]);
    })
  }

  cancel(): void {
    this.router.navigate(["/colaboradores"]);
  }

}
