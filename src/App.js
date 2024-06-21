import React, { useState } from 'react';
import './App.css';

function App() {
  const [topText, setTopText] = useState('');        // State for top text of the meme
  const [bottomText, setBottomText] = useState('');  // State for bottom text of the meme
  const [memeUrl, setMemeUrl] = useState('');        // State for storing the generated meme image URL
  const [loading, setLoading] = useState(false);     // State to manage loading state during API call
  const [error, setError] = useState('');            // State to store and display error messages

  // Handle input change for top and bottom text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'topText') {
      setTopText(value);
    } else if (name === 'bottomText') {
      setBottomText(value);
    }
  };

  // Function to generate meme using an external API
  const generateMeme = async () => {
    try {
      setLoading(true);  // Set loading state to true while fetching data
      setError('');      // Clear previous error messages

      // Fetch meme image from API based on user input
      const response = await fetch(`https://api.memegen.link/images/custom/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.jpg`);
      
      // Check if API request was successful
      if (!response.ok) {
        throw new Error('Failed to generate meme');
      }

      // Convert response data to blob and create object URL
      const data = await response.blob();
      setMemeUrl(URL.createObjectURL(data));
    } catch (error) {
      setError('Failed to generate meme. Please try again.');  // Display error message if request fails
    } finally {
      setLoading(false);  // Set loading state back to false after API call completes
    }
  };

  // Handle share functionality (placeholder)
  const handleShare = () => {
    alert('Meme shared!');  // Placeholder for sharing functionality
  };

  // JSX to render the component
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meme Generator</h1>
        <div className="form">
          <input
            type="text"
            name="topText"
            placeholder="Enter top text"
            className="form--input"
            value={topText}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="bottomText"
            placeholder="Enter bottom text"
            className="form--input"
            value={bottomText}
            onChange={handleInputChange}
          />
          <button className="form--button" onClick={generateMeme} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Meme'}
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}  {/* Display error message if there is an error */}
        {memeUrl && (
          <div className="meme">
            <img src={memeUrl} alt="Generated Meme" className="meme--image" />  {/* Display generated meme image */}
            <div className="meme--text top">{topText}</div>  {/* Display top text of the meme */}
            <div className="meme--text bottom">{bottomText}</div>  {/* Display bottom text of the meme */}
            <button className="share-button" onClick={handleShare}>
              Share Meme
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
