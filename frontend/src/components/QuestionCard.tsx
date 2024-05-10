import {Question} from "../model/Question.ts";

type Props = {
    question: Question,
}

export default function QuestionCard(props: Props) {
    return (
        <div className={"questionCard"}>
            {props.question.question}
        </div>
    )
}
