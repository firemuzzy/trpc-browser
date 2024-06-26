import { initTRPC } from '@trpc/server';
import { z } from 'zod';

import { createChromeHandler } from '../../../adapter';

const t = initTRPC.create({
  isServer: false,
  allowOutsideOfServer: true,
});

const appRouter = t.router({
  openNewTab: t.procedure.input(z.object({ url: z.string().url() })).mutation(async ({ input }) => {
    await chrome.tabs.create({ url: input.url, active: true });
  }),
});

export type AppRouter = typeof appRouter;

createChromeHandler({ router: appRouter });
