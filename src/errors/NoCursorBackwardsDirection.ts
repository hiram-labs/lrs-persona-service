import BaseError from '@hiram-labs/lrs-js-common/dist/errors/BaseError';

// thrown if you try to paginate a undefined cursor backwards.
export default class extends BaseError {}
