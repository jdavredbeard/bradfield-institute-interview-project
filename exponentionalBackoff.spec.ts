import { ExponentialBackoff } from './exponentionalBackoff';

describe('ExponentialBackoff', () => {
    let eb = new ExponentialBackoff();

    it('runs', async () => {
        await eb.expbf(eb.flakyNetworkOperation, 2000, 3, 1000)    
    })
})