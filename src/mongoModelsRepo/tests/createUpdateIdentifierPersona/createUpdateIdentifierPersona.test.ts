import assertError from '@hiram-labs/lrs-js-common/dist/tests/utils/assertError';
import {
  type Db,
  type Filter,
  type FindOneAndUpdateOptions,
  type ModifyResult,
  MongoClient,
  type UpdateFilter
} from 'mongodb';

import config from '../../../config';
import Locked from '../../../errors/Locked';
import repoFactory from '../../../repoFactory';
import type ServiceConfig from '../../../service/Config';
import { TEST_IFI, TEST_ORGANISATION } from '../../../tests/utils/values';
import createUpdateIdentifierPersona from '../../createUpdateIdentifierPersona';

describe('createUpdateIdentifierPersona mongo', () => {
  // Only test mongo repo
  /* istanbul ignore next */
  if (config.repoFactory.modelsRepoName !== 'mongo') {
    return;
  }

  let serviceConfig: ServiceConfig;
  beforeEach(async () => {
    const repoFacade = repoFactory();
    serviceConfig = { repo: repoFacade };
    await serviceConfig.repo.clearRepo();
  });

  const generateMockDb = async () => {
    const db = (await MongoClient.connect(config.mongoModelsRepo.url, config.mongoModelsRepo.options)).db();

    return {
      ...db,
      collection: (name: string) => {
        /* istanbul ignore next */
        if (name !== 'personaIdentifiers') {
          return db.collection(name);
        }
        const collection2 = db.collection(name);

        return Object.setPrototypeOf(
          {
            ...collection2,
            findOneAndUpdate: async (
              filter: Filter<any>,
              update: UpdateFilter<any>,
              options: FindOneAndUpdateOptions
            ): Promise<ModifyResult> => {
              const result = await collection2.findOneAndUpdate(filter, update, options);

              return {
                value: null,
                ok: 0,
                ...result,
                lastErrorObject: {
                  upserted: undefined
                }
              };
            }
          },
          Object.getPrototypeOf(collection2)
        );
      }
    } as Db;
  };

  it('Should throw locked if was not created', async () => {
    const resultPromise = createUpdateIdentifierPersona({ db: generateMockDb() })({
      ifi: TEST_IFI,
      organisation: TEST_ORGANISATION,
      personaName: 'Dave 6'
    });

    await assertError(Locked, resultPromise);
  });
});