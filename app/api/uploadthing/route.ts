import { createNextRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';
import { UTApi } from 'uploadthing/server';

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: Request) {
  const data = await request.json();
  const urls = Array.isArray(data.url) ? data.url : [data.url];

  const utapi = new UTApi();

  for (const url of urls) {
    const newUrl = url.substring(url.lastIndexOf('/') + 1);
    await utapi.deleteFiles(newUrl);
  }

  return Response.json({ message: 'ok' });
}