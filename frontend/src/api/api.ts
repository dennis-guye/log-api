/* tslint:disable */
/* eslint-disable */
/**
 * logging-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Tail200Response
 */
export interface Tail200Response {
    /**
     * 
     * @type {string}
     * @memberof Tail200Response
     */
    'message': string;
    /**
     * 
     * @type {number}
     * @memberof Tail200Response
     */
    'code': number;
    /**
     * 
     * @type {Array<string>}
     * @memberof Tail200Response
     */
    'data': Array<string>;
}
/**
 * 
 * @export
 * @interface TailDefaultResponse
 */
export interface TailDefaultResponse {
    /**
     * 
     * @type {string}
     * @memberof TailDefaultResponse
     */
    'message': string;
    /**
     * 
     * @type {number}
     * @memberof TailDefaultResponse
     */
    'code': number;
    /**
     * 
     * @type {string}
     * @memberof TailDefaultResponse
     */
    'cause'?: string;
}

/**
 * DefaultApi - axios parameter creator
 * @export
 */
export const DefaultApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Retrieve recent log entries
         * @param {string} fileName The file to be logged in /var/log/
         * @param {string} term The term to be searched in the log file - this is not case sensitive
         * @param {number} numberOfEntries The number of entries to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tail: async (fileName: string, term: string, numberOfEntries: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'fileName' is not null or undefined
            assertParamExists('tail', 'fileName', fileName)
            // verify required parameter 'term' is not null or undefined
            assertParamExists('tail', 'term', term)
            // verify required parameter 'numberOfEntries' is not null or undefined
            assertParamExists('tail', 'numberOfEntries', numberOfEntries)
            const localVarPath = `/var/log/{file-name}`
                .replace(`{${"file-name"}}`, encodeURIComponent(String(fileName)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (term !== undefined) {
                localVarQueryParameter['term'] = term;
            }

            if (numberOfEntries !== undefined) {
                localVarQueryParameter['number-of-entries'] = numberOfEntries;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * DefaultApi - functional programming interface
 * @export
 */
export const DefaultApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = DefaultApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Retrieve recent log entries
         * @param {string} fileName The file to be logged in /var/log/
         * @param {string} term The term to be searched in the log file - this is not case sensitive
         * @param {number} numberOfEntries The number of entries to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async tail(fileName: string, term: string, numberOfEntries: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Tail200Response>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.tail(fileName, term, numberOfEntries, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * DefaultApi - factory interface
 * @export
 */
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         * 
         * @summary Retrieve recent log entries
         * @param {string} fileName The file to be logged in /var/log/
         * @param {string} term The term to be searched in the log file - this is not case sensitive
         * @param {number} numberOfEntries The number of entries to be returned
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        tail(fileName: string, term: string, numberOfEntries: number, options?: any): AxiosPromise<Tail200Response> {
            return localVarFp.tail(fileName, term, numberOfEntries, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * DefaultApi - object-oriented interface
 * @export
 * @class DefaultApi
 * @extends {BaseAPI}
 */
export class DefaultApi extends BaseAPI {
    /**
     * 
     * @summary Retrieve recent log entries
     * @param {string} fileName The file to be logged in /var/log/
     * @param {string} term The term to be searched in the log file - this is not case sensitive
     * @param {number} numberOfEntries The number of entries to be returned
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof DefaultApi
     */
    public tail(fileName: string, term: string, numberOfEntries: number, options?: AxiosRequestConfig) {
        return DefaultApiFp(this.configuration).tail(fileName, term, numberOfEntries, options).then((request) => request(this.axios, this.basePath));
    }
}



