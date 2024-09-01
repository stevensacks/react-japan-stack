import {http} from 'msw';
import things from 'test/mocks/things';
import {getLanguage} from 'test/utils';
import {THINGS_URL} from '~/services/api/things/urls';

export default http.delete(
  `${process.env.API_URL}${THINGS_URL}/:id`,
  ({params, request}) => {
    if (!params.id) {
      return new Response(
        JSON.stringify({
          error: 'Thing ID is required',
        }),
        {status: 400}
      );
    }

    const thing = things[getLanguage(request)].find(({id}) => id === params.id);

    if (!thing) {
      return new Response(
        JSON.stringify({
          error: `Thing with id "${params.id}" not found`,
        }),
        {status: 404}
      );
    }

    return new Response(
      JSON.stringify({
        data: things[getLanguage(request)].filter(({id}) => id !== params.id),
      }),
      {status: 200}
    );
  }
);
