import {validateAndParseDate} from './dateValidator'
import { ValidationError } from './errorValidator';
import { isValidStatus } from "./transactionStatus";

export function validateTransactionArray(transactions: any): void {
    if (!Array.isArray(transactions)) {
      throw new ValidationError("Input must be an array of transactions");
    }
  
    for (const transaction of transactions) {
      if (
        !transaction ||
        typeof transaction.amount !== 'number' ||
        !transaction.date ||
        !transaction.status
      ) {
        throw new ValidationError("Invalid transaction object in the array");
      }
  
      validateAndParseDate(transaction.date, 'ISO');
      isValidStatus(transaction.status);
    }
  }