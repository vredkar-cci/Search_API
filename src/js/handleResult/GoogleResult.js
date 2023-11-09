import { createContainer } from "../displayUI";

function displayGoogleResults(results, source) {
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

    // Create a new <div> element
    const cardContent = document.createElement('div');

    // Create an <h3> element for the title
    const titleHeading = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = result.htmlFormattedUrl;
    titleLink.target = '_blank';
    titleLink.textContent = result.htmlTitle;
    titleHeading.appendChild(titleLink);

    // Create a <p> element for the snippet
    const snippetParagraph = document.createElement('p');
    snippetParagraph.textContent = result.htmlSnippet;

    // Create another <a> element
    const link = document.createElement('a');
    link.href = result.htmlFormattedUrl;
    link.target = '_blank';
    link.textContent = result.displayLink;

    // Append the created elements to the cardContent
    cardContent.appendChild(titleHeading);
    cardContent.appendChild(snippetParagraph);
    cardContent.appendChild(link);

    // Append the cardContent to the 'card' element
    card.appendChild(cardContent);

    cardBody.appendChild(card);
  });
}

export { displayGoogleResults }

