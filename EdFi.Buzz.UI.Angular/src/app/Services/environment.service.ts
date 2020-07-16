import { Environment } from '../Models/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    public environment: Environment;
    // We access the environment variables that were fetched before the app started
    constructor() {
        this.environment = <Environment>window['tempConfigStorage'];
        window['tempConfigStorage'] = null;
    }
}
