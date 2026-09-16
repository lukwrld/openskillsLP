import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Always let a fresh page load start at the top instead of restoring the
    // scroll position from a previous visit to the published URL.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
