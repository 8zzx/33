export interface DeviceFromApi {
  name: string;
  imageUrl: string;
}

export interface Device {
  name: string;
  categoryName: string;
  imageUrl: string;
}

export interface DeviceCategory {
  name: string;
  description: string;
  devices: DeviceFromApi[];
}

export interface Malfunction {
    fault: string;
    solution: string;
}

export interface DeviceDetails {
    name:string;
    principle: string;
    malfunctions: Malfunction[];
}

export interface Book {
    title: string;
    author: string;
    description: string;
}

export interface BookDetails extends Book {
    summary: string;
}

export interface Article {
    title: string;
    authors: string;
    journal: string;
    summary: string;
    url: string;
}

export interface Conference {
    name: string;
    location: string;
    date: string;
    description: string;
    url: string;
}

export interface Lecture {
  title: string;
  description: string;
  fileName: string;
  stage: 'second' | 'third' | 'fourth';
  content_en: string;
}