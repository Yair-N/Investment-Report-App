import { Policy } from "@/app/types";
import * as XLSX from 'xlsx';


export const findFundsIds = (kranot: string): number[] => {
    const ids: number[] = [];
    const regex = /\((\d+)\)/g;
    let match;

    while ((match = regex.exec(kranot)) !== null) {
        ids.push(parseInt(match[1]));
    }

    return ids
}


export const extractPolicyData = (data: any[]): Policy[] => {

    const policies: Policy[] = data.map(item => {
        return {
            id: item["מס' פוליסה/חשבון"] as string,
            FundIds: findFundsIds(item["מסלולי השקעה"]) as number[],
            balance: { amount: item["צבירה"] as number },
        };
    });
    return policies;

}




export const parseExcelFile = async (file: ArrayBuffer, sheetName: string): Promise<Policy[]> => {
    const workbook = XLSX.read(file, { type: 'buffer' });
    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    const records = extractPolicyData(rawData)

    return records
}


