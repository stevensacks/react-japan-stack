import {http} from 'msw';
import type {ServerThing} from 'test/mocks/things';
import things, {serverThingSchema} from 'test/mocks/things';
import date, {getLanguage} from 'test/utils';
import {THINGS_URL} from '~/services/api/things/urls';
import {tryCatch} from '~/utils/functions';

export default http.post(
  `${process.env.API_URL}${THINGS_URL}`,
  async ({request}) => {
    const [thing, error] = await tryCatch(async () => {
      const data = await request.json();

      return serverThingSchema.omit({id: true}).parse(data);
    });

    if (error) {
      return new Response(JSON.stringify({error}), {status: 400});
    }

    const allThings = things[getLanguage(request)];

    const data: ServerThing[] = [
      ...allThings,
      {
        ...thing,
        created_at: date({minutes: 15}).toISOString(),
        updated_at: null,
      } as ServerThing,
    ];

    return new Response(JSON.stringify({data}), {status: 201});
  }
);
