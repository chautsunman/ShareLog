export class Log {
  title: string;
  detail: string;
  money: number;
  recommend: boolean;
  rate: number;
  lat: number;
  lng: number;

  constructor(
      title?: string, detail?: string,
      money?: number, recommend?: boolean, rate?: number,
      lat?: number, lng?: number) {
    this.title = title || '';
    this.detail = detail || '';
    this.money = money ? money : 0;
    this.recommend = recommend || true;
    this.rate = rate || 10;
    this.lat = lat || 22.3964;
    this.lng = lng || 114.1095;
  }
}
