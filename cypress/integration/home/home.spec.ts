describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should load the page", () => {
    cy.findByText("Hello anonymous!").should("be.visible");
  });
});
