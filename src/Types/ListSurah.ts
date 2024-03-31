import { ObjectId } from 'mongodb';

export interface DetailList {
  _id?: ObjectId;
  nomor?: number;
  nama?: string;
  nama_latin?: string;
  jumlah_ayat?: number;
  tempat_turun?: string;
  arti?: string;
  deskripsi?: string;
  audio?: string;
}

export interface ListSurahs {
  [index: number]: DetailList;
}