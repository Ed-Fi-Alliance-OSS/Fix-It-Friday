// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import { CanActivate, ExecutionContext, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import fetch from 'node-fetch';
import * as jwkToPem from 'jwk-to-pem';
import * as jwt from 'jsonwebtoken';

import { config } from 'dotenv';

config();

@Injectable()
export class AuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context).getContext();
        if (!ctx.headers.authorization) {
            return false;
        }

        ctx.user = await this.validateToken(ctx.headers.authorization);
        return true;
    }

    async getJsonData(url) {
        let jsonReturn;
        try {
            await fetch(url)
                .then((res) => res.json())
                .then((result) => (jsonReturn = result));
            return jsonReturn;
        } catch (error) {
          console.error(error);
          throw error;
        }
    }

    async createPem(token) {
        const googleDiscoDoc = await this.getJsonData(process.env.GOOGLE_DISCOVERY);
        const jwks = await this.getJsonData(googleDiscoDoc.jwks_uri);
        const decodedToken = jwt.decode(token, { complete: true, json: true });
        const keyId = decodedToken.header.kid;
        const jwk = jwks.keys.filter((k) => k.kid === keyId)[0];
        return await jwkToPem({ n: jwk.n, kty: jwk.kty, e: jwk.e });
    }

    async validateToken(auth: String) {
        if (auth.split(' ')[0] !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        const token = auth.split(' ')[1];
        try {
            let pem = await this.createPem(token);
            return await jwt.verify(token, pem);
        } catch (err) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
    }
}
