import { Directive, EventEmitter, ElementRef, HostListener, Output, Input } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {
  @Input () archivos: FileItem[] = [];
  @Output() mousesobre: EventEmitter<boolean> = new EventEmitter();

  constructor() {}
  //Se pasa mouse en imagen
  @HostListener('dragover', ['$event'])
  public onDragEnter( event: any) {
    this.mousesobre.emit( true );
    this.prevenirdetener( event );
  }
  //mouse sobre imagen
  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any) {
    this.mousesobre.emit( false );
  }
  //se saca el mouse de la imagen
  @HostListener('drop', ['$event'])
  public onDrop( event: any) {
    const transferencia = this.getTransferencia( event );
    if ( !transferencia ) {return; }
    this.extraerarchivos( transferencia.files );
    this.prevenirdetener( event );
    this.mousesobre.emit( false );
    //this.prevenirdetener( event );
  }
  private getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }
  private extraerarchivos( archivosLista: FileList ) {
    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames( archivosLista )) {
      const archivoTemp = archivosLista[propiedad];
      if ( this.archivopuedecargarse( archivoTemp ) ) {
        const nuevoarchivo = new FileItem( archivoTemp );
        this.archivos.push(nuevoarchivo);
      }
    }
    console.log(this.archivos);
  }
  //validaciones
  private archivopuedecargarse( archivo: File ): boolean {
    if ( !this.archivodropeado( archivo.name)  && this.esImagen( archivo.type ) ) {
      return true;
    } else {
      return false;
    }
  }
  private prevenirdetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }
  private archivodropeado( nombreArchivo: string ): boolean {
    for ( const archivo of this.archivos ) {
      if ( archivo.nombrearchivo === nombreArchivo ) {
        console.log('Nombre archivo: ' + archivo.nombrearchivo + ' ya existe');
        return true;
      }
    }
    return false;
  }

  private esImagen( tipo: string ): boolean {
    return ( tipo === '' || tipo === undefined) ? false : tipo.startsWith('image');
  }

}
