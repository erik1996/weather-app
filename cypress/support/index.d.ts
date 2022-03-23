/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  interface Chainable<Subject = any> {
    mockApiMethod: import("../commands/mock-api-method").MockApiMethod;
  }
}
