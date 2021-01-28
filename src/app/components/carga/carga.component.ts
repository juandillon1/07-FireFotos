import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaimagenesService } from '../../services/cargaimagenes.service';
@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {
  archivos: FileItem[] = [];
  estaSobreElemento = false;
  constructor( private cargaimagenes: CargaimagenesService ) { }

  ngOnInit(): void {
  }
  cargarImagenes() {
    this.cargaimagenes.cargarImagenesFirebase( this.archivos );
  }
  borrarArchivos() {
    this.archivos = [];
  }

}
