import faker from 'faker';
import randomcolor from 'randomcolor';
import Color from 'color';

const items = 50;
let html = '';

for(let i = 0; i < items; i++) {
  const bgcolor = randomcolor();
  const color = Color(bgcolor);
  const fgcolor = color.isLight(bgcolor) ? '#000' : '#fff';
  const id = faker.datatype.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const company = faker.company.companyName();
  const text = faker.lorem.paragraph();
  const profilePic = `<div style="align-items:center;background-color:${bgcolor};color:${fgcolor};display:flex;justify-content:center;height:32px;width:32px;">${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}</div>`;

  /*
  const card = faker.helpers.createCard();

  const fields = Object.keys(card.address);

  let address = '<address>';

  fields.forEach((field, index) => {
    let val = card.address[field];

    if (field === 'geo') {
      val = ` ${val.lat}, ${val.lng}`;
    }

    address += `${field}: ${val}`;

    if (index < fields.length) {
      address += '<br>';
    }
  });

  address += '</address>';
  */

  html += `
    <vscode-table-row>
      <vscode-table-cell>${profilePic}</vscode-table-cell>
      <vscode-table-cell>${firstName}</vscode-table-cell>
      <vscode-table-cell>${lastName}</vscode-table-cell>
      <vscode-table-cell>${email}</vscode-table-cell>
      <vscode-table-cell>${text}</vscode-table-cell>
    </vscode-table-row>`;
}

console.log(html);

