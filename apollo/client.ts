import { useMemo } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';
import { appConfig } from '@/config/appConfig';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
let apolloClient: ApolloClient<NormalizedCacheObject>;

const getUri = () =>
  appConfig.vercelSystemEnvironment
    ? `https://${appConfig.vercelSystemEnvironment}/api/graphql`
    : `http://localhost:3000/api/graphql`;

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  });
};

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

/**
 * For use when returning props from getStaticProps or getServerSideProps
 *
 * return addApolloState(apolloClient, {
 *   props: {},
 *   revalidate: 1,
 * })
 */
export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any,
) => {
  if (pageProps?.props) {
    pageProps[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
};

export const useApollo = (pageProps: any) => {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
};
