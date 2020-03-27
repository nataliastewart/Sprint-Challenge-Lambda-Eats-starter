/* eslint-disable no-undef */
describe("test our form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza");
  });
  it("add text to input to name", () => {
    cy.get('input[name="name"]')
      .type("Natalia")
      .should("have.value", "Natalia");
    cy.get("#size")
      .select("medium")
      .should("have.value", "medium");
    cy.get("textarea")
      .type("Add extra cheese")
      .should("have.value", "Add extra cheese");
    cy.get('[type="checkbox"]')
      .check()
      .should("be.checked");
    cy.get("button").click();
  });
});
