import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from './tarefa';
import { ConfigService } from '../services/config.service';

@Injectable()
export class TarefaService {
  private url: string;
 
  constructor(private http: HttpClient,
              private configService: ConfigService) {
    this.url = configService.getUrlService();
  }

  /**CONSULTA AS TAREFAS CADASTRADAS */
  public findAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(this.url);
  }

  /**CONSULTA UMA TAREFA PELO ID */
  public findById(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(this.url+id);
  }

  /**ADICIONA UMA NOVA TAREFA */
  add(tarefa: Tarefa): Observable<Tarefa>{
    return this.http.post<Tarefa>(this.url, tarefa);
  }

  /**ATUALIZA UMA TAREFA */
  update(tarefa: Tarefa): Observable<Tarefa>{
    return this.http.put<Tarefa>(this.url+tarefa.id, tarefa);
  }

  /**DELETA UMA TAREFA */
  delete(id: number): Observable<Tarefa>{
    return this.http.delete<Tarefa>(this.url+id);
  }
}
