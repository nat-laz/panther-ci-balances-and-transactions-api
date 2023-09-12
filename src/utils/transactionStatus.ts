import { ValidationError } from "./errorValidator";

export function isValidStatus(status: string): void {
    const validStatuses = ["CANCELLED", "PROCESSED", "BOOKED"];
    if (!validStatuses.includes(status)) {
      throw new ValidationError(`Invalid transaction status: ${status}`);
    }
  }