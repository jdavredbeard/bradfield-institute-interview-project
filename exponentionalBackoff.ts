export class ExponentialBackoff {
    async expbf(operation: Function, period: number, maxTries: number, jitter: number) {
        for (let i = 0; i < maxTries; i++) {
            console.log(`Attempting operation, trial ${i}...`);
            let response = operation();
            if (response) {
                console.log('Operation successful!');
                break;
            }
            else {
                let sleepTime = period * Math.pow(2, i) - (jitter / 2) + (Math.random() * jitter);
                console.log(`Sleeping for ${sleepTime}ms...`);
                await this.sleep(sleepTime);
            }
        }
    }

    async sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }

    flakyNetworkOperation() {
        let networkGhosts = Math.random();
        return networkGhosts < 0.1;
    }

}