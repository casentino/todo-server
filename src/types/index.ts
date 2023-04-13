import { Request } from 'express';

export type RequestPayload<BodyRecord extends Record<string, any>> = Request<any, any, BodyRecord>;
