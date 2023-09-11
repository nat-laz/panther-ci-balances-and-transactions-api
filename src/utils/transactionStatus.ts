export function isValidStatus(status: string): void {
    const validStatuses = ["CANCELLED", "PROCESSED", "BOOKED"];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid transaction status: ${status}`);
    }
  }