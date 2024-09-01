import {api} from '~/services/api';
import type {Thing} from './types';
import {thingSchema} from './types';
import {THINGS_URL} from './urls';

export const getThings = async (request: Request): Promise<Thing[]> => {
  const data = await api(THINGS_URL, {request});

  return data.map(thingSchema.parse);
};

export const getThingById = async (
  id: string,
  request: Request
): Promise<Thing> => {
  const data = await api(`${THINGS_URL}/${id}`, {request});

  return thingSchema.parse(data);
};

export const insertThing = async (
  thing: Thing,
  request: Request
): Promise<Thing[]> => {
  const data = await api(THINGS_URL, {data: thing, method: 'POST', request});

  return data.map(thingSchema.parse);
};

export const updateThing = async (
  thing: Thing,
  request: Request
): Promise<Thing> => {
  const data = await api(THINGS_URL, {data: thing, method: 'PUT', request});

  return thingSchema.parse(data);
};

export const deleteThing = async (
  id: string,
  request: Request
): Promise<Thing[]> => {
  const data = await api(THINGS_URL, {method: 'DELETE', params: {id}, request});

  return data.map(thingSchema.parse);
};
