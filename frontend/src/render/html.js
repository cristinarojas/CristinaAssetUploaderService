// Environment
const isProduction = process.env.NODE_ENV === 'production'

export default function html({ title }) {
  let path = '/'
  let link = ''

  if (isProduction) {
    path = '/app/'
    link = `<link rel="stylesheet" href="${path}main.css" />`
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.13.0/css/all.css" />
        ${link}
      </head>
      <body>
        <div id="root"></div>
        <script src="${path}vendor.js"></script>
        <script src="${path}main.js"></script>
      </body>
    </html>
  `
}
