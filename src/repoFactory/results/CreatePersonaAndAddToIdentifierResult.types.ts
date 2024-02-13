import type Identifier from '../../models/Identifier';
export interface CreatePersonaAndAddToIdentifierResult {
  readonly identifierId: string;
  readonly identifier: Identifier;
  readonly wasCreated: boolean;
  readonly personaId: string;
}
