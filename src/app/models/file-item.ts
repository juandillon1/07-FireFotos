export class FileItem {
    public archivo: File;
    public nombrearchivo: string;
    public url: string;
    public estasubiendo: boolean;
    public progreso: number;
    constructor( archivo: File ) {
        this.archivo = archivo;
        this.nombrearchivo = archivo.name;

        this.estasubiendo = false;
        this.progreso = 0;
    }
}
