import { ObjectId } from 'mongodb';

export interface DetailAyat {
    id?: number;
    surah?: number;
    nomor?: number;
    ar?: string | undefined;
    tr?: string;
    idn?: string;
}
export interface Ayat {
    [index: number]: DetailAyat;
}
export interface SurahBeforeAfter {
    id?: number;
    nomor?: number;
    nama?: string;
    nama_latin?: string;
    jumlah_ayat?: number;
    tempat_turun?: string;
    arti?: string;
    deskripsi?: string;
    audio?: string;
}
export interface DetailSurahs {
    _id?: ObjectId;
    status?: boolean;
    nomor?: number;
    nama?: string;
    nama_latin?: string;
    jumlah_ayat?: number;
    tempat_turun?: string;
    arti?: string;
    deskripsi?: string;
    audio?: string;
    ayat?: Array<Ayat>;
    surat_selanjutnya?: SurahBeforeAfter | boolean;
    surat_sebelumnya?: SurahBeforeAfter | boolean;
}

export interface DetailAyats {
    id?: number | string;
    arabic?: string | undefined;
}

export interface Ayats {
    [index: number]: DetailAyats
}

export interface Arabic {
    id?: number | string;
    ayat: Array<Ayats>;
}