import type { IModelsBase } from "./IModelBase";


export interface IPaycode extends IModelsBase {
    name: string;
    timesheet_label: string;
    payroll_label: string;
    invoice_label: string;
    regular_pay_amount: number;
    overtime_pay_amount: number;
    doubletime_pay_amount: number;
    regular_bill_amount: number;
    overtime_bill_amount: number;
    doubletime_bill_amount: number;
    overtime_eligible: number;
    taxable: number;
    type: string;
}