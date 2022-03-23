import { mockApiMethod } from "../commands/mock-api-method";

// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/cypress/add-commands";

Cypress.Commands.add("mockApiMethod", mockApiMethod);
