import { QuestionsProps } from 'type';

export const RandomFiveQuestions = (data: QuestionsProps[]) => {
  const randomFiveQuestions = [];
  for (let i = 0; i < 5; i++) {
    // get a random index
    const randomIndex = Math.floor(Math.random() * data.length);
    randomFiveQuestions.push(data[randomIndex]);

    // remove the question from the data array
    data.splice(randomIndex, 1);
  }
  return randomFiveQuestions;
};
