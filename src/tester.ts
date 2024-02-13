import sourceMapSupport from 'source-map-support';

import serviceFactory from './serviceFactory';

sourceMapSupport.install();
const serviceFacade = serviceFactory();
export default serviceFacade;
