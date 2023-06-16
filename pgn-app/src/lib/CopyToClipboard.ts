export function copyToClipboard(text: string) {
  // Create a temporary textarea element
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Set the textarea to be out of the viewport
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";

  // Append the textarea to the document
  document.body.appendChild(textarea);

  // Select and copy the text from the textarea
  textarea.select();
  document.execCommand("copy");

  // Remove the textarea from the document
  document.body.removeChild(textarea);
}
