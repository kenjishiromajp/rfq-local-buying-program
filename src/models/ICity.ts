import { IState } from 'models/IState';

export interface ICity {
  ID: number;
  Name: string;
  State_ID: number;
  State?: IState;
}
