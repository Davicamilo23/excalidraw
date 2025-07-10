import { newTextElement } from "packages/element/src/newElement";

export const handlePaste = async () => {
  const text = (await navigator.clipboard.readText()).trim();
  if (text.length > 0) {
    addTextElementToCanvas(text);
  }
};

function addTextElementToCanvas(text: string) {
  const textElement = newTextElement({
    x: 100,
    y: 100,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    fillStyle: "hachure",
    strokeWidth: 1,
    roughness: 1,
    opacity: 100,
    fontSize: 20,
    fontFamily: 1,
    text,
    textAlign: "left",
    verticalAlign: "top",
    containerId: null,
  });

}
