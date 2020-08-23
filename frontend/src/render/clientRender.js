// Import the main render html (root)
import html from './html'

// This function the html function to render the initial html.
export default function clientRender() {
  return (req, res) =>
    res.send(
      html({
        title: 'Cristina Rojas . Uploader'
      })
    )
}
