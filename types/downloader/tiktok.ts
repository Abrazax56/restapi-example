export interface Author {
  avatar?: string;
  nickname?: string;
}

export interface Images {
  [index: number]: string;
}

export interface Result {
  type?: string;
  author?: Author;
  desc?: string;
  images?: Images;
  music?: string;
  video1?: string;
  video2?: string;
  video_hd?: string;
  video_watermark?: string;
}

export interface Tiktok {
  status?: string;
  result?: Result;
}