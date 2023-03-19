# data-sync-engine

This repo contains a service that upon request synchronizes Hubspot Contacts and Stripe Customers to PostgreSQL database for all user account stored in that database. For convenience, the database is initialized with a couple of dummy Hubspot and Stripe accounts that have some contacts and customers in them.

The service also exposes and API to browse user accounts and search through their data like Hubspot Contacts and Stripe Customers.

## How to run

1. Download the repo.
2. `cd` to the root directory.
3. Run `docker compose  up -d --build` to build the app Docker image and spin up the postgres and app services.
4. Run `npx prisma migrate deploy` to roll out the db schema.
5. Run `npx prisma db seed` to seed the database with initial data like user accounts and access tokens.
6. The engine service is ready!

## How to trigger sync

Send a post request to this URL: `http://localhost:8080/engine/sync`. It should return `{"ok":true}` JSON response. It means it successfully synchronized all data available in Hubspot and Stripe for all user accounts stored in the database.

CURL example: `curl -X POST http://localhost:8080/engine/sync`

## Tech stack

The app uses Node.js, TypeScript, Express, Prisma, and Zod. It's built adhering to the Clean Architecture pattern.

Since this project is a prototype, it's not production ready and there are a bunch of "Improvement" comments scattered across the codebase. It would make sense to implement them in a more mature setup.
