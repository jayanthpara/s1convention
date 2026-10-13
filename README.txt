S1 CONVENTION HALL — STATIC HTML COMPONENTS

Files:
- index.html: main page and component loader
- styles.css: all site styling, including responsive/mobile styles
- script.js: mobile nav, scroll effects and hero slideshow behavior
- components/: each page section as a separate HTML fragment
- images/: put your image files here (1.jpg through 10.jpg and the existing gallery images)

IMPORTANT: HTML fragments loaded with fetch() generally do not work when opening index.html directly via file://. Run a local static server, no framework/build tools required.

Option 1 — VS Code: install/use Live Server, right-click index.html, choose “Open with Live Server”.
Option 2 — Python: open a terminal in this folder and run: python -m http.server 8000
Then open http://localhost:8000

To change slideshow titles/photos, edit the heroSlides array in script.js.
Image names default to images/1.jpg ... images/10.jpg. Change to .png if needed.
