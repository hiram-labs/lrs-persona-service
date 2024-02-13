import NoModel from '@hiram-labs/lrs-js-common/dist/errors/NoModel';

export default class extends NoModel {
  /* istanbul ignore next */
  constructor(
    modelName: string,
    public id: string
  ) {
    super(modelName);
  }
}
