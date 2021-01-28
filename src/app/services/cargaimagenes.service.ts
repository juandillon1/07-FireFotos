import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';
@Injectable({
  providedIn: 'root'
})
export class CargaimagenesService {
  private CARPETA_FOTOS = 'img';
  constructor( private db: AngularFirestore ) { }
  private guardarfoto( imagen: {nombre: string, url: string} ) {
    this.db.collection( `/${ this.CARPETA_FOTOS }` )
            .add( imagen );
  }
  cargarImagenesFirebase( imagenes: FileItem[] ) {
    const storageRef = firebase.storage().ref();
    for ( const item of imagenes ) {
      item.estasubiendo = true;
      if ( item.progreso === 100 ) {
        continue;
      }
      const uploadTasks: firebase.storage.UploadTask = storageRef
            .child(`${ this.CARPETA_FOTOS }/${item.nombrearchivo}`)
            .put( item.archivo );
      uploadTasks.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.error('Error al subir', error),
        () => {
          console.log('Imagen Cargada correctamente');
          uploadTasks.snapshot.ref.getDownloadURL()
            .then((url) => {
              item.url = url;
              item.estasubiendo = false;
              this.guardarfoto({
                nombre: item.nombrearchivo,
                url: item.url
            });
          });
        }
      );


    }
  }
}
