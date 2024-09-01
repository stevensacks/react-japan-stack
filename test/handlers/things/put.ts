import {http} from 'msw';
import type {ServerThing} from 'test/mocks/things';
import things, {serverThingSchema} from 'test/mocks/things';
import date, {getLanguage} from 'test/utils';
import {THINGS_URL} from '~/services/api/things/urls';
import {tryCatch} from '~/utils/functions';

export default http.put(
  `${process.env.API_URL}${THINGS_URL}`,
  async ({request}) => {
    const [thing, error] = await tryCatch(async () => {
      const data = await request.json();

      return serverThingSchema.parse(data);
    });

    if (error) {
      return new Response(JSON.stringify({error}), {status: 400});
    }

    const existingThing = things[getLanguage(request)].find(
      ({id}) => id === thing.id
    );

    if (!existingThing) {
      return new Response(
        JSON.stringify({
          error: `Thing with id "${thing.id}" not found`,
        }),
        {status: 404}
      );
    }

    const data: ServerThing = {
      ...thing,
      updated_at: date({minutes: 30}).toISOString(),
    };

    return new Response(JSON.stringify({data}), {status: 200});
  }
);
