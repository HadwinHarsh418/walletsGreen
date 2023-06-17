import { PayeeModule } from './payee.module';

describe('PayeeModule', () => {
  let payeeModule: PayeeModule;

  beforeEach(() => {
    payeeModule = new PayeeModule();
  });

  it('should create an instance', () => {
    expect(payeeModule).toBeTruthy();
  });
});
