import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import * as QRCode from 'qrcode';
import { HeaderComponent } from '../../../shared/header/header';

@Component({
  selector: 'app-qrcodes',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './qrcodes.html',
  styleUrls: ['./qrcodes.css'],
})
export class QRCodesComponent implements OnInit {
  sessionCode = '';
  qrCodeDataUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sessionCode = this.route.snapshot.queryParamMap.get('hash') || '';

    if (this.sessionCode) {
      this.gerarQRCode();
    }
  }

  async gerarQRCode(): Promise<void> {
    const linkAluno = `${window.location.origin}/aluno/validar?hash=${this.sessionCode}`;

    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(linkAluno, {
        width: 250,
        margin: 1,
      });

      this.cdr.detectChanges();
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    }
  }

  copiarLink(): void {
    const link = `${window.location.origin}/aluno/validar?hash=${this.sessionCode}`;

    navigator.clipboard.writeText(link).then(() => {
      alert('Link da sessão copiado!');
    });
  }
}
