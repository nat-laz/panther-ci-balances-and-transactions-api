import { validateAndParseDate } from './dateValidator'
import { ValidationError } from './validationErrors';
import { DateFormat } from './dateValidator';

export function isValidStatus(status: string): void {
  const validStatuses = ["CANCELLED", "PROCESSED", "BOOKED"];
  if (!validStatuses.includes(status)) {
    throw new ValidationError(`Invalid transaction status: ${status}`);
  }
}

export function validateTransactionArray(transactions: any): void {
  if (!Array.isArray(transactions) || transactions.length === 0) {
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

    validateAndParseDate(transaction.date, DateFormat.DATE_FORMAT_ISO);
    isValidStatus(transaction.status);
  }
}


