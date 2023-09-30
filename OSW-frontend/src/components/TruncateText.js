import React from "react";

class TruncateText extends React.Component {
  render() {
    const { text, maxChars } = this.props;

    // Check if the 'text' prop is defined and not null
    if (text === undefined || text === null) {
      return null; // or provide a default value or an empty string
    }

    // Ensure 'text' is a string before slicing
    if (typeof text !== "string") {
      return null; // or handle non-string cases accordingly
    }

    const truncatedText = text.slice(0, maxChars);

    return (
      <div>
        <p>
          {truncatedText}
          {text.length > maxChars && "..."}
        </p>
      </div>
    );
  }
}

export default TruncateText;
