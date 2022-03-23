import { stringifyUrl } from "query-string";

import { ApiMethodDeclaration } from "../../src/api/types";
import { DeepReplaceStringLiteralsWithString } from "../types/shared";

type ErrorType = {
  code: number;
  message: string;
};

const DEFAULT_API_BASE_URL = Cypress.env("BASE_API_URL");

export function mockApiMethod<P extends Record<string, unknown>, R>(
  apiMethodDeclaration: ApiMethodDeclaration<P, R>,
  mockData: {
    params?: P;
    response: DeepReplaceStringLiteralsWithString<R> | ErrorType;
    status?: number;
    delay?: number;
  },
  baseUrl = DEFAULT_API_BASE_URL
) {
  const { params, response, status = 200, delay = 0 } = mockData;
  const requestConfig = apiMethodDeclaration(params);
  let path = `${baseUrl}${requestConfig.url}`;

  if (typeof requestConfig.params !== "undefined") {
    path = stringifyUrl(
      { url: path, query: requestConfig.params },
      {
        sort: false,
        arrayFormat: "none",
      }
    );
  } else {
    path += path.endsWith("/") ? "" : "*";
  }

  return cy.intercept(
    {
      path,
      method: requestConfig.method,
    },
    (req) => {
      req.reply({
        delay,
        status,
        body: JSON.stringify(response),
      });
    }
  );
}

export type MockApiMethod = typeof mockApiMethod;
