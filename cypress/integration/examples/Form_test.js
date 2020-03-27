/* eslint-disable no-undef */
describe("test our form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });
  it("add text to input to name", () => {
    cy.get("textarea")
      .type("Add extra cheese")
      .should("have.value", "Add extra cheese");
    cy.get("button").click();
  });
});
