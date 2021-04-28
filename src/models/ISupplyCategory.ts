export interface ISupplyCategory {
  ID: number;
  Name?: string;
  Description?: string;
  SupplyCategories?: ISupplyCategory[];
  SupplyCategory?: ISupplyCategory;
}
