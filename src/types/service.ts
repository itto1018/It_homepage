export type ServiceType =
  | "data-infrastructure"
  | "web-development"
  | "data-analytics";
export interface Service {
  id: string;
  title: string;
  items: string[];
}
