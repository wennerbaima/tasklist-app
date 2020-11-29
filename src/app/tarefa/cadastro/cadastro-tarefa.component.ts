import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TarefaService } from '../../services/tarefa.service';
import {Tarefa} from '../tarefa';
import toastr from 'toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
    selector: 'app-cadastro-tarefa',
    templateUrl: './cadastro-tarefa.component.html',
    styleUrls:["./cadastro-tarefa.component.css"]
  })
  export class CadastroTarefaComponent implements OnInit {
 
    public title: string;
    public tarefa: Tarefa = new Tarefa();
    public form: FormGroup;
    protected formBuilder: FormBuilder = new FormBuilder();
 
    constructor(private tarefaService: TarefaService,
                private ref: DynamicDialogRef,
                private config: DynamicDialogConfig,){}
 
    /**INICIALIZA O COMPONENTE */
    ngOnInit() {
 
      this.form = this.formBuilder.group({
        id: [null],
        titulo: [null, Validators.required],
        descricao: [null],
        dataCadastro: [null],
        dataEdicao: [null],
        concluido: [false]
      });

      if(this.config.data.id == undefined){
        this.title = "Nova Tarefa";
      }
      else{

        this.title = "Editar Tarefa";
        this.tarefaService.findById(Number(this.config.data.id)).subscribe(
          result => 
            this.form.patchValue(result)
        )
      }      
    }

    /**CHAMA O SERVIÇO PARA INSERIR/ATUALIZAR UMA TAREFA */
    salvar():void {

      /**INSERE */
      if(this.form.get("id").value == undefined){
        this.tarefa = this.form.value;
        this.tarefa.dataCadastro = new Date();
        
        this.tarefaService.add(this.tarefa).subscribe(
            (result) => toastr.success("Tarefa cadastrada com sucesso!"),
            (error) => toastr.error("Ocorreu um erro durante o cadastro!")
        );
 
      }
      else{
        /**ATUALIZA */
        this.tarefa = this.form.value;
        this.tarefa.dataEdicao = new Date();
        this.tarefaService.update(this.tarefa.id, this.tarefa).subscribe(
            (result) => toastr.success("Tarefa atualizada com sucesso!"),
            (error) => toastr.error("Ocorreu um erro durante a atualização!")
       );
      }
 
      this.ref.close(true);
    }
 
  }