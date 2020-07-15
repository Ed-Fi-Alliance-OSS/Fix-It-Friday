import { Environment } from '../Models/environment';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    public environment: Environment;

    constructor() {
        this.environment = new Environment();
    }
}
