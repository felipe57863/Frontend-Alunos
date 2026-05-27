import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroForm } from '../models/registro-form';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.baseUrl = this.config.getApi('trabalho');
  }

  criarAtividade(registroForm: RegistroForm): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/cadastrar-trabalho-grupos`,
      registroForm
    );
  }

  alterarNomeGrupo(idGrupo: number, nomeGrupo: string): Observable<any> {
    const nomeEncoded = encodeURIComponent(nomeGrupo);
    const url = `${this.config.getApi('trabalho')}/editar-grupo/${idGrupo}/${nomeEncoded}`;
    return this.http.post(url, nomeGrupo, {
      headers: { 'Content-Type': 'text/plain' },
      responseType: 'text' as 'json'
    });
  }

}
