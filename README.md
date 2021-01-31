## Running the development server

First, run the development server:

Install dependencies:

```bash
yarn
```

Start dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GraphQL

GraphQL endpoint runs on `http://localhost:3000/api/graphql`.

To access GraphQL Playground for testing you can open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

## GraphQL TypeScript Codegen

We use [GraphQL Code Generator](https://www.google.com) to generate our types and apollo client hooks based on our schema. Generation runs in watch mode when running `yarn run dev`, so if you make a change to your graphql files, code generation will run.

The schema generated types will be generated in `graphql/types.ts`
The hooks and necessary typings for apollo client will be generated within the same location as your `.graphql` file with the `.generated.tsx` extension.

The following scripts are also available for use:

Generate the typings based on current schema:

```
yarn generate
```

Run generation in watch mode for real time changes (useful when actively making changes to the schema):

```
yarn generate:watch
```

## Use path aliases for importing modules

Paths aliases are setup in the `tsconfig.json` as follows:

```
"@/components/*": ["components/*"],
"@/layouts/*": ["layouts/*"],
"@/apollo/*": ["apollo/*"],
```

For use inside of components

```
import MyComponent from '@/components/MyComponent'
```
