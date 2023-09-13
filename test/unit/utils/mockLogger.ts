import { vi } from 'vitest';
import winston from "winston";
import logger from '../../../src/utils/logger';

export function mockLogger() {
    vi.mock('../../../src/utils/logger', () => {
        return {
            default: {
                info: vi.fn(),
                error: vi.fn(),
            }
        };
    });
}
