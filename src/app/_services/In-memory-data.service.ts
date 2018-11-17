import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const authenticationStatus = true;
    return {authenticationStatus};
  }
}
