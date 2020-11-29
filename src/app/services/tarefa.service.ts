import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from '../tarefa/tarefa';
import { ConfigService } from './config.service';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class TarefaService extends GenericService<Tarefa>{
 
  constructor(private http: HttpClient, private configService: ConfigService) {
    super(http, configService.getUrlService()+"tarefas/");
  }
}
