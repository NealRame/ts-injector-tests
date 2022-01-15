/* eslint-disable @typescript-eslint/no-explicit-any */

import "reflect-metadata"

import {
    ServiceMetadataKey,
} from "./constants"

import {
    ServiceIdentifier,
    ServiceLifecycle,
    ServiceMetadata,
} from "./types"

import {
    getServiceDefaultParameterMap,
    getServiceInjectionParameterMap,
} from "./utils"

export function Service(metadata?: Partial<ServiceMetadata>)
    : ClassDecorator {
    return Reflect.metadata(
        ServiceMetadataKey,
        Object.assign({
            lifecycle: ServiceLifecycle.Transient
        }, metadata)
    )
}

export function Inject(service: ServiceIdentifier)
    : ParameterDecorator {
    return (target: any, _: any, parameterIndex: number) => {
        const paramsMap = getServiceInjectionParameterMap(target)
        paramsMap.set(parameterIndex, service)
    }
}

export function Default(value: boolean | number | string | symbol)
    : ParameterDecorator {
    return (target: any, _: any, parameterIndex: number) => {
        const paramsMap = getServiceDefaultParameterMap(target)
        paramsMap.set(parameterIndex, value)
    }
}
