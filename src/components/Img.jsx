import React from "react"; // Importing React
import { LazyLoadImage } from "react-lazy-load-image-component"; // Importing LazyLoadImage component from react-lazy-load-image-component library
import "react-lazy-load-image-component/src/effects/blur.css"; // Importing CSS for blur effect

// Img component definition
const Img = ({ src, className, ...rest }) => {
    return (
        // Using LazyLoadImage component to lazily load images with a blur effect
        <LazyLoadImage
            className={className || ""} // Setting optional class name
            alt="no image" // Alt text for accessibility
            effect="blur" // Applying blur effect while loading
            src={src} // Image source
            {...rest} // Additional props passed to LazyLoadImage component
        />
    );
};

export default Img; // Exporting Img component
