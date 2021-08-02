const categories = ['address', 'zip', 'city', 'state', 'category'];
const file1 = 'realdata.csv';
const fileAttachmentOptions = { subjectType: 'drag-n-drop' };
const errors = [
  'headers have duplicates',
  'file schould contain no more than 20 rows',
  `every row schould have  5 columns maximum`,
];

const rowOfFile = ['53-609', 'Fabryczna 31', 'Wroclaw', 'Dolnyslask', 'school'];

describe('check home page csv file handling ', () => {
  it('upload file and move toward map trigger', () => {
    expect(true).to.equal(true);
    cy.visit('http://localhost:3000/');
    cy.contains('Upload CSV file').attachFile(file1, fileAttachmentOptions);

    for (let index = 0; index < rowOfFile.length; index++) {
      const textContent = rowOfFile[index];

      cy.get('div.items-center').contains(textContent);
    }
  });
  it('change headers', () => {
    for (let index = 0; index < categories.length; index++) {
      const header = categories[index];
      cy.get('div.category-header')
        .contains(`Column ${index + 1}`)
        .click();
      cy.contains(header).click();
    }
  });
  it('be sure there are no error and there is map', () => {
    cy.get('div[aria-roledescription="map"]');

    //FIXME: i dont know lines below dosent work right
    // for (let index = 0; index < errors.length; index++) {
    //   const error = errors[index];
    //   cy.contains(error, { matchCase: false });
    // }
  });
  it('duplicate header error triggering', () => {
    cy.get('div.category-header').contains(categories[2]).click();
    cy.contains(categories[3]).click();

    cy.contains(errors[0]);
    cy.get('div[aria-roledescription="map"]').should('not.exist');

    // cy.get().not();
  });
});

describe;
