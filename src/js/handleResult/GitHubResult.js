import { createContainer } from "../displayUI";

function displayGitHubResults(results, source) {
  const column = createContainer(source);
  const cardBody = column.querySelector('.card-body');
  if (results.length === 0) {
    column.classList.add("has-error");
    const textNode = document.createTextNode('No results found.');
    cardBody.appendChild(textNode);
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    let language = result.language ? 'Language: ' + result.language : '';

    // Create a new <div> element
    const cardContent = document.createElement('div');

    // Create the <p> element for the link
    const linkParagraph = document.createElement('p');
    const link = document.createElement('a');
    link.href = result.html_url;
    link.target = '_blank';
    link.textContent = result.full_name;
    linkParagraph.appendChild(link);

    // Create the <p> element for the description
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = result.description;

    // Create the <p> element for the language
    const languageParagraph = document.createElement('p');
    const small = document.createElement('small');
    small.textContent = language;
    languageParagraph.appendChild(small);

    // Append the created elements to the cardContent
    cardContent.appendChild(linkParagraph);
    cardContent.appendChild(descriptionParagraph);
    cardContent.appendChild(languageParagraph);

    // Append the cardContent to the 'card' element
    card.appendChild(cardContent);

    cardBody.appendChild(card);
  });
}

export { displayGitHubResults }

