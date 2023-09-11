import { formatDate } from "./dateUtils";
import {validateAndParseDate} from './dateValidator'
import { isValidStatus } from "./transactionStatus";

export function validateTransactionArray(transactions: any): void {
    if (!Array.isArray(transactions)) {
      throw new Error("Input must be an array of transactions");
    }
  
    for (const transaction of transactions) {
      if (
        !transaction ||
        typeof transaction.amount !== 'number' ||
        !transaction.date ||
        !transaction.status
      ) {
        throw new Error("Invalid transaction object in the array");
      }
  
      validateAndParseDate(transaction.date, 'ISO');
      isValidStatus(transaction.status);
    }
  }