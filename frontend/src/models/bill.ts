export default class BillModel {
	id: number;
	customerId: number;
  previousRead: number;
  currentRead: number;
  totalAmount: Number;
  billDate: string;
  createdAt: string;
  billFrom?: string;
  billTo?: string;
}