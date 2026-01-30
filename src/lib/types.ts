export interface Personaje {
  id: number;
  nombre: string;
  ki: string;
  raza: string;
  genero: string;
  descripcion: string;
  imagen: string;
  afiliacion: string;
  transformaciones: { nombre: string; ki: string; imagen: string }[];
  biografia: string;
}

export interface Planeta {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  estaDestruido: boolean;
  eliminadoEn: string;
  personajes: Personaje[];
}

export interface Transformacion {
  id: number;
  nombre: string;
  imagen: string;
  ki: string;
}
