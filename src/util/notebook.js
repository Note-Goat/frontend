export function getNoteName(json) {
  try {
    const data = JSON.parse(json);
    const firstLine = data.blocks[0].text;
    return firstLine === "" ? "(no name)" : firstLine;
  } catch (e) {
    console.log(e);
    return "error";
  }
}
