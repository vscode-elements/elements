const htmlspecialchars = require('./htmlspecialchars');
const page = require('./page.11ty.cjs');

/**
 * This template extends the page template and adds an examples list.
 */
module.exports = function (data) {
  const pageBound = page.bind(this);

  return pageBound({
    ...data,
    content: renderExample(data, this.url),
  });
};

const renderExample = ({name, content, collections, page}, prefixUrl) => {
  const urlParts = page.url.split('/');
  const baseUrl = `/${urlParts[1]}/${urlParts[2]}/`;

  const filteredExamples =
    collections.example && collections.example.length > 0
      ? collections.example.filter(
          (val) =>
            val.template.filePathStem.length !== 0 &&
            val.template.filePathStem.indexOf(baseUrl) === 0
        )
      : [];

  return `
    <h1>&lt;${urlParts[2]}&gt;</h1>
    <section class="examples">
      <nav class="collection">
        <ul>
          ${
            filteredExamples.length === 0
              ? ''
              : filteredExamples
                  .map(
                    (post) => `
                  <li class="${post.url === page.url ? 'selected' : ''}">
                    <a href="${prefixUrl(post.url)}">${htmlspecialchars(
                      post.data.description
                    )}</a>
                  </li>
                `
                  )
                  .join('')
          }
        </ul>
      </nav>
      <div>
        <h2>Example: ${name}</h2>
        ${content}
      </div>
    </section>
  `;
};
