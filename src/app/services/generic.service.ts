import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**CLASSE ABSTRATA CRUD */

export abstract class GenericService<T> {
    constructor(protected _http: HttpClient, protected url: string) {}

    /**CONSULTA OS ITENS CADASTRADOS */
    public findAll(): Observable<T[]> {
        return this._http.get<T[]>(this.url);
    }

    /**CONSULTA UM ITEM PELO ID */
    public findById(id: number): Observable<T> {
        return this._http.get<T>(this.url+id);
    }

    /**ADICIONA UM NOVO ITEM */
    add(t: T): Observable<T>{
        return this._http.post<T>(this.url, t);
    }

    /**ATUALIZA UM ITEM */
    update(id: number, t: T): Observable<T>{
        return this._http.put<T>(this.url+id, t);
    }

    /**DELETA UM ITEM */
    delete(id: number): Observable<T>{
        return this._http.delete<T>(this.url+id);
    }
}