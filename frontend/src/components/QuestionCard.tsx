import {Question} from "../model/Question.ts";

type Props = {
    question: Question,
}

export default function QuestionCard(props: Props) {
    return (
        <div className={"questionCard"}>
            {props.question.question}
            {props.question.correctAnswer}
            {props.question.wrongAnswer1}
            {props.question.wrongAnswer2}
            {props.question.wrongAnswer3}
        </div>
    )
}
