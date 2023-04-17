import { Request } from 'express';

export type RequestPayload<
	BodyRecord extends Record<string, any>,
	PathParams extends Record<string, any> = Record<string, any>
> = Request<PathParams, any, BodyRecord>;
