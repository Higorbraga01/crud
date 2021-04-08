import { SetorService } from './../../setor/setor.service';
import { Setor } from './../../setor/setor.model';
import { Router } from '@angular/router';
import { ColaboradorService } from './../colaborador.service';
import { Colaborador } from './../colaborador.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomErrorStateMatcher } from 'src/app/validators/CustomErrorStateMatcher';
import { DateValidator } from 'src/app/validators/DateValidator';

@Component({
  selector: 'app-colaborador-create',
  templateUrl: './colaborador-create.component.html',
  styleUrls: ['./colaborador-create.component.css']
})
export class ColaboradorCreateComponent implements OnInit {

  matcher = new CustomErrorStateMatcher();

  formGroup: FormGroup

  colaborador: Colaborador = {
    cpf: "",
    nome: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    setor: null
  }

  setores: Setor[];

  constructor(
    private colaboradorService: ColaboradorService,
    private router: Router,
    private setorService: SetorService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      setor: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNascimento: ['', [Validators.required, DateValidator.date]]
    });
    this.formGroup.valueChanges.pipe().subscribe(colaborador => {
      this.colaborador = colaborador
      console.log(this.colaborador.dataNascimento);

    });
    this.setorService.read().subscribe(setores => {
      this.setores = setores;
    });
  }

  create(): void {
    // if (this.formGroup.dirty && this.formGroup.valid) {
    //   alert(
    //     `Nome: ${this.formGroup.value.nome} Email: ${this.formGroup.value.email}`
    //   );
    // }
    this.colaboradorService.create(this.colaborador).subscribe(() => {
      this.colaboradorService.showMessage('Colaborador salvo com sucesso!')
      this.router.navigate(['/colaboradores']);
    });
  }

  cancel(): void {
    this.router.navigate(['/colaboradores']);
  }

}
