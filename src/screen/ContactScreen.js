import Container from "../component/Container";
import TextInput from "../component/TextInput";
import {useState} from "react";
import Button from "../component/Button";
import {xhrPost} from "../util/xhr";

export default function ContactScreen() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [successful, setSuccessful] = useState(null);

  const onClickSubmit = async () => {
    const response = await xhrPost("contact", {
      email,
      message,
    });
    setSuccessful(response.status === 200);
  };

  return (
    <Container title="Contact">
      { successful && <p>Your feedback has been submitted, thank you!</p>}
      <p>Leave us a comment!</p>
      <TextInput
        label="Email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        readOnly={successful}
      />
      <TextInput
        label="Question, concern, or comment"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        multiline={true}
        readOnly={successful}
      />
      <Button
        title="Submit Comment"
        onClick={onClickSubmit}
        color="primary"
      />
    </Container>
  );
}
