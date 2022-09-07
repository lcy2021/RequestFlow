export default interface HeaderModel {
  current: string;
  isEnd: boolean;
  children: Record<string, HeaderModel>;
  endStr?: string;
}
