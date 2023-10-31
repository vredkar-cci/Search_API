import { createContainer } from "../displayUI";

function displayStackOverflowResults(results, source) {
  const column = createContainer(source);
  if (results.length === 0) {
    column.classList.add("has-error");
    const cardBody = column.querySelector('.card-body');
    const textNode = document.createTextNode('No results found.');
    cardBody.appendChild(textNode);
    return;
  }

  results.forEach(result => {
    const card = document.createElement('div');
    card.className = 'result-card';

    let questionID = result.question_id,
      question = result.title.replace(/[^a-zA-Z0-9\-_ ]/g, '').replace(/\s/g, '-'),
      questionURL = `https://stackoverflow.com/questions/${questionID}/${question}?r=SearchResults`,
      questionScore = result.question_score ? result.question_score + ' votes' : '0 votes',
      answerCount = result.answer_count ? result.answer_count + ' Answers' : 'No Answer';

    // Create the first <div class="info">
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('info');

    const smallParagraph = document.createElement('p');
    const smallText = document.createElement('small');
    smallText.textContent = questionScore;
    smallParagraph.appendChild(smallText);

    const answerCountParagraph = document.createElement('p');
    answerCountParagraph.classList.add('ans-count');
    answerCountParagraph.textContent = answerCount;

    infoDiv.appendChild(smallParagraph);
    infoDiv.appendChild(answerCountParagraph);

    // Create the second <div> for the title and excerpt
    const mainContentDiv = document.createElement('div');

    const titleHeading = document.createElement('h3');
    const titleLink = document.createElement('a');
    titleLink.href = questionURL;
    titleLink.target = '_blank';
    titleLink.textContent = result.title;
    titleHeading.appendChild(titleLink);

    const excerptParagraph = document.createElement('p');
    excerptParagraph.textContent = result.excerpt;

    mainContentDiv.appendChild(titleHeading);
    mainContentDiv.appendChild(excerptParagraph);

    card.appendChild(infoDiv);
    card.appendChild(mainContentDiv);

    column.appendChild(card);
  });
}

export { displayStackOverflowResults }

