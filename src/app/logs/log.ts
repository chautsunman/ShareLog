export class Log {
  id: string
  title: string;
  detail: string;
  type: string;
  money: number;
  recommend: boolean;
  rate: number;
  date: number;
  lat: number;
  lng: number;

  constructor(
      id?: string, title?: string, detail?: string, type?: string,
      money?: number, recommend?: boolean, rate?: number,
      date?: number, lat?: number, lng?: number) {
    this.id = id || '';
    this.type = type || 'activity';
    this.title = title || '';
    this.detail = detail || '';
    this.money = money ? money : 0;
    this.recommend = recommend || true;
    this.rate = rate || 10;
    this.date = date || null;
    this.lat = lat || 22.3964;
    this.lng = lng || 114.1095;
  }
}
