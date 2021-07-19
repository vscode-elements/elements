import faker from 'faker';

let html = '';

for(let i = 0; i < 500; i++) {
  const id = faker.datatype.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const company = faker.company.companyName();

  html += `
    <vscode-table-row>
      <vscode-table-cell><div>${id}</div></vscode-table-cell>
      <vscode-table-cell><div>${firstName}</div></vscode-table-cell>
      <vscode-table-cell><div>${lastName}</div></vscode-table-cell>
      <vscode-table-cell><div>${email}</div></vscode-table-cell>
      <vscode-table-cell><div>${company}</div></vscode-table-cell>
    </vscode-table-row>
  `;
}

console.log(html);

