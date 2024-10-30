describe('Second Challenge', () => {

  it("checks berry with ID", () => {
    cy.pokeApiGetRequest("/api/v2/berry/1/").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq('cheri');
    });
    cy.invalidPokeApiGetRequest('/api/v2/berry/0/').then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("checks berry with name", () => {
    cy.pokeApiGetRequest("/api/v2/berry/cheri/").then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(1);
    });
    cy.invalidPokeApiGetRequest('/api/v2/berry/charizard/').then((response) => {
      expect(response.status).to.eq(404);
    });
  });

  it("finds the spicy berry with the highest potency", () => {
    cy.pokeApiGetRequest("/api/v2/berry-flavor/spicy/").then((response) => {
      expect(response.status).to.eq(200);
      
      const spicyBerries = response.body.berries;
      const highestPotencyBerry = spicyBerries.reduce((max, obj) => 
        obj.potency > max.potency ? obj : max
      );
      const nameOfTheHighestPotencyBerry = highestPotencyBerry.berry.name

      cy.pokeApiGetRequest(`/api/v2/berry/${nameOfTheHighestPotencyBerry}/`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq('enigma');
        expect(response.body.flavors[0].potency).to.eq(40);
        expect(response.body.flavors[0].flavor.name).to.eq('spicy');
      });
    });
  });
})