import BaseError from '@hiram-labs/lrs-js-common/dist/errors/BaseError';
import type Identifier from '../models/Identifier';

export class ExpiredLock extends BaseError {
  constructor(
    public identifier: Identifier,
    public ignorePersonaId: boolean
  ) {
    super();
  }
}
