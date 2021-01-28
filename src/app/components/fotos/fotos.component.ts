import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
export interface Item { nombre: string; url: string; }
@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  constructor( private afs: AngularFirestore ) {}

  ngOnInit(): void {
    this.itemsCollection = this.afs.collection<Item>('img');
    this.items = this.itemsCollection.valueChanges();
  }
  mostrarImagen( item: Item ) {
    Swal.fire(
      {
        imageUrl: `${item.url}`,
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#dc3545',
          imageWidth: 720,
          imageHeight: 480,
          grow: 'fullscreen'
      }
    );
  }

}
