import { Equipment } from './equipment.model';
import { User } from './user.model';

export interface Issue {
  id?: number;
  description: string;
  severity: string;
  status: string;
  reportedDate?: string;
  resolvedDate?: string;
  resolution?: string;
  equipment?: Equipment;
  technician?: User;
} 