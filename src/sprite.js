export function getSvg() {
  fetch("sprite.svg")
    .then(response => response.text())
    .then(text => {
      let root = document.getElementById("root");
      let svgContainer = document.createElement("svgContainer");

      svgContainer.innerHTML = text;
      return root.appendChild(svgContainer);
    })
    .catch(err => console.log(err));
}
