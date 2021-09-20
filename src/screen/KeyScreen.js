import Container from "../component/Container";
import {useContext, useState} from "react";
import {getKey, setKey as setCryptographicKey} from "../util/crypto";
import TextInput from "../component/TextInput";
import Button from "../component/Button";
import Context from "../Context";
import useAuthHook from "../hook/useAuthHook";

export default function KeyScreen() {
  const [key, setKey] = useState(getKey());
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const { appLoaded, loggedIn } = useContext(Context);

  useAuthHook(appLoaded, loggedIn);

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
