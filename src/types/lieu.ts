// Format returned by API (with fields wrapper)
export interface CoordonneesGeo {
  lat: number;
  lon: number;
}

export interface LieuFields {
  nom_usuel?: string;
  title?: string;
  adresse?: string;
  address_name?: string;
  address_city?: string;
  address_zipcode?: string;
  address_street?: string;
  coordonnees_geo?: { lat: number; lon: number } | null;
  access_type?: string;
  price_type?: string;
  deaf?: boolean;
  blind?: boolean;
  pmr?: boolean;
  programs?: string[];
  cover_url?: string;
  image?: string;
  images?: string[];
  main_image?: string;
}

// API Record format (from que-faire-a-paris dataset)
export interface APIRecord {
  recordid: string;
  fields: LieuFields;
  geometry?: {
    type: string;
    coordinates: [number, number]; // [lon, lat]
  };
}

// Simplified format used internally in the app
export interface Lieu {
  id: string;
  nom_usuel: string;
  adresse?: string;
  coordonnees_geo: CoordonneesGeo | null;
  image?: string;
}

export interface ApiResponse {
  nhits: number;
  records: APIRecord[];
}