import Container from "../component/Container";
import {useState} from "react";
import {getKey, setKey as setCryptographicKey} from "../util/crypto";
import TextInput from "../component/TextInput";
import Button from "../component/Button";
import {useAuth} from "../hook/auth";

export default function KeyScreen() {
  const [key, setKey] = useState(getKey());
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  useAuth();

  const onClickCopy = async () => {
    await navigator.clipboard.writeText(key);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  const onClickModify = () => {
    if (!isReadOnly) {
      setKey(getKey());
    }
    setIsReadOnly(!isReadOnly);
  };

  const onClickSubmit = () => {
    setCryptographicKey(key);
    setIsReadOnly(true);
  };

  return (
    <Container title="Cryptographic Key">
      <TextInput
        label="Key"
        value={key}
        onChange={(event) => setKey(event.target.value)}
        readOnly={isReadOnly}
      />
      { isReadOnly ? (
        <div>
          <Button
            title={"Copy Key"}
            color="primary"
            onClick={onClickCopy}
          />
          <Button
            title={"Modify Key"}
            color="secondary"
            onClick={onClickModify}
          />
        </div>
      ) : (
        <div>
          <Button
            title={"Submit"}
            color="primary"
            onClick={onClickSubmit}
          />
          <Button
            title={"Cancel"}
            color="secondary"
            onClick={onClickModify}
          />
        </div>
      )}
      { isReadOnly ? null : <p className="warning">
        Warning: modifying this value will have side effects. Only modify
        your cryptographic key if you know what you are doing.
      </p> }
      { isCopied ? <p>Copied!</p> : null }
    </Container>
  );
}
